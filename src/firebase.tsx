import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY!,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
    appId: process.env.REACT_APP_API_ID
};

let instance: undefined | any;

export default function getFirebase() {
    if (window !== undefined) {
        // then runtime environment or where the js running assumed browser
        if(instance) return instance;
        instance = initializeApp(firebaseConfig);
        return instance;
    }
    return null;
}
