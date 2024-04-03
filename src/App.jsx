import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/Navbar/Header";

// https://github.dev/banishnarang/yt-react-i18next
function App() {
  return (
    <React.Suspense fallback={null}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </React.Suspense>
  );
}

export default App;
