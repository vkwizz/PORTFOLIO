import './Achievements.css';

const achievements = [
    {
        id: 'vajra',
        prize: '₹20,000',
        title: 'First Prize — ASME MACE Vajra Hackathon',
        year: '2026',
        description:
            'Developed a full-stack Hybrid EV Scooter application with MQTT-based server-side communication, real-time vehicle telematics, remote immobilization, and security geofencing.',
    },
    {
        id: 'shark',
        prize: '₹80,000',
        title: 'Shark MACE Funding Winner',
        year: '01/2026',
        description:
            'Won seed funding for Couplespace through the college Shark Tank initiative, validating the concept of a relationship-focused social platform.',
    },
    {
        id: 'grant',
        prize: '₹1,10,000',
        title: 'Institutional Mini Project Grant',
        year: '2026',
        description:
            'Awarded institutional funding for hardware procurement to develop an EEG-Controlled Bionic Arm, bridging AI/ML with assistive hardware.',
    },
];

export default function Achievements() {
    return (
        <section id="achievements" className="ach-section">
            <div className="ach-inner">
                <div className="ach-header">
                    <span className="ach-eyebrow">Recognition</span>
                    <h2 className="ach-heading">Achievements</h2>
                    <div className="ach-rule" />
                </div>

                <div className="ach-list">
                    {achievements.map((a, i) => (
                        <div key={a.id} className="ach-item" style={{ '--i': i }} id={`ach-${a.id}`}>
                            <div className="ach-item__prize">{a.prize}</div>
                            <div className="ach-item__body">
                                <div className="ach-item__meta">
                                    <span className="ach-item__year">{a.year}</span>
                                </div>
                                <h3 className="ach-item__title">{a.title}</h3>
                                <p className="ach-item__desc">{a.description}</p>
                            </div>
                            <div className="ach-item__index">0{i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
