// Firebase client initialization and helpers
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB992cJaG_bEUcji31aqHyNpH0d88pbya8",
  authDomain: "mckay-yaf-chapter.firebaseapp.com",
  projectId: "mckay-yaf-chapter",
  storageBucket: "mckay-yaf-chapter.appspot.com",
  messagingSenderId: "780602186932",
  appId: "1:780602186932:web:5158362846467e987bcbe1",
  measurementId: "G-9X6W15CWVG"
};

const app = initializeApp(firebaseConfig);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // analytics may fail in non-browser environments
  analytics = null;
}

const auth = getAuth(app);
const db = getFirestore(app);
let storage;
try {
  storage = getStorage(app);
} catch (e) {
  storage = null;
}

async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function signOut() {
  return fbSignOut(auth);
}

function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}

async function subscribeNewsletter(payload = {}) {
  try {
    const colRef = collection(db, 'newsletterSubscribers');
    const docRef = await addDoc(colRef, { ...payload, createdAt: new Date() });
    return { id: docRef.id };
  } catch (err) {
    throw err;
  }
}

async function rsvpEvent(payload = {}) {
  try {
    const colRef = collection(db, 'rsvps');
    const docRef = await addDoc(colRef, { ...payload, createdAt: new Date() });
    return { id: docRef.id };
  } catch (err) {
    throw err;
  }
}

async function uploadFile(file, pathPrefix = 'uploads') {
  if (!storage) throw new Error('Storage not initialized');
  if (!file) throw new Error('No file provided');
  try {
    const filename = `${Date.now()}-${file.name}`;
    const ref = storageRef(storage, `${pathPrefix}/${filename}`);
    const snapshot = await uploadBytes(ref, file);
    const url = await getDownloadURL(snapshot.ref);
    return { file_url: url, path: snapshot.ref.fullPath };
  } catch (err) {
    console.error('uploadFile error', err && err.message ? err.message : err);
    throw err;
  }
}

// Fallback: when Storage is unavailable (or forbidden by plan/rules), store file as a data URL in Firestore.
async function uploadFileWithFallback(file, pathPrefix = 'uploads') {
  const isLocal = (typeof window !== 'undefined') && (window.location && window.location.hostname && window.location.hostname.includes('localhost'));

  if (!isLocal) {
    try {
      const uploadPromise = uploadFile(file, pathPrefix);
      const timeoutMs = 7000;
      const result = await Promise.race([
        uploadPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('upload_timeout')), timeoutMs))
      ]);
      return result;
    } catch (err) {
      // fallback to Firestore below
    }
  }

  if (!file) throw new Error('No file provided');

  // Convert file to data URL and save to Firestore as a fallback
  const fileToDataUrl = (f) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(f);
    } catch (e) {
      reject(e);
    }
  });

  try {
    const dataUrl = await fileToDataUrl(file);
    const filename = `${Date.now()}-${file.name}`;
    const colRef = collection(db, 'uploads');
    const docRef = await addDoc(colRef, {
      filename,
      content_type: file.type || null,
      data_url: dataUrl,
      createdAt: new Date(),
    });
    return { file_url: dataUrl, path: `uploads/${docRef.id}` };
  } catch (e) {
    console.error('uploadFileWithFallback failed to save to Firestore', e && e.message ? e.message : e);
    throw e;
  }
}

async function isAdmin(uid) {
  if (!uid) return false;
  try {
    const ref = doc(db, 'admins', uid);
    const adminDoc = await getDoc(ref);
    console.log('firebaseClient.isAdmin: fetched admin doc for', uid, 'exists=', adminDoc.exists());
    if (adminDoc.exists()) {
      console.log('firebaseClient.isAdmin: admin data=', adminDoc.data());
    }
    return adminDoc.exists();
  } catch (err) {
    console.error('firebaseClient.isAdmin error for uid', uid, err);
    throw err;
  }
}

async function upsertDocument(collectionName, docId, data = {}) {
  const ref = doc(db, collectionName, docId);
  await setDoc(ref, data, { merge: true });
  return { id: docId };
}

export {
  app,
  analytics,
  auth,
  db,
  storage,
  signIn,
  signOut,
  onAuthChange,
  subscribeNewsletter,
  rsvpEvent,
  isAdmin,
  upsertDocument,
  uploadFile,
  uploadFileWithFallback,
};
