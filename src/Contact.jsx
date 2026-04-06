import './Contact.css';

export default function Contact() {
    return (
        <section id="contact" className="contact-section">
            <div className="contact-inner">
                <div className="contact-left">
                    <span className="contact-eyebrow">Get in Touch</span>
                    <h2 className="contact-heading">
                        Let's build<br />
                        <span className="contact-heading--outline">something.</span>
                    </h2>
                    <p className="contact-sub">
                        Open to freelance projects, collaborations,<br />and exciting new opportunities.
                    </p>
                </div>

                <div className="contact-right">
                    <a
                        href="mailto:vivekviswanath1320@gmail.com"
                        className="contact-email"
                        id="contact-email"
                    >
                        vivekviswanath1320@gmail.com
                    </a>

                    <div className="contact-links">
                        <a
                            href="https://github.com/vkwizz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                            id="contact-github"
                        >
                            GitHub ↗
                        </a>
                        <a
                            href="tel:+916282117211"
                            className="contact-link"
                            id="contact-phone"
                        >
                            +91 62821 17211
                        </a>
                    </div>

                    <div className="contact-location">
                        <span className="contact-location__dot" />
                        Kothamangalam, Kerala, India
                    </div>
                </div>
            </div>

            <div className="contact-footer">
                <span>© 2025 Vivek Viswanath. All rights reserved.</span>
                <span>Built with React + Vite</span>
            </div>
        </section>
    );
}
