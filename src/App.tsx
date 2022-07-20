import React from 'react';
import Register from "./Register";
import getFirebase from "./firebase";
import Login from "./Login";
import './App.css';

// https://firebase.google.com/docs/auth
function App() {
    const firebaseInstance = getFirebase();
    console.log(`instance`, firebaseInstance);

    return (
        <div className="App">
            <Register />
            <Login />
        </div>
    );
}

export default App;
