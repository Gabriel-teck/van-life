import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css'
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to='/' className="site-logo">#VANLIFE</Link>
        <nav>
          <Link to='/about'>About</Link>
          <Link to='/'>Van</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}



ReactDOM.createRoot(document.getElementById("root")).render(<App />);
