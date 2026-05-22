import React from 'react';

function SocialMedia() {
    return (
        <div>
            <div className='proj-header'>
                <h1 className='proj-title'>Social Media Site</h1>
                <div className='proj-tags'>
                    {['React', 'JavaScript', 'CSS', 'Docker', 'REST API', 'Git'].map(t => (
                        <span key={t} className='proj-tag'>{t}</span>
                    ))}
                </div>
            </div>

            <p className='proj-body'>
                A full-stack social media web application with a custom backend API, responsive React frontend,
                and containerized deployment via Docker. Built to explore scalable web architecture and RESTful
                design patterns.
            </p>

            <p className='proj-section-title'>What I built</p>
            <ul className='proj-bullets'>
                <li>Designed and implemented a custom backend REST API with authentication, post creation, and user follow/feed logic</li>
                <li>Built responsive React UI components for feed, profiles, and interactions</li>
                <li>Containerized the full stack with Docker to ensure consistent local and production environments</li>
                <li>Managed the project with Git, using feature branches and pull requests for iterative development</li>
            </ul>

            <a
                className='proj-link'
                href='https://github.com/janhnguyen/djibouti'
                target='_blank'
                rel='noopener noreferrer'
            >
                View on GitHub
            </a>
        </div>
    );
}

export default SocialMedia;
