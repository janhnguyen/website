import React from 'react';

function BDOLootTracker() {
    return (
        <div>
            <div className='proj-header'>
                <h1 className='proj-title'>BDO Loot Tracker</h1>
                <div className='proj-tags'>
                    {['Python', 'Svelte', 'SQLite', 'CSS', 'Git'].map(t => (
                        <span key={t} className='proj-tag'>{t}</span>
                    ))}
                </div>
            </div>

            <p className='proj-body'>
                A desktop application for tracking and analyzing in-game loot in Black Desert Online. Built with a
                modular architecture that cleanly separates the UI, local data persistence, and data processing layers.
            </p>

            <p className='proj-section-title'>Architecture</p>
            <ul className='proj-bullets'>
                <li>Svelte frontend provides a fast, reactive UI for logging and visualizing loot sessions</li>
                <li>Python backend handles data processing, aggregation logic, and IPC with the UI layer</li>
                <li>SQLite stores all session data locally</li>
                <li>Packaged for distribution so non-technical users can run it without a dev environment</li>
            </ul>

            <a
                className='proj-link'
                href='https://github.com/janhnguyen/BDO-Loot-Tracker'
                target='_blank'
                rel='noopener noreferrer'
            >
                View on GitHub
            </a>
        </div>
    );
}

export default BDOLootTracker;
