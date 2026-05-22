import React from 'react';

function GodotGame() {
    return (
        <div>
            <div className='proj-header'>
                <h1 className='proj-title'>Indie Game Dev</h1>
                <div className='proj-tags'>
                    {['Godot 4', 'GDScript', 'Game Design', 'UB Open Source Club'].map(t => (
                        <span key={t} className='proj-tag'>{t}</span>
                    ))}
                </div>
            </div>

            <p className='proj-body'>
                Game development work done as part of the UB Open Source Club, collaborating with a team to build
                indie games using the Godot 4 engine. Contributed across coding, design, and QA.
            </p>

            <p className='proj-section-title'>Contributions</p>
            <ul className='proj-bullets'>
                <li>Implemented core gameplay systems and player mechanics in GDScript</li>
                <li>Participated in brainstorming sessions to define game loops, level design, and art direction</li>
                <li>Wrote and ran manual test cases to catch edge cases in physics and collision handling</li>
                <li>Collaborated in a multi-developer Git workflow with branch-based feature development</li>
            </ul>

            <div className='proj-hobby-note'>
                <span className='proj-hobby-icon'>🕹️</span>
                <p>
                    Game dev is how I got into programming. I enjoy the blend of creative and technical problem-solving.
                </p>
            </div>
        </div>
    );
}

export default GodotGame;
