import React, { useState, useEffect, useCallback } from 'react';
import '../styling/Home.css';
import Selfie from '../assets/selfie.jpg';
import arise1 from '../assets/ARISE/IMG_2376.jpg';
import arise2 from '../assets/ARISE/IMG_2377.jpg';
import arise3 from '../assets/ARISE/IMG_2447.jpg';
import arise4 from '../assets/ARISE/IMG_2479.jpg';
import arise5 from '../assets/ARISE/IMG_2497.jpg';

const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'ML & Data Engineer',
    'Game Developer',
    'Keyboard Enthusiast',
];

const arisePhotos = [arise1, arise2, arise3, arise4, arise5];

const research = [
    {
        title: 'Large-Scale Spotify Track Popularity Analysis with PySpark & ML',
        tags: ['Python', 'PySpark', 'HDFS', 'Random Forest', 'scikit-learn'],
        description: 'Designed and executed a large-scale data analysis and ML pipeline on 97,624 Spotify tracks using PySpark on HDFS. Built a Random Forest Regressor to predict song popularity from audio features, improving R² by 41% (0.17 → 0.24) through hyperparameter tuning via 3-fold cross-validation. Performed genre popularity distribution analysis across 114 genres and audio feature significance testing (Welch\'s t-test, Cohen\'s d) across six popularity tiers.',
        reportUrl: '/spotifyAnalysis.pdf',
    },
    {
        title: 'Handwriting to Text: CRNN + LLM Study Guide Pipeline',
        tags: ['Python', 'PyTorch', 'CRNN', 'CTC Loss', 'Llama 3.3 70B', 'Groq API'],
        description: 'Built an end-to-end pipeline that converts handwritten student notes into structured study guides. Trained a Convolutional Recurrent Neural Network (CRNN) with CTC loss on 400k+ word images from the IAM Handwriting Database and Kaggle, achieving 12.47% Character Error Rate. Integrated Llama 3.3 70B via the Groq API for downstream summarization, reaching ROUGE-1 F1 of 0.423. Evaluated against Tesseract and BLIP-2 baselines.',
        reportUrl: '/handwriting.pdf',
    },
];

const experience = [
    {
        company: 'FedEx',
        role: 'Trade Operations Analyst',
        period: 'January 2026 – May 2026',
        bullets: [
            'Built Excel automation workflows to reduce manual customs processing time by 30%.',
            'Developed reporting dashboards to track shipment exception trends and operational metrics.',
            'Utilized SQL queries, Excel-based reporting, and cross-platform operational systems to streamline brokerage processing, monitor shipment status, and support time-sensitive customs clearance operations.'
        ],
    },
    {
        company: 'ARISE Adaptive Design',
        role: 'Adaptive Design Intern',
        period: 'May 2024 – August 2024',
        bullets: [
            'Engineered and validated object-oriented firmware for 2 embedded systems using Arduino microcontrollers, writing unit tests in C++ across 23 test cases covering sensor thresholds, signal timing, and hardware-software integration.',
            'Reduced latency by 15% through iterative signal testing and firmware optimization, using serial debug logs to isolate and resolve bottlenecks.',
            'Authored hardware configuration documentation and debugging guides standardizing setup procedures across 3 device variants.',
        ],
        photos: arisePhotos,
    },
    {
        company: 'Randstad',
        role: 'Data Analyst Intern',
        period: 'January 2024 – April 2024',
        bullets: [
            'Cleaned and validated datasets of 9,000 records using Excel and SQL, identifying and resolving 4 categories of recurring data entry errors across reporting pipelines.',
            'Built 2 standardized reporting templates that automated manual aggregation steps, reducing report turnaround time by 1 hour per cycle.',
            'Audited data entry workflows using root cause analysis to trace discrepancies to upstream process gaps; findings report was adopted to reduce error rates in weekly deliverables.',
        ],
    },
    {
        company: 'Booz Allen Hamilton',
        role: 'Software Engineering Intern',
        period: 'May 2023 – August 2023',
        bullets: [
            'Developed internal web tools using React and Flask to streamline analyst workflows',
            'Assisted in developing REST API endpoints and SQL queries for internal dashboard applications and reporting systems',
            'Collaborated in an Agile development environment using Git, Jira, Docker, and CI/CD pipelines to support sprint-based feature delivery'
        ],
    },
    {
        company: 'DataAnnotation',
        role: 'Freelance Software Engineer',
        period: 'May 2022 - August 2022',
        bullets: [
            'Evaluated and refined AI-generated code responses across Python, JavaScript, and SQL tasks to improve model accuracy and reliability',
            'Designed structured prompts and test cases for large language models, identifying edge cases and debugging incorrect outputs',
            'Reviewed backend logic, API usage, and algorithmic solutions to ensure technical correctness and adherence to software engineering best practices'
        ]
    },
    {
        company: 'United Radio',
        role: 'Electronics Technician',
        period: 'January 2020 – September 2020',
        bullets: [
            'Diagnosed and repaired consumer electronics at a rate of 750 devices per week, performing circuit board-level fault analysis using multimeters.',
            'Executed component-level soldering repairs using schematics and hands-on diagnostic techniques across a high-volume repair pipeline.',
            'Generated repair reports documenting fault findings, components replaced, and resolution outcomes.',
        ],
    },
];

function ARISEGallery({ photos }) {
    const [active, setActive] = useState(null);

    const prev = useCallback(() => setActive(i => (i - 1 + photos.length) % photos.length), [photos.length]);
    const next = useCallback(() => setActive(i => (i + 1) % photos.length), [photos.length]);
    const close = useCallback(() => setActive(null), []);

    useEffect(() => {
        if (active === null) return;
        const onKey = (e) => {
            if (e.key === 'ArrowLeft')  prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape')     close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active, prev, next, close]);

    return (
        <>
            <div className='exp-photo-strip'>
                {photos.map((src, i) => (
                    <div key={i} className='exp-photo-thumb' onClick={() => setActive(i)}>
                        <img src={src} alt={`ARISE internship ${i + 1}`} loading="lazy" />
                    </div>
                ))}
            </div>

            {active !== null && (
                <div className='kbd-lightbox' onClick={close}>
                    <div className='kbd-lightbox-inner' onClick={e => e.stopPropagation()}>
                        <button className='kbd-lightbox-close' onClick={close}>✕</button>
                        <button className='kbd-lightbox-nav kbd-lightbox-prev' onClick={prev}>‹</button>
                        <img src={photos[active]} alt={`ARISE internship ${active + 1}`} />
                        <button className='kbd-lightbox-nav kbd-lightbox-next' onClick={next}>›</button>
                    </div>
                </div>
            )}
        </>
    );
}

function Home() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = roles[roleIndex];
        const speed = isDeleting ? 45 : 75;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const next = current.slice(0, displayed.length + 1);
                setDisplayed(next);
                if (next === current) {
                    setTimeout(() => setIsDeleting(true), 1800);
                }
            } else {
                const next = current.slice(0, displayed.length - 1);
                setDisplayed(next);
                if (next === '') {
                    setIsDeleting(false);
                    setRoleIndex((i) => (i + 1) % roles.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, roleIndex]);

    const skills = [
        'Python', 'Rust', 'Java', 'C/C++', 'Go', 'Scala', 'C#', 'TypeScript', 'JavaScript', 'GDScript',
        'React', 'Svelte', 'Docker', 'Node', 'PyTorch', 'TensorFlow', 'PySpark', 'OpenCV',
        'PostgreSQL', 'MongoDB', 'SQLite', 'Google Cloud', 'Git',
    ];

    return (
        <div id='home' className='home-wrapper'>
            {/* ── Hero ── */}
            <div className='about-container'>
                <div className='about-left'>
                    <p className='about-greeting'>Welcome!</p>
                    <h1 className='about-name'>Jason Nguyen</h1>
                    <p className='about-subtitle'>
                        {displayed}<span className='typing-cursor'>|</span>
                    </p>
                    <p className='about-body'>
                        CS graduate from SUNY University at Buffalo. My experience spans
                        ML pipelines, distributed data systems, embedded systems, and full-stack development.
                    </p>
                    <p className='about-body'>
                        I've built RL agents, OCR pipelines, game analytics tools, and web apps. I'm comfortable jumping between
                        languages and frameworks and care a lot about shipping things that actually work.
                    </p>
                    <div className='skills-container'>
                        {skills.map(skill => (
                            <span key={skill} className='skill-tag'>{skill}</span>
                        ))}
                    </div>
                    <a className='resume-btn' href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
                        View Resume
                    </a>
                </div>
                <div className='about-right'>
                    <div className='selfie-wrapper'>
                        <img className='about-selfie' src={Selfie} alt='Headshot' />
                    </div>
                </div>
            </div>

            {/* ── Work Experience ── */}
            <section className='experience-section'>
                <div className='experience-inner'>
                    <h2 className='exp-section-heading'>Work Experience</h2>
                    <div className='timeline'>
                        {experience.map((job, idx) => (
                            <div key={idx} className='exp-card'>
                                <div className='exp-card-left'>
                                    <div className='timeline-dot' />
                                    {idx < experience.length - 1 && <div className='timeline-line' />}
                                </div>
                                <div className='exp-card-body'>
                                    <div className='exp-card-header'>
                                        <div>
                                            <h3 className='exp-company'>{job.company}</h3>
                                            <p className='exp-role'>{job.role}</p>
                                        </div>
                                        <span className='exp-period'>{job.period}</span>
                                    </div>
                                    <ul className='exp-bullets'>
                                        {job.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                    {job.photos && <ARISEGallery photos={job.photos} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Research ── */}
            <section className='research-section'>
                <div className='research-inner'>
                    <h2 className='exp-section-heading'>Research</h2>
                    <div className='research-grid'>
                        {research.map((proj, idx) => (
                            <div key={idx} className='research-card'>
                                <div className='research-card-top'>
                                    <h3 className='research-title'>{proj.title}</h3>
                                    <div className='research-tags'>
                                        {proj.tags.map(t => (
                                            <span key={t} className='research-tag'>{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className='research-body'>{proj.description}</p>
                                <a
                                    className='research-link'
                                    href={proj.reportUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    View Report
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
