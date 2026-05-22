import React from 'react';

function PartyFinder() {
    return (
        <div>
            <div className='proj-header'>
                <h1 className='proj-title'>OCR Party Inspection</h1>
                <div className='proj-tags'>
                    {['Python', 'OpenCV', 'PyTesseract', 'NumPy', 'REST API'].map(t => (
                        <span key={t} className='proj-tag'>{t}</span>
                    ))}
                </div>
            </div>

            <p className='proj-body'>
                A Python desktop tool that captures live game client screenshots, extracts structured party member data
                via OCR and image recognition, and transmits results to an external web service.
            </p>

            <p className='proj-section-title'>What it does</p>
            <ul className='proj-bullets'>
                <li>Captures game client screenshots in real time using screen capture APIs</li>
                <li>Uses OpenCV for region-of-interest cropping and image preprocessing (thresholding, denoising) to improve OCR accuracy</li>
                <li>Runs PyTesseract to extract structured text (player names, classes, gear scores) from the processed image</li>
                <li>Sends parsed data to a web service through automated pipelines for community-side lookups</li>
            </ul>

            <a
                className='proj-link'
                href='https://github.com/janhnguyen/partyInspection'
                target='_blank'
                rel='noopener noreferrer'
            >
                View on GitHub
            </a>
        </div>
    );
}

export default PartyFinder;
