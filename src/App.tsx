import React from 'react';
import {BrowserRouter as Router, Routes, R} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import getFirebase from "./firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import './App.css';

// https://firebase.google.com/docs/auth
function App() {
    const firebaseInstance = getFirebase();
    console.log(`instance`, firebaseInstance);
    const auth = getAuth()
    const [user, setUser] = React.useState<string | null>(null);

    React.useEffect(() => {
        // to get the current signed-in user whenever this component render/re-render
        onAuthStateChanged(auth, (user) => {
            if(user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user.email);
            } else {
                console.log('user must be logged out');
                setUser(`loggedOut`);
            }
        })

    });

    return (
        <div className="App">
            <h2>The authenticated user is : {user}</h2>
            <Register/>
            <Login/>
        </div>
    );
}

export default App;
