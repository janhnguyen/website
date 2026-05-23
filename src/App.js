import './App.css';
import React from 'react';
import Contact from './components/Contact';
import Home from './components/Home';
import Header from './components/Header';
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
