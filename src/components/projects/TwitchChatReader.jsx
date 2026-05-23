import React from 'react';

function TwitchChatReader() {
    return (
        <div>
            <div className='proj-header'>
                <h1 className='proj-title'>Twitch Chat Reader</h1>
                <div className='proj-tags'>
                    {['Python', 'Twitch API', 'IRC', 'Automation'].map(t => (
                        <span key={t} className='proj-tag'>{t}</span>
                    ))}
                </div>
            </div>

            <p className='proj-body'>
                A lightweight bot that connects to Twitch's IRC interface to read live chat messages and trigger
                automated responses or actions. Built as a personal tool to enhance stream interactivity and automate
                repetitive moderation tasks.
            </p>

            <p className='proj-section-title'>Features</p>
            <ul className='proj-bullets'>
                <li>Connects to Twitch IRC over WebSocket and authenticates with OAuth token</li>
                <li>Parses incoming chat messages and dispatches actions based on configurable command patterns</li>
                <li>Designed to run persistently in the background without interrupting the stream</li>
            </ul>

            <div className='proj-hobby-note'>
                <span className='proj-hobby-icon'>🎮</span>
                <p>
                    Built this to manage my own Twitch channel. Reached the top 0.2% of all
                    Twitch streams in terms of metrics within a few months of going live.
                </p>
            </div>
        </div>
    );
}

export default TwitchChatReader;
