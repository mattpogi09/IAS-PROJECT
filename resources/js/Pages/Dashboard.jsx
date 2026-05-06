import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

/* ─── WebGoat lesson posts ────────────────────────────────────────── */
/*
 * Cards marked clickable: true → link to a full blog page.
 * Cards with clickable: false → static display, no interaction.
 *
 * Intro cards: numbered 1, 2, 3…  with no "lessons" prefix = lesson steps
 * Cards with just a plain number (e.g. "1")  = activity answers we completed
 * Advanced cards: "2 advanced" / "2.2 advanced" = activity answers
 */
const lessonPosts = [
    {
        num: '01',
        title: 'SQL Injection (Intro)',
        date: 'May 2026',
        file: '12.JPG',
        description:
            'A full walkthrough of all 13 steps in the WebGoat SQL Injection Intro lesson — from basic SQL concepts through query chaining and dropping tables.',
        tag: 'Intro',
        clickable: true,
        href: 'blog.sql-intro',
    },
    {
        num: '02',
        title: 'SQL Injection (Advanced)',
        date: 'May 2026',
        file: 'goals and concept.JPG',
        description:
            'Combining SQL injection techniques, blind SQLi, UNION-based data extraction, automated password cracking, and how prepared statements prevent it all.',
        tag: 'Advanced',
        clickable: true,
        href: 'blog.sql-advanced',
    },
];


/* ─── Tag colour map ─────────────────────────────────────────────── */
const tagColor = {
    'Intro':        'rgba(79,140,255,0.15)',
    'Lesson Goals': 'rgba(167,139,250,0.15)',
    'Fundamentals': 'rgba(52,211,153,0.12)',
    'Impact':       'rgba(248,113,113,0.12)',
    'Risk':         'rgba(251,146,60,0.12)',
    'Advanced':     'rgba(167,139,250,0.15)',
};
const tagText = {
    'Intro':        '#93bfff',
    'Lesson Goals': '#c4b5fd',
    'Fundamentals': '#6ee7b7',
    'Impact':       '#fca5a5',
    'Risk':         '#fdba74',
    'Advanced':     '#c4b5fd',
};

/* ─── Arrow icon ─────────────────────────────────────────────────── */
const ArrowRight = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
);

/* ─── Lock icon ──────────────────────────────────────────────────── */
const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
);

/* ─── Shield icon ────────────────────────────────────────────────── */
const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

/* ─── Card tag + number badge ─────────────────────────────────────── */
const CardMeta = ({ post }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="blog-card-date">{post.date}</span>
        <span style={{
            fontSize: '0.68rem', fontWeight: 600,
            padding: '2px 10px', borderRadius: 999,
            background: tagColor[post.tag] || 'rgba(79,140,255,0.12)',
            color: tagText[post.tag] || '#93bfff',
        }}>{post.tag}</span>
    </div>
);

/* ─── Clickable card → navigates to blog page ────────────────────── */
const ClickableCard = ({ post }) => (
    <Link
        href={route(post.href)}
        id={`post-${post.num}`}
        className="blog-card"
        style={{ textDecoration: 'none', display: 'block' }}
    >
        {/* thumbnail */}
        <div className="blog-card-thumb">
            <img src={encodeURI(`/${post.file}`)} alt={`${post.title} screenshot`} />
            <div className="blog-card-thumb-overlay" />
            <span className="blog-card-number">#{post.num}</span>
        </div>
        {/* body */}
        <div className="blog-card-body">
            <CardMeta post={post} />
            <h4 className="blog-card-title">{post.title}</h4>
            <p className="blog-card-desc">{post.description}</p>
            <span className="blog-card-cta">
                Read full blog <ArrowRight />
            </span>
        </div>
    </Link>
);

/* ─── Static card → no click, dimmed CTA ────────────────────────── */
const StaticCard = ({ post }) => (
    <div
        id={`post-${post.num}`}
        className="blog-card"
        style={{ cursor: 'default', opacity: 0.72 }}
    >
        {/* thumbnail */}
        <div className="blog-card-thumb">
            <img src={encodeURI(`/${post.file}`)} alt={`${post.title} screenshot`} />
            <div className="blog-card-thumb-overlay" />
            <span className="blog-card-number">#{post.num}</span>
        </div>
        {/* body */}
        <div className="blog-card-body">
            <CardMeta post={post} />
            <h4 className="blog-card-title">{post.title}</h4>
            <p className="blog-card-desc">{post.description}</p>
            <span className="blog-card-cta" style={{ opacity: 0.4, pointerEvents: 'none' }}>
                View screenshot <ArrowRight />
            </span>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════════════════════
   PANEL MODAL CONTENT
═══════════════════════════════════════════════════════════════════ */
const panelDetails = {
    auth: {
        label: 'Requirement 02',
        title: 'Secure Authentication Implementation',
        accent: '#93bfff',
        paragraphs: [
            {
                pre: 'This application secures user authentication through multiple layers of protection. Passwords are never stored in plain text — instead, Laravel\'s built-in',
                highlight: 'bcrypt hashing',
                post: 'is applied automatically before saving to the database, meaning even if the database were compromised, the actual passwords cannot be directly read.',
            },
            {
                pre: '',
                highlight: 'Server-side input validation',
                post: 'is enforced on every login and registration request, rejecting empty, malformed, or excessively long inputs before they reach the database. This prevents basic injection attempts from even being processed.',
            },
            {
                pre: 'Login error messages are kept',
                highlight: 'intentionally vague',
                post: '(e.g., "These credentials do not match" rather than "Wrong password") so attackers cannot determine whether a username exists. Together, these measures significantly raise the effort required to compromise any account.',
            },
        ],
    },
    vuln: {
        label: 'Requirement 04',
        title: 'Vulnerability Awareness',
        accent: '#c4b5fd',
        paragraphs: [
            {
                pre: '',
                highlight: 'SQL Injection',
                post: "could devastate this login system if raw user input were inserted directly into database queries. An attacker could type a payload like ' OR '1'='1 into the username field, causing the query to always return true and granting access to any account — including admin — without a valid password.",
            },
            {
                pre: 'Without security measures, an attacker could also use',
                highlight: 'broken authentication',
                post: 'techniques: brute-forcing weak passwords, reusing stolen credentials, or exploiting verbose error messages to enumerate valid usernames. The absence of rate limiting would make automated attacks trivially easy.',
            },
            {
                pre: 'This app counters these threats with',
                highlight: 'parameterized queries',
                post: "(via Laravel's Eloquent ORM) that treat all user input as data — never as executable SQL. Combined with bcrypt hashing, generic error messages, and server-side validation, the attack surface is dramatically reduced even if one layer is bypassed.",
            },
        ],
    },
};

/* ═══════════════════════════════════════════════════════════════════
   DASHBOARD COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function Dashboard() {
    const [activePanel, setActivePanel] = useState(null);
    const [page, setPage]               = useState(1);
    const pageSize   = 4;
    const totalPages = Math.ceil(lessonPosts.length / pageSize);
    const pagePosts  = lessonPosts.slice((page - 1) * pageSize, page * pageSize);

    const panelData = activePanel ? panelDetails[activePanel] : null;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <span className="badge">Active Session</span>
                    <h2 className="page-title">IAS Security Dashboard</h2>
                </div>
            }
        >
            <Head title="Dashboard — WebGoat SQL Injection Blog" />

            <div className="page-wrap">

                {/* ── HERO ─────────────────────────────────────────── */}
                <section className="hero reveal">
                    <div>
                        <p className="eyebrow">IAS Final Project · WebGoat</p>
                        <h1 className="hero-title">
                            SQL Injection<br />Lesson Blog
                        </h1>
                        <p className="hero-subtitle">
                            A curated collection of screenshots and notes from the WebGoat SQL
                            Injection lesson series — documenting key concepts, attack mechanics,
                            and how to defend against them.
                        </p>
                    </div>
                    <div className="hero-tags">
                        <span className="tag">bcrypt hashing</span>
                        <span className="tag">server-side validation</span>
                        <span className="tag">safe error handling</span>
                        <span className="tag">rate limiting</span>
                    </div>
                </section>

                {/* ── BLOG POSTS ───────────────────────────────────── */}
                <section className="reveal reveal-delay-1">
                    <p className="section-label">WebGoat Lesson Screenshots</p>

                    <div className="blog-grid">
                        {pagePosts.map((post) =>
                            post.clickable
                                ? <ClickableCard key={post.file} post={post} />
                                : <StaticCard    key={post.file} post={post} />
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="pagination-wrap">
                        <span className="pagination-info">
                            Page {page} / {totalPages} &nbsp;·&nbsp; {lessonPosts.length} lessons
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                type="button"
                                className="pagination-btn"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                ← Prev
                            </button>
                            <button
                                type="button"
                                className="pagination-btn"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    </div>

                    {/* Lesson link */}
                    <div className="lesson-card">
                        <div>
                            <p className="lesson-label">🔗 WebGoat Lesson Link</p>
                            <p className="lesson-note">
                                Make sure WebGoat is running locally before clicking.
                            </p>
                        </div>
                        <a
                            className="lesson-link"
                            href="http://localhost:8080/WebGoat/lessons/sqlinjection"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open SQL Injection →
                        </a>
                    </div>
                </section>

                {/* ── INFO PANELS (clickable) ───────────────────────── */}
                <div className="info-panels reveal reveal-delay-2">

                    {/* Secure Authentication — clickable */}
                    <button
                        type="button"
                        id="panel-auth"
                        onClick={() => setActivePanel('auth')}
                        className="info-panel"
                        style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    >
                        <div className="info-panel-icon blue" style={{ color: '#4f8cff' }}>
                            <LockIcon />
                        </div>
                        <h3 className="info-panel-title">Secure Authentication</h3>
                        <ul className="info-panel-list blue">
                            <li>Passwords are hashed with bcrypt before storage — never stored in plain text.</li>
                            <li>Server-side validation blocks malformed or malicious input.</li>
                            <li>Login error messages are intentionally generic to avoid leaking system details.</li>
                            <li>Rate limiting is applied to slow repeated failed login attempts.</li>
                        </ul>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            marginTop: '1.1rem', fontSize: '0.78rem', fontWeight: 600,
                            color: '#4f8cff',
                        }}>
                            Read full explanation <ArrowRight />
                        </span>
                    </button>

                    {/* Vulnerability Awareness — clickable */}
                    <button
                        type="button"
                        id="panel-vuln"
                        onClick={() => setActivePanel('vuln')}
                        className="info-panel"
                        style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    >
                        <div className="info-panel-icon purple" style={{ color: '#a78bfa' }}>
                            <ShieldIcon />
                        </div>
                        <h3 className="info-panel-title">Vulnerability Awareness</h3>
                        <ul className="info-panel-list purple">
                            <li>SQL injection can bypass login entirely by altering the underlying query logic.</li>
                            <li>Without input controls, attackers can dump entire database tables.</li>
                            <li>Parameterized queries and hashing reduce the blast radius of a breach.</li>
                            <li>Safe error handling limits information leakage to potential attackers.</li>
                        </ul>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            marginTop: '1.1rem', fontSize: '0.78rem', fontWeight: 600,
                            color: '#a78bfa',
                        }}>
                            Read full explanation <ArrowRight />
                        </span>
                    </button>

                </div>
            </div>

            {/* ── PANEL DETAIL MODAL ───────────────────────────────── */}
            <Modal show={Boolean(activePanel)} onClose={() => setActivePanel(null)} maxWidth="xl">
                {panelData && (
                    <div style={{ padding: '2rem' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <p style={{
                                    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em',
                                    textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace",
                                    color: panelData.accent, marginBottom: 6,
                                }}>
                                    {panelData.label}
                                </p>
                                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                    {panelData.title}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActivePanel(null)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(99,150,255,0.15)',
                                    color: 'rgba(148,163,200,0.7)',
                                    borderRadius: 8, padding: '5px 14px',
                                    fontSize: '0.8rem', fontWeight: 600,
                                    cursor: 'pointer', flexShrink: 0,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#f0f4ff'; }}
                                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(148,163,200,0.7)'; }}
                            >
                                ✕ Close
                            </button>
                        </div>

                        {/* Accent divider */}
                        <div style={{ height: 1, background: `linear-gradient(90deg, ${panelData.accent}55, transparent)`, marginBottom: '1.5rem' }} />

                        {/* Paragraphs */}
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {panelData.paragraphs.map((p, i) => (
                                <p key={i} style={{ fontSize: '0.93rem', color: 'rgba(148,163,200,0.85)', lineHeight: 1.75 }}>
                                    {p.pre && <>{p.pre}{' '}</>}
                                    <strong style={{ color: panelData.accent }}>{p.highlight}</strong>
                                    {' '}{p.post}
                                </p>
                            ))}
                        </div>

                        {/* Footer tag */}
                        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(99,150,255,0.1)' }}>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: `${panelData.accent}18`,
                                border: `1px solid ${panelData.accent}44`,
                                color: panelData.accent,
                                padding: '4px 14px', borderRadius: 999,
                                fontSize: '0.75rem', fontWeight: 600,
                                fontFamily: "'JetBrains Mono',monospace",
                            }}>
                                IAS Final Project · {panelData.label}
                            </span>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}