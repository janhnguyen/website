import { useEffect, useState } from 'react';
import '../styling/DateIdeas.css';

import backyard from '../assets/heart/carvel/backyard.png'
import display from '../assets/heart/carvel/display.png'
import lunch from '../assets/heart/carvel/lunch.png'
import lakeside from '../assets/heart/onondagaLake/lakeside.png'
import pathway from '../assets/heart/onondagaLake/pathway.png'
import redChili from '../assets/heart/onondagaLake/redChili.png'
import shore from '../assets/heart/onondagaLake/shore.png'
import stupidBike from '../assets/heart/onondagaLake/stupidBike.png'
import sunset from '../assets/heart/onondagaLake/sunset.png'
import swings from '../assets/heart/onondagaLake/swings.png'
import trees from '../assets/heart/onondagaLake/trees.png'
import blossom from '../assets/heart/secondDate/blossom.png'
import cats from '../assets/heart/secondDate/cats.png'
import gift from '../assets/heart/firstDate/gift.png'
import poke from '../assets/heart/firstDate/poke.png'

const carvelPhotos = [backyard, display, lunch]
const onondagaLakePhotos = [lakeside, pathway, redChili, shore, stupidBike, sunset, swings, trees]
const secondDatePhotos = [blossom, cats]
const firstDatePhotos = [gift, poke]

const events = [
    {
        title: 'Carvel Excursion',
        location: 'North Syracuse, New York',
        date: 'November 5, 2026',
        bullets: [
            'Skipping class and work to get ice cream'
        ],
        photos: carvelPhotos
    },
    {
        title: 'Onondaga Lake Trip',
        location: 'Liverpool, New York',
        date: 'November 1, 2026',
        bullets: [
            'Red Chili lunch -> Onondaga Lake exercise day'
        ],
        photos: onondagaLakePhotos
    },
    {
        title: 'Our Second Date',
        location: 'Syracuse, New York',
        date: 'October 27, 2026',
        bullets: [
            'Cats!'
        ],
        photos: secondDatePhotos
    },
    {
        title: 'Our First Date',
        location: 'Syracuse, New York',
        date: 'October 26, 2026',
        bullets: [
            'The beginning'
        ],
        photos: firstDatePhotos
    }
];

function DateIdeas() {
    const [activePhoto, setActivePhoto] = useState(null);

    useEffect(() => {
        if (!activePhoto) return undefined;

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setActivePhoto(null);
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [activePhoto]);

    return (
        <main className="date-ideas-page">
            <div className="date-ideas-content">
                <section>
                    <h1 className="date-ideas-heading">Our Story</h1>
                    <div className="date-ideas-timeline">
                        {events.map((event, idx) => (
                            <article key={event.title} className="date-ideas-event">
                                <div className="date-ideas-marker-column" aria-hidden="true">
                                    <span className="date-ideas-marker" />
                                    {idx < events.length - 1 && <span className="date-ideas-connector" />}
                                </div>
                                <div className="date-ideas-event-content">
                                    <div className="date-ideas-event-header">
                                        <div>
                                            <h2>{event.title}</h2>
                                            <p className="date-ideas-location">{event.location}</p>
                                        </div>
                                        <time className="date-ideas-date">{event.date}</time>
                                    </div>
                                    <ul className="date-ideas-details">
                                        {event.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                    {event.photos && (
                                        <div className="date-ideas-photos">
                                            {event.photos.map((photo, photoIndex) => (
                                                <button
                                                    key={photo}
                                                    className="date-ideas-photo-button"
                                                    type="button"
                                                    onClick={() => setActivePhoto({
                                                        src: photo,
                                                        alt: `${event.title} memory ${photoIndex + 1}`,
                                                    })}
                                                    aria-label={`Zoom in on ${event.title} memory ${photoIndex + 1}`}
                                                >
                                                    <img
                                                        src={photo}
                                                        alt=""
                                                        loading="lazy"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
            {activePhoto && (
                <div
                    className="date-ideas-lightbox"
                    onClick={() => setActivePhoto(null)}
                    role="presentation"
                >
                    <div
                        className="date-ideas-lightbox-content"
                        role="dialog"
                        aria-modal="true"
                        aria-label={activePhoto.alt}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="date-ideas-lightbox-close"
                            type="button"
                            onClick={() => setActivePhoto(null)}
                            aria-label="Close enlarged photo"
                        >
                            ×
                        </button>
                        <img src={activePhoto.src} alt={activePhoto.alt} />
                    </div>
                </div>
            )}
        </main>
    );
}

export default DateIdeas;
