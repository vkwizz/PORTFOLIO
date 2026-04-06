import { useEffect, useRef, useState, useCallback } from 'react';
import './Hero.css';

/**
 * SCROLL-JACKING HERO
 * ─────────────────────────────────────────────────────────────────────
 * Phase 1 (locked): body scroll is disabled. Mouse wheel / touch events
 *   are captured and used to drive progress (0 → 1).
 *   • progress drives rotateY: 180° → 0°  (back-of-head → front portrait)
 *   • last 15% of progress fades in the name text
 * Phase 2 (released): once progress hits 1 the hero transitions from
 *   position:fixed to position:relative (via CSS class on the shell),
 *   the hero's height is restored in the document flow, and normal
 *   page scroll resumes so the user can scroll to the next section.
 * ─────────────────────────────────────────────────────────────────────
 */
const TOTAL_SCROLL = 1000; // virtual px of wheel-delta to complete animation

// 26 greetings across 18 languages
const GREETINGS = [
    'Hello',        // English
    'Bonjour',      // French (formal)
    'Salut',        // French (informal)
    'Hola',         // Spanish
    'Zdravstvuyte', // Russian (formal)
    'Privet',       // Russian (informal)
    'Nǐn hǎo',     // Mandarin
    'Salve',        // Italian (formal)
    'Ciao',         // Italian (informal)
    'Konnichiwa',   // Japanese
    'Guten Tag',    // German (formal)
    'Hallo',        // German (informal)
    'Olá',          // Portuguese (formal)
    'Oi',           // Portuguese (informal)
    'Anyoung',      // Korean
    'Ahlan',        // Arabic
    'Yassas',       // Greek (formal)
    'Yassou',       // Greek (informal)
    'Namaste',      // Hindi
    'Hujambo',      // Swahili
    'Dzień dobry',  // Polish (formal)
    'Cześć',        // Polish (informal)
    'Hei',          // Norwegian
    'Merhaba',      // Turkish
    'Shalom',       // Hebrew
    'Hej',          // Swedish
];

export default function Hero() {
    const [progress, setProgress] = useState(0); // 0 → 1
    const [released, setReleased] = useState(false);
    const [floating, setFloating] = useState(false);
    const [greetIdx, setGreetIdx] = useState(0);
    const greeting = GREETINGS[greetIdx];

    // Cycle greeting every 1.8 s
    useEffect(() => {
        const t = setInterval(
            () => setGreetIdx((i) => (i + 1) % GREETINGS.length),
            1800
        );
        return () => clearInterval(t);
    }, []);

    const progressRef = useRef(0);
    const releasedRef = useRef(false);
    const shellRef = useRef(null);
    const floatTimer = useRef(null);
    // Keep stable refs to the listeners so we can remove them precisely
    const wheelHandlerRef = useRef(null);
    const touchStartHandlerRef = useRef(null);
    const touchMoveHandlerRef = useRef(null);

    // Derived rendering values
    const rotateY = 180 - progress * 180;
    const nameAlpha = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));
    const shadowMid = Math.abs(Math.sin((rotateY * Math.PI) / 180));

    // ── Force-clear all scroll locks (idempotent) ──────────────────────
    const forceUnlockScroll = () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.height = '';
        document.body.style.touchAction = '';
        // Remove the non-passive listeners that were blocking scroll
        if (wheelHandlerRef.current) {
            window.removeEventListener('wheel', wheelHandlerRef.current);
            wheelHandlerRef.current = null;
        }
        if (touchMoveHandlerRef.current) {
            window.removeEventListener('touchmove', touchMoveHandlerRef.current);
            touchMoveHandlerRef.current = null;
        }
        if (touchStartHandlerRef.current) {
            window.removeEventListener('touchstart', touchStartHandlerRef.current);
            touchStartHandlerRef.current = null;
        }
    };

    // ── Lock body scroll ────────────────────────────────────────────────
    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.touchAction = 'none';
    }, []);

    // ── Release body scroll + switch hero from fixed → relative ─────────
    const releaseScroll = useCallback(() => {
        // Mark as released FIRST so any in-flight handlers bail immediately
        releasedRef.current = true;
        // Remove the blocking listeners before touching overflow
        forceUnlockScroll();
        setReleased(true);
        // Small delay before floating so the layout shift settles
        floatTimer.current = setTimeout(() => setFloating(true), 400);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Advance progress ────────────────────────────────────────────────
    const advanceRef = useRef(null);
    advanceRef.current = (delta) => {
        if (releasedRef.current) return;
        const next = Math.min(1, progressRef.current + delta / TOTAL_SCROLL);
        progressRef.current = next;
        setProgress(next);
        if (next >= 1) {
            setTimeout(releaseScroll, 500);
        }
    };

    // ── Register scroll-jacking listeners ONCE on mount ─────────────────
    useEffect(() => {
        lockScroll();

        const onWheel = (e) => {
            if (releasedRef.current) return;
            e.preventDefault();
            const raw =
                e.deltaMode === 1 ? e.deltaY * 28 :
                    e.deltaMode === 2 ? e.deltaY * 300 :
                        e.deltaY;
            if (raw > 0) advanceRef.current(raw);
        };

        let lastTouchY = 0;
        const onTouchStart = (e) => { lastTouchY = e.touches[0].clientY; };
        const onTouchMove = (e) => {
            if (releasedRef.current) return;
            e.preventDefault();
            const dy = lastTouchY - e.touches[0].clientY;
            lastTouchY = e.touches[0].clientY;
            if (dy > 0) advanceRef.current(dy * 3);
        };

        wheelHandlerRef.current = onWheel;
        touchStartHandlerRef.current = onTouchStart;
        touchMoveHandlerRef.current = onTouchMove;

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => {
            forceUnlockScroll();
            clearTimeout(floatTimer.current);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        /* Shell: 'released' class switches hero from fixed → relative */
        <div ref={shellRef} className={`hero-shell${released ? ' released' : ''}`}>
            <section className="hero" id="hero">
                <div className="hero__grid-overlay" aria-hidden="true" />

                <div className="hero__container">
                    {/* ── LEFT: Text (fades in at end of animation) ── */}
                    <div
                        className="hero__text"
                        style={{
                            opacity: nameAlpha,
                            transform: `translateX(${(1 - nameAlpha) * -30}px)`,
                        }}
                    >
                        {/* Multilingual greeting cycler */}
                        <div className="hero__greeting">
                            <span className="hero__greeting-word" key={greeting}>
                                {greeting}
                            </span>
                            <span className="hero__greeting-comma">,I am</span>
                        </div>

                        <h1 className="hero__name">
                            <span className="hero__name-line">VIVEK</span>
                            <span className="hero__name-line hero__name-line--outline">VISWANATH</span>
                        </h1>

                        {/* Animated role cycler */}
                        <div className="hero__roles">
                            <span className="hero__role-static">I build as a&nbsp;</span>
                            <span className="hero__role-cycle" aria-live="polite">
                                <span className="hero__role-item">Full Stack Developer</span>
                                <span className="hero__role-item">AI &amp; ML Engineer</span>
                                <span className="hero__role-item">Blockchain Explorer</span>
                            </span>
                        </div>

                        <div className="hero__divider" />

                        <p className="hero__tagline">
                            Vibe Coder&nbsp;·&nbsp;Tech Enthusiast&nbsp;·&nbsp;AI & ML Explorer.<br />
                            I turn my creative ideas into real, shipped products —<br className="hero__br-desktop" />
                            currently studying AI &amp; ML at{' '}
                            <span className="hero__tagline-em">MACE, Kerala</span>.
                        </p>

                        <div
                            className="hero__cta-group"
                            style={{ pointerEvents: released ? 'auto' : 'none' }}
                        >
                            <a href="#work" className="hero__cta hero__cta--primary" id="cta-work">See My Work</a>
                            <a href="#contact" className="hero__cta hero__cta--ghost" id="cta-contact">Get in Touch</a>
                        </div>
                    </div>

                    {/* ── RIGHT: 3-D Flip Card ── */}
                    <div className="hero__visual">
                        <div
                            className="hero__scene"
                            style={{
                                filter: `drop-shadow(0 ${18 + shadowMid * 28}px ${36 + shadowMid * 46}px rgba(0,0,0,${0.07 + shadowMid * 0.2}))`,
                            }}
                        >
                            <div
                                className={`hero__card${floating ? ' hero__card--float' : ''}`}
                                style={{
                                    transform: `rotateY(${rotateY}deg)`,
                                }}
                            >
                                {/* Back face — user sees this first (rotateY=180 makes back face forward) */}
                                <div className="hero__face hero__face--back">
                                    <img src="/back.png" alt="Back silhouette" className="hero__portrait" draggable="false" />
                                </div>

                                {/* Front face — revealed when card rotates to 0° */}
                                <div className="hero__face hero__face--front">
                                    <img src="/front.png" alt="Vivek Viswanath" className="hero__portrait" draggable="false" />
                                </div>
                            </div>
                        </div>

                        <div
                            className="hero__badge"
                            style={{
                                opacity: nameAlpha,
                                transform: `translateY(${(1 - nameAlpha) * 12}px)`,
                            }}
                        >
                            <span className="hero__badge-dot" />
                            Open to freelance &amp; collaborations
                        </div>
                    </div>
                </div>

                {/* Thin progress bar along bottom */}
                <div className="hero__progress-bar">
                    <div className="hero__progress-fill" style={{ width: `${progress * 100}%` }} />
                </div>

                {/* Scroll hint (only at very start) */}
                <div className={`hero__scroll-hint${progress < 0.04 ? ' hero__scroll-hint--visible' : ''}`}>
                    <div className="hero__scroll-line" />
                    <span>Scroll to reveal</span>
                </div>
            </section>
        </div>
    );
}
