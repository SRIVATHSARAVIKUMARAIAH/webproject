import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCLU2nFcAPMVfCfW2e0MCS81Ih23n7YxNo", //process.env.REACT_APP_FB_apiKey,
	authDomain: "restaurants-e55e6.firebaseapp.com", //process.env.REACT_APP_FB_authDomain,
	projectId: "restaurants-e55e6", //process.env.REACT_APP_FB_projectId,
	storageBucket: "restaurants-e55e6.appspot.com", //process.env.REACT_APP_FB_storageBucket,
	messagingSenderId: "176845749029", //process.env.REACT_APP_FB_messagingSenderId,
	appId: "1:176845749029:web:cd0f40a7faa54a599ff8cc", //process.env.REACT_APP_FB_appId,
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
