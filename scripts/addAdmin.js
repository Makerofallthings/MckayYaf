import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

// Usage: node ./scripts/addAdmin.js ./serviceAccountKey.json <UID>
const keyPath = process.argv[2];
const uid = process.argv[3];

if (!keyPath || !uid) {
  console.error('Usage: node ./scripts/addAdmin.js <path-to-serviceAccount.json> <uid>');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
} catch (err) {
  console.error('Failed to read service account file:', err.message || err);
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function addAdmin(uid) {
  await db.collection('admins').doc(uid).set({ role: 'admin', createdAt: new Date() });
  console.log('Admin document created for UID:', uid);
}

addAdmin(uid).catch((err) => {
  console.error('Error adding admin:', err);
  process.exit(1);
});
