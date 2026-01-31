import { db, uploadFileWithFallback } from '@/lib/firebaseClient';
import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

const createCollection = (name) => {
  const memory = [];
  const useFirestore = !!db;

  return {
    list: async (orderByArg) => {
      if (useFirestore) {
        try {
          const col = collection(db, name);
          let q = col;
          if (orderByArg) {
            const field = orderByArg.replace(/^-/, '');
            const dir = orderByArg.startsWith('-') ? 'desc' : 'asc';
            q = query(col, orderBy(field, dir));
          }
          const snap = await getDocs(q);
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (err) {
          console.error('Firestore list error', err);
          return [];
        }
      }
      return [...memory];
    },
    create: async (payload = {}) => {
      if (useFirestore) {
        const ref = await addDoc(collection(db, name), { ...payload });
        return { id: ref.id, ...payload };
      }
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const record = { id, ...payload };
      memory.push(record);
      return record;
    },
    update: async (id, payload = {}) => {
      if (useFirestore) {
        await setDoc(doc(db, name, id), payload, { merge: true });
        return { id, ...payload };
      }
      const index = memory.findIndex((item) => item.id === id);
      if (index >= 0) {
        memory[index] = { ...memory[index], ...payload };
        return memory[index];
      }
      return { id, ...payload };
    },
    delete: async (id) => {
      if (useFirestore) {
        await deleteDoc(doc(db, name, id));
        return { id };
      }
      const index = memory.findIndex((item) => item.id === id);
      if (index >= 0) {
        memory.splice(index, 1);
      }
      return { id };
    },
  };
};

const entities = {
  SiteSettings: createCollection('siteSettings'),
  Event: createCollection('events'),
  TeamMember: createCollection('teamMembers'),
  ContactInfo: createCollection('contactInfo'),
};

export const base44 = {
  auth: {
    me: async () => {
      throw new Error('Auth not configured');
    },
    logout: () => {},
    redirectToLogin: () => {},
  },
  entities,
  appLogs: {
    logUserInApp: async () => {},
  },
  integrations: {
    Core: {
      UploadFile: async (payload = {}) => {
        // payload expected { file }
        console.log('base44.UploadFile called, payload present?', !!payload, 'file present?', !!(payload && payload.file));
        if (!payload || !payload.file) return { file_url: '' };
        try {
            const { file_url } = await uploadFileWithFallback(payload.file);
            return { file_url };
          } catch (err) {
            console.error('UploadFile error', err && err.message ? err.message : err);
            return { file_url: '' };
          }
      },
    },
  },
};
