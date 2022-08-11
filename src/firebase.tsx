import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY! || `AIzaSyDc4rpVSvzPkvTYkaFXe9S0CCKuoLFhr4s`,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN || `reactbase-f15eb.firebaseapp.com`,
    projectId: process.env.REACT_APP_PROJECT_ID || `reactbase-f15eb`,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET || `reactbase-f15eb.appspot.com`,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID || `676309055354`,
    appId: process.env.REACT_APP_API_ID || `1:676309055354:web:d9ff40ecf346390204c8c3`
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
