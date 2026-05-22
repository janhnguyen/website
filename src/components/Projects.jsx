import React, { useState, useRef } from 'react';
import '../styling/Projects.css';
import PartyFinder from './projects/PartyFinder';
import ChatReader from './projects/TwitchChatReader';
import ProjectHome from './projects/ProjectHome';
import GodotGame from './projects/GodotGame';
import SocialMedia from './projects/SocialMedia';
import MechanicalKeyboards from './projects/MechanicalKeyboards';
import BDOLootTracker from './projects/BDOLootTracker';
import LostArkLogs from './projects/LostArkLogs';

const navItems = [
    { key: 'home',         label: 'Overview' },
    { key: 'lostArkLogs',  label: 'Lost Ark Logs' },
    { key: 'bdoTracker',   label: 'BDO Loot Tracker' },
    { key: 'partyFinder',  label: 'OCR Party Inspection' },
    { key: 'socialMedia',  label: 'Social Media Site' },
    { key: 'chatReader',   label: 'Twitch Chat Reader' },
    { key: 'godotGame',    label: 'Indie Game Dev' },
    { key: 'mechKeyboards',label: 'Mechanical Keyboards' },
];

function Projects() {
    const [activeComponent, setActiveComponent] = useState('home');
    const [displayKey, setDisplayKey] = useState(0);
    const contentRef = useRef(null);

    const handleNav = (key) => {
        setActiveComponent(key);
        setDisplayKey(k => k + 1);
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'lostArkLogs':  return <LostArkLogs />;
            case 'bdoTracker':   return <BDOLootTracker />;
            case 'partyFinder':  return <PartyFinder />;
            case 'socialMedia':  return <SocialMedia />;
            case 'chatReader':   return <ChatReader />;
            case 'godotGame':    return <GodotGame />;
            case 'mechKeyboards':return <MechanicalKeyboards />;
            default:             return <ProjectHome />;
        }
    };

    return (
        <div className='project-container'>
            <div className='project-side-nav'>
                <div className='project-side-nav-title'>Projects</div>
                {navItems.map(({ key, label }) => (
                    <button
                        key={key}
                        className={`project-side-button ${activeComponent === key ? 'active' : ''}`}
                        onClick={() => handleNav(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div key={displayKey} className='project-display' ref={contentRef}>
                {renderContent()}
            </div>
        </div>
    );
}

export default Projects;
