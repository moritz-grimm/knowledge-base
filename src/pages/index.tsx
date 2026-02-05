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
                <h2>About this page</h2>
                <p>Here I document my learning progress, experiments, and solutions to various development topics. The focus is on JavaScript/TypeScript, web technologies, and everything I encounter on my way to becoming a better developer everyday.</p>
                <p>This knowledge base is less of a perfect tutorial and more of a living working document, including mistakes that I learn from.</p>
            </div>

            <div className={styles.about}>
                <h2>About me</h2>
                <p>I am a second-year apprentice application developer specializing in JavaScript and Java. In my spare time, I develop my own projects using JavaScript/TypeScript, HTML, and CSS, and experiment with Rust, APIs, and everything else related to software.</p>
                <p>I develop software not only for school or work, but because I enjoy building new things, solving problems independently, and constantly learning new things.</p>
            </div>

            <Link to="/docs/" className={styles.cta}>
                To the Docs →
            </Link>

        </div>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>   
            <HomepageHeader />
        </Layout>
    );
}
