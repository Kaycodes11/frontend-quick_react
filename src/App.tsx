import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import PostLayout from "./pages/PostLayout";
import PostDetail from "./pages/PostDetail";
import Layout from "./pages/Layout";
import "./App.css";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="about" element={<About/>}/>
                    <Route path="contact" element={<Contact/>}/>
                    <Route path="post" element={<PostLayout/>}>
                        <Route path=":category" element={<PostDetail/>}/>
                        <Route index element={<Post/>}/>
                    </Route>
                    <Route index element={<Home/>}/>
                </Route>
                <Route path="*" element={<h1>Error 404 Page not Found !!</h1>}/>
            </Routes>
        </Router>
    );
}

export default App;
