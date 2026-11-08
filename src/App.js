import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/Home';
import Header from './components/Header';
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Scrapbook from './components/Scrapbook';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      const element = document.getElementById(location.hash.slice(1));
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Projects />
              <Contact />
            </>
          }
        />
        <Route path="/scrapbook" element={<Scrapbook />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
