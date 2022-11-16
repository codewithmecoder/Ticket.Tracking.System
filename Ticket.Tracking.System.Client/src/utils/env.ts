export const ENV = {
  NEXT_PUBLIC_SERVER_URI:
    process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:300',
  NEXT_PUBLIC_FIREBASE_API_KEY:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBllHSnL9S4vKgGqrZ4gD_QE8yknvPkyhE',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'happy-quizy-storages.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'happy-quizy-storages',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'happy-quizy-storages.appspot.com',
  NEXT_PUBLIC_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || '880184718553',
  NEXT_PUBLIC_APP_ID:
    process.env.NEXT_PUBLIC_APP_ID ||
    '1:880184718553:web:062bba9f316bb948fabac8',
};
