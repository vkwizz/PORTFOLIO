import './About.css';

const skills = {
    Languages: ['JavaScript', 'Python', 'Java', 'C', 'Solidity', 'HTML', 'CSS'],
    Tools: ['React.js', 'Node.js', 'REST APIs', 'Git', 'VS Code'],
    Domains: ['Web Development', 'AI / ML', 'Web3 / Blockchain'],
};

const softSkills = [
    'Leadership & Team Management',
    'Problem Solving',
    'Creativity & Adaptability',
    'Decision Making',
    'Continuous Learning',
];

const education = [
    {
        id: 'btech',
        degree: 'B.Tech — AI & ML',
        institution: 'Mar Athanasius College of Engineering, Kothamangalam',
        period: '2023 – Present',
        score: '7.7 CGPA',
    },
    {
        id: 'plus2',
        degree: '12th Grade / +2 — CBSE',
        institution: 'Higher Secondary School',
        period: '2023',
        score: '91%',
    },
    {
        id: 'tenth',
        degree: '10th Grade — ICSE',
        institution: '',
        period: '2021',
        score: '96%',
    },
];

export default function About() {
    return (
        <section id="about" className="about-section">
            <div className="about-inner">

                {/* ── ABOUT BIO ── */}
                <div className="about-bio-wrap">
                    <div className="about-label">About</div>
                    <div className="about-bio">
                        <p className="about-bio__text">
                            Passionate Web Developer and AI &amp; ML Engineering student at{' '}
                            <em>Mar Athanasius College of Engineering</em>. I build user-centric web
                            applications with a strong foundation in frontend technologies, event-driven
                            logic, and API integration. Actively exploring blockchain development with
                            Solidity and always eager to learn new technologies.
                        </p>
                    </div>
                </div>

                {/* ── SKILLS + EDUCATION side-by-side ── */}
                <div className="about-grid">

                    {/* Technical Skills */}
                    <div className="about-skills">
                        <h2 className="about-section-heading">Technical Skills</h2>
                        {Object.entries(skills).map(([cat, items]) => (
                            <div key={cat} className="skill-group">
                                <span className="skill-group__label">{cat}</span>
                                <div className="skill-group__chips">
                                    {items.map((s) => (
                                        <span key={s} className="skill-chip">{s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="skill-group" style={{ marginTop: '2rem' }}>
                            <span className="skill-group__label">Soft Skills</span>
                            <div className="skill-group__chips">
                                {softSkills.map((s) => (
                                    <span key={s} className="skill-chip skill-chip--soft">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="about-education">
                        <h2 className="about-section-heading">Education</h2>
                        <div className="edu-list">
                            {education.map((e) => (
                                <div key={e.id} className="edu-item" id={`edu-${e.id}`}>
                                    <div className="edu-item__score">{e.score}</div>
                                    <div className="edu-item__body">
                                        <div className="edu-item__degree">{e.degree}</div>
                                        {e.institution && (
                                            <div className="edu-item__inst">{e.institution}</div>
                                        )}
                                        <div className="edu-item__period">{e.period}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
