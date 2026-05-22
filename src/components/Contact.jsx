import React from 'react';
import '../styling/Contact.css';
import emailIcon from '../assets/email.png';
import githubIcon from '../assets/github.png';
import linkedinIcon from '../assets/linkedin.png';
import twitchIcon from '../assets/twitch.png';

const links = [
    { href: 'mailto:nguyenjanh01@gmail.com',                        icon: emailIcon,    label: 'Email' },
    { href: 'https://github.com/janhnguyen',                        icon: githubIcon,   label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/jason-nguyen-360b7b275/', icon: linkedinIcon, label: 'LinkedIn' },
    { href: 'https://www.twitch.tv/doranis',                       icon: twitchIcon,   label: 'Twitch' },
];

function Contact() {
    return (
        <div className='contact'>
            <h1 className='contact-title'>Get In Touch</h1>
            <p className='contact-subtitle'>Feel free to reach out through any of these platforms</p>
            <div className='contact-links'>
                {links.map(({ href, icon, label }) => (
                    <a key={label} className='contact-card' href={href} target="_blank" rel="noopener noreferrer">
                        <img className='contact-icons' src={icon} alt={label} />
                        {label}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Contact;
