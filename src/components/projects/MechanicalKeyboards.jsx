import React, { useState, useEffect, useCallback } from 'react';
import img1 from '../../assets/keyboards/IMG_1719.jpg';
import img2 from '../../assets/keyboards/IMG_1715.jpg';
import img3 from '../../assets/keyboards/IMG_1015.jpg';
import img4 from '../../assets/keyboards/IMG_3561.jpg';
import img5 from '../../assets/keyboards/IMG_1731.jpg';
import img6 from '../../assets/keyboards/IMG_1724.jpg';

const photos = [img1, img2, img3, img4, img5, img6];

function MechanicalKeyboards() {
    const [lightbox, setLightbox] = useState(null); // index or null

    const prev = useCallback(() =>
        setLightbox(i => (i - 1 + photos.length) % photos.length), []);
    const next = useCallback(() =>
        setLightbox(i => (i + 1) % photos.length), []);
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
        <div>
            <div className='proj-header'>
                <h1 className='proj-title'>Mechanical Keyboards</h1>
                <div className='proj-tags'>
                    {['Hardware', 'Hobby', 'Soldering', 'Acoustics'].map(t => (
                        <span key={t} className='proj-tag'>{t}</span>
                    ))}
                </div>
            </div>

            <p className='proj-body'>
                Building mechanical keyboards is one of my longest-running hobbies — I enjoy the combination of
                hands-on hardware work, acoustic tuning, and the fact that every build ends up feeling completely
                different.
            </p>

            <p className='proj-section-title'>What goes into a build</p>
            <ul className='proj-bullets'>
                <li>Selecting and sourcing components: PCB, case, switches, stabilizers, and keycaps</li>
                <li>Modding stabilizers (lubing, clipping, wire balancing) to eliminate rattle and improve consistency</li>
                <li>Soldering switches to the PCB by hand</li>
                <li>Acoustic tuning through foam dampening, tape mods, and switch film layering to dial in the sound profile</li>
            </ul>

            <p className='proj-section-title'>Some builds</p>
            <div className='kbd-gallery'>
                {photos.map((src, i) => (
                    <div key={i} className='kbd-thumb' onClick={() => setLightbox(i)}>
                        <img src={src} alt={`Keyboard build ${i + 1}`} loading="lazy" />
                    </div>
                ))}
            </div>

            <div className='proj-hobby-note' style={{ marginTop: 28 }}>
                <span className='proj-hobby-icon'>⌨️</span>
                <p>
                    My daily driver is a custom 80% build - A white anodized QK80v1 built with Lubed & Filmed Alpaca switches and GMK Taegeukgi.
                </p>
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
        </div>
    );
}

export default MechanicalKeyboards;
