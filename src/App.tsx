import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import getFirebase from "./firebase";
import Auth from "./pages/Auth";
import './App.css';
import Profile from "./pages/Profile";

// https://firebase.google.com/docs/auth
function App() {
    const firebase = getFirebase();

    // react router v6 has exact applied to each route by default
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/*<Route element={<PrivateRoutes/>}>*/}
                    <Route path={"/profile"} element={<Profile />}/>
                    <Route path={"/about"} element={<h2>about</h2>}/>
                    <Route path={"/"} element={<h2>This is home page</h2>}/>
                    {/*</Route>*/}
                    <Route path={"/auth"} element={<Auth/>}/>
                    <Route path={"*"} element={<h2>This is 404 page</h2>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
