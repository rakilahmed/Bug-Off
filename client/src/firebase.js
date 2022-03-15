import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCtvI-c0QLaO2CY5l8997zfEVWsSnsIpH8',
  authDomain: 'bug-off-dev.firebaseapp.com',
  projectId: 'bug-off-dev',
  storageBucket: 'bug-off-dev.appspot.com',
  messagingSenderId: '592724615702',
  appId: '1:592724615702:web:65e821d14a0b2319d08b37',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
