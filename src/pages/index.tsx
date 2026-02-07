import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Translate from '@docusaurus/Translate';

function HomepageHeader() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Knowledge Base</h1>

            <div className={styles.intro}>
                <p><Translate id="landingpage.tagline" description="Tagline below the title on the landingpage">A collection of my notes, code snippets, and insights from my career as a developer.</Translate></p>
            </div>

            <div className={styles.about}>
                <h2><Translate id="landingpage.about.title" description="Title of the 'About this page' section">About this page</Translate></h2>
                <p><Translate id="landingpage.about.description1" description="First paragraph describing the knowledge base">Here I document my learning progress, experiments, and solutions to various development topics. The focus is on JavaScript/TypeScript, web technologies, and everything I encounter on my way to becoming a better developer everyday.</Translate></p>
                <p><Translate id="landingpage.about.description2" description="Second paragraph describing the knowledge base">This knowledge base is less of a perfect tutorial and more of a living working document, including mistakes that I learn from.</Translate></p>
            </div>

            <div className={styles.about}>
                <h2><Translate id="landingpage.aboutme.title" description="Title of the 'About me' section">About me</Translate></h2>
                <p><Translate id="landingpage.aboutme.description1" description="First paragraph about the about me section">I am a second-year apprentice application developer specializing in JavaScript and Java. In my spare time, I develop my own projects using JavaScript/TypeScript, HTML, and CSS, and experiment with Rust, APIs, and everything else related to software.</Translate></p>
                <p><Translate id="landingpage.aboutme.description2" description="Second paragraph about the about me section">I develop software not only for school or work, but because I enjoy building new things, solving problems independently, and constantly learning new things.</Translate></p>
            </div>

            <Link to="/docs/" className={styles.cta}>
                <Translate id="landingpage.cta" description="Call-to-action button text linking to the documentation">To the Docs →</Translate>
            </Link>
        </div>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title="Knowledge Base"
            description="My knowledge base as a developer apprentice: I document my learning process, experiments, and solutions in JavaScript/TypeScript, web technologies & everything else i encounter on my journey">
            <HomepageHeader />
        </Layout>
    );
}
