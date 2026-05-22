import React from 'react';

function LostArkLogs() {
    return (
        <div>
            <div className='proj-header'>
                <h1 className='proj-title'>Lost Ark Logs</h1>
                <div className='proj-tags'>
                    {['Rust', 'Svelte', 'TypeScript', 'SQLite', 'Git'].map(t => (
                        <span key={t} className='proj-tag'>{t}</span>
                    ))}
                </div>
            </div>

            <p className='proj-body'>
                A community gameplay analytics tool for Lost Ark, built in Rust with a Svelte/TypeScript frontend.
                I joined as an open-source contributor and owned UI/UX feature development end-to-end within an
                active multi-developer codebase.
            </p>

            <p className='proj-section-title'>My contributions</p>
            <ul className='proj-bullets'>
                <li>Designed and implemented UI/UX components for damage meters, buff tracking, and session breakdowns</li>
                <li>Optimized SQLite schema and query patterns to improve storage efficiency and data retrieval speed</li>
                <li>Prioritized user feedback from the community to drive feature decisions and bug triage</li>
                <li>Managed feature development end-to-end: design, implementation, code review, issue tracking, and iterative releases</li>
            </ul>

            <a
                className='proj-link'
                href='https://github.com/snoww/loa-logs'
                target='_blank'
                rel='noopener noreferrer'
            >
                View on GitHub
            </a>
        </div>
    );
}

export default LostArkLogs;
