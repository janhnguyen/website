import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styling/Header.css';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
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

    const scrollTo = (id) => {
        if (location.pathname !== '/') {
            navigate(`/#${id}`);
            setMenuOpen(false);
            return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>Jason Nguyen</div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <a href="/#home"       onClick={e => { e.preventDefault(); scrollTo('home'); }}>Home</a>
                <a href="/#experience" onClick={e => { e.preventDefault(); scrollTo('experience'); }}>Experience</a>
                <a href="/#education"  onClick={e => { e.preventDefault(); scrollTo('education'); }}>Education</a>
                <a href="/#research"   onClick={e => { e.preventDefault(); scrollTo('research'); }}>Research</a>
                <a href="/#projects"   onClick={e => { e.preventDefault(); scrollTo('projects'); }}>Projects</a>
                <a href="/#contact"    onClick={e => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
                <Link to="/date-ideas" onClick={() => setMenuOpen(false)} aria-label="Date Ideas" title="Date Ideas">
                    ♥
                </Link>
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
