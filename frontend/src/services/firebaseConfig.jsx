import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyClboIbYYOloGtyxQGiBuk35jQw_SKJnFc",
  authDomain: "localearn-687d1.firebaseapp.com",
  projectId: "localearn-687d1",
  storageBucket: "localearn-687d1.appspot.com",
  messagingSenderId: "658807721967",
  appId: "1:658807721967:android:c6d7e3cf28d27504edf01a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
