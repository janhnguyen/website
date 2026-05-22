import React, { useState, useEffect } from 'react';
import '../styling/Header.css';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [dark, setDark] = useState(
        () => document.documentElement.getAttribute('data-theme') === 'dark'
    );

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">Jason Nguyen</div>
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/projects">Projects</a>
                <a href="/contact">Contact</a>
                <button
                    className="theme-toggle"
                    onClick={() => setDark(d => !d)}
                    aria-label="Toggle dark mode"
                >
                    {dark ? '☀' : '☾'}
                </button>
            </nav>
        </header>
    );
}

export default Header;
