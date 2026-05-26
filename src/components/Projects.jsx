import React, { useState, useEffect, useCallback } from 'react';
import '../styling/Projects.css';
import kbdImg1 from '../assets/keyboards/IMG_1719.jpg';
import kbdImg2 from '../assets/keyboards/IMG_1715.jpg';
import kbdImg3 from '../assets/keyboards/IMG_1015.jpg';
import kbdImg4 from '../assets/keyboards/IMG_3561.jpg';
import kbdImg5 from '../assets/keyboards/IMG_1731.jpg';
import kbdImg6 from '../assets/keyboards/IMG_1724.jpg';

const kbdPhotos = [kbdImg1, kbdImg2, kbdImg3, kbdImg4, kbdImg5, kbdImg6];

const projects = [
    {
        title: 'Lost Ark Logs',
        tags: ['Rust', 'Svelte', 'TypeScript', 'SQLite', 'Git'],
        body: 'A community gameplay analytics tool for Lost Ark, built in Rust with a Svelte/TypeScript frontend. I joined as an open-source contributor and owned UI/UX feature development end-to-end within an active multi-developer codebase.',
        sectionTitle: 'My contributions',
        bullets: [
            'Designed and implemented UI/UX components for damage meters, buff tracking, and session breakdowns',
            'Optimized SQLite schema and query patterns to improve storage efficiency and data retrieval speed',
            'Prioritized user feedback from the community to drive feature decisions and bug triage',
            'Managed feature development end-to-end: design, implementation, code review, issue tracking, and iterative releases',
        ],
        link: 'https://github.com/snoww/loa-logs',
        linkLabel: 'View on GitHub',
    },
    {
        title: 'BDO Loot Tracker',
        tags: ['Python', 'Svelte', 'SQLite', 'CSS', 'Git'],
        body: 'A desktop application for tracking and analyzing in-game loot in Black Desert Online. Built with a modular architecture that cleanly separates the UI, local data persistence, and data processing layers.',
        sectionTitle: 'Architecture',
        bullets: [
            'Svelte frontend provides a fast, reactive UI for logging and visualizing loot sessions',
            'Python backend handles data processing, aggregation logic, and IPC with the UI layer',
            'SQLite stores all session data locally',
            'Packaged for distribution so non-technical users can run it without a dev environment',
        ],
        link: 'https://github.com/janhnguyen/BDO-Loot-Tracker',
        linkLabel: 'View on GitHub',
    },
    {
        title: 'OCR Party Inspection',
        tags: ['Python', 'OpenCV', 'PyTesseract', 'NumPy', 'REST API'],
        body: 'A Python desktop tool that captures live game client screenshots, extracts structured party member data via OCR and image recognition, and transmits results to an external web service.',
        sectionTitle: 'What it does',
        bullets: [
            'Captures game client screenshots in real time using screen capture APIs',
            'Uses OpenCV for region-of-interest cropping and image preprocessing (thresholding, denoising) to improve OCR accuracy',
            'Runs PyTesseract to extract structured text (player names, classes, gear scores) from the processed image',
            'Sends parsed data to a web service through automated pipelines for community-side lookups',
        ],
        link: 'https://github.com/janhnguyen/partyInspection',
        linkLabel: 'View on GitHub',
    },
    {
        title: 'Social Media Site',
        tags: ['React', 'JavaScript', 'CSS', 'Docker', 'Kubernetes', 'REST API', 'Git'],
        body: 'A full-stack social media web application with a custom backend API, responsive React frontend, and containerized deployment via Docker. Built to explore scalable web architecture and RESTful design patterns.',
        sectionTitle: 'What I built',
        bullets: [
            'Designed and implemented a custom backend REST API with authentication, post creation, and user follow/feed logic',
            'Built responsive React UI components for feed, profiles, and interactions',
            'Containerized the full stack with Docker and Kubernetes to ensure consistent local and production environments',
            'Managed the project with Git, using feature branches and pull requests for iterative development',
        ],
        link: 'https://github.com/janhnguyen/djibouti',
        linkLabel: 'View on GitHub',
    },
    {
        title: 'Twitch Chat Reader',
        tags: ['Python', 'Twitch API', 'IRC', 'Automation'],
        body: 'A lightweight bot that connects to Twitch\'s IRC interface to read live chat messages and trigger automated responses or actions. Built as a personal tool to enhance stream interactivity and automate repetitive moderation tasks.',
        sectionTitle: 'Features',
        bullets: [
            'Connects to Twitch IRC over WebSocket and authenticates with OAuth token',
            'Parses incoming chat messages and dispatches actions based on configurable command patterns',
            'Designed to run persistently in the background without interrupting the stream',
        ],
        hobbyNote: { icon: '🎮', text: 'Built this to manage my own Twitch channel. Reached the top 0.2% of all Twitch streams in terms of metrics within a few months of going live.' },
    },
    {
        title: 'Indie Game Dev',
        tags: ['Godot 4', 'GDScript', 'Game Design', 'UB Open Source Club'],
        body: 'Game development work done as part of the UB Open Source Club, collaborating with a team to build indie games using the Godot 4 engine. Contributed across coding, design, and QA.',
        sectionTitle: 'Contributions',
        bullets: [
            'Implemented core gameplay systems and player mechanics in GDScript',
            'Participated in brainstorming sessions to define game loops, level design, and art direction',
            'Wrote and ran manual test cases to catch edge cases in physics and collision handling',
            'Collaborated in a multi-developer Git workflow with branch-based feature development',
        ],
        hobbyNote: { icon: '🕹️', text: 'Game dev is how I got into programming. I enjoy the blend of creative and technical problem-solving.' },
    },
];

function KbdGallery({ photos }) {
    const [lightbox, setLightbox] = useState(null);

    const prev = useCallback(() => setLightbox(i => (i - 1 + photos.length) % photos.length), [photos.length]);
    const next = useCallback(() => setLightbox(i => (i + 1) % photos.length), [photos.length]);
    const close = useCallback(() => setLightbox(null), []);

    useEffect(() => {
        if (lightbox === null) return;
        const onKey = (e) => {
            if (e.key === 'ArrowLeft')  prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape')     close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox, prev, next, close]);

    return (
        <>
            <div className='kbd-gallery'>
                {photos.map((src, i) => (
                    <div key={i} className='kbd-thumb' onClick={() => setLightbox(i)}>
                        <img src={src} alt={`Keyboard build ${i + 1}`} loading='lazy' />
                    </div>
                ))}
            </div>
            {lightbox !== null && (
                <div className='kbd-lightbox' onClick={close}>
                    <div className='kbd-lightbox-inner' onClick={e => e.stopPropagation()}>
                        <button className='kbd-lightbox-close' onClick={close}>✕</button>
                        <button className='kbd-lightbox-nav kbd-lightbox-prev' onClick={prev}>‹</button>
                        <img src={photos[lightbox]} alt={`Keyboard build ${lightbox + 1}`} />
                        <button className='kbd-lightbox-nav kbd-lightbox-next' onClick={next}>›</button>
                    </div>
                </div>
            )}
        </>
    );
}

function Projects() {
    return (
        <div id='projects' className='projects-section'>
            <div className='projects-inner'>
                <h2 className='exp-section-heading'>Projects</h2>
                <div className='projects-grid'>
                    {projects.map((proj, idx) => (
                        <div key={idx} className='project-card'>
                            <div className='project-card-header'>
                                <div>
                                    <h3 className='proj-title project-card-title'>{proj.title}</h3>
                                    <div className='proj-tags'>
                                        {proj.tags.map(t => <span key={t} className='proj-tag'>{t}</span>)}
                                    </div>
                                </div>
                                {proj.link && (
                                    <a className='proj-link' href={proj.link} target='_blank' rel='noopener noreferrer'>
                                        {proj.linkLabel}
                                    </a>
                                )}
                            </div>
                            <p className='proj-body'>{proj.body}</p>
                            {proj.sectionTitle && <p className='proj-section-title'>{proj.sectionTitle}</p>}
                            {proj.bullets && (
                                <ul className='proj-bullets'>
                                    {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            )}
                            {proj.hobbyNote && (
                                <div className='proj-hobby-note'>
                                    <span className='proj-hobby-icon'>{proj.hobbyNote.icon}</span>
                                    <p>{proj.hobbyNote.text}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Mechanical Keyboards: full width, has gallery */}
                    <div className='project-card project-card-full'>
                        <div className='project-card-header'>
                            <div>
                                <h3 className='proj-title project-card-title'>Mechanical Keyboards</h3>
                                <div className='proj-tags'>
                                    {['Hardware', 'Hobby', 'Soldering', 'Acoustics'].map(t => (
                                        <span key={t} className='proj-tag'>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className='proj-body'>
                            Building mechanical keyboards is one of my longest-running hobbies. I enjoy the hands-on hardware work,
                            acoustic tuning, and the fact that every build ends up feeling completely different.
                        </p>
                        <p className='proj-section-title'>What goes into a build</p>
                        <ul className='proj-bullets'>
                            <li>Selecting and sourcing components: PCB, case, switches, stabilizers, and keycaps</li>
                            <li>Modding stabilizers (lubing, clipping, wire balancing) to eliminate rattle and improve consistency</li>
                            <li>Soldering switches to the PCB by hand</li>
                            <li>Acoustic tuning through foam dampening, tape mods, and switch film layering to dial in the sound profile</li>
                        </ul>
                        <p className='proj-section-title'>Some builds</p>
                        <KbdGallery photos={kbdPhotos} />
                        <div className='proj-hobby-note' style={{ marginTop: 28 }}>
                            <span className='proj-hobby-icon'>⌨️</span>
                            <p>My daily driver is a custom 80% build: a white anodized QK80v1 with lubed and filmed Alpaca switches and GMK Taegeukgi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
