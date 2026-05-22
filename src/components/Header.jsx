import React, { useState, useEffect } from 'react';
import '../styling/Header.css';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [dark, setDark] = useState(
        () => document.documentElement.getAttribute('data-theme') === 'dark'
    );
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            setMenuOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    useEffect(() => {
        if (!menuOpen) return;
        const close = () => setMenuOpen(false);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [menuOpen]);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">Jason Nguyen</div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
                <a href="/projects" onClick={() => setMenuOpen(false)}>Projects</a>
                <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
                <button
                    className="theme-toggle"
                    onClick={() => setDark(d => !d)}
                    aria-label="Toggle dark mode"
                >
                    {dark ? '☀' : '☾'}
                </button>
            </nav>
            <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
                aria-label="Toggle menu"
            >
                <span />
                <span />
                <span />
            </button>
        </header>
    );
}

export default Header;
