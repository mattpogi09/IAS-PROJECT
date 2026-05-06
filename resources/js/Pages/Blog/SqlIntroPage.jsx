import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

/* ── Icons ─────────────────────────────────────────────────────────── */
const ArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);
const CodeIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
);

/* ── Shared styles ──────────────────────────────────────────────────── */
const ACCENT = '#93bfff';

/* ── Sub-components ─────────────────────────────────────────────────── */
const CodeBlock = ({ code }) => (
    <div style={{
        background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(99,150,255,0.22)',
        borderRadius: 10, padding: '0.85rem 1.1rem', margin: '0.75rem 0',
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
        fontSize: '0.82rem', color: '#93bfff', overflowX: 'auto',
        display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
        whiteSpace: 'pre-wrap',
    }}>
        <span style={{ color: 'rgba(99,150,255,0.4)', marginTop: 2, flexShrink: 0 }}><CodeIcon /></span>
        <span>{code}</span>
    </div>
);

/* Screenshot image with caption */
const Screenshot = ({ src, alt, label, type = 'lesson' }) => {
    const isLesson   = type === 'lesson';
    const badgeBg    = isLesson ? 'rgba(79,140,255,0.15)'  : 'rgba(52,211,153,0.12)';
    const badgeColor = isLesson ? '#93bfff'                : '#6ee7b7';
    const badgeText  = isLesson ? 'Lesson Screenshot'      : 'Activity — Our Answer';
    return (
        <div style={{
            margin: '1.1rem 0',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(99,150,255,0.15)',
            borderRadius: 12, overflow: 'hidden',
        }}>
            <img
                src={encodeURI(src)}
                alt={alt}
                style={{ width: '100%', display: 'block', maxHeight: 420, objectFit: 'contain', background: '#0a0f1e' }}
            />
            <div style={{
                padding: '0.6rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                borderTop: '1px solid rgba(99,150,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
            }}>
                <span style={{
                    fontSize: '0.68rem', fontWeight: 600, padding: '2px 10px',
                    borderRadius: 999, background: badgeBg, color: badgeColor,
                }}>
                    {badgeText}
                </span>
                {label && (
                    <span style={{ fontSize: '0.74rem', color: 'rgba(148,163,200,0.55)' }}>
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
};

/* Step container */
const Step = ({ number, title, tag, tagColor = ACCENT, children }) => (
    <div style={{
        background: 'rgba(15,22,40,0.65)',
        border: '1px solid rgba(99,150,255,0.12)',
        borderRadius: 16, padding: '1.6rem 2rem',
        marginBottom: '1.5rem', backdropFilter: 'blur(8px)',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
            <span style={{
                background: 'linear-gradient(135deg,#4f8cff22,#a78bfa22)',
                border: '1px solid rgba(99,150,255,0.25)', color: '#93bfff',
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.72rem', fontWeight: 700,
                padding: '3px 10px', borderRadius: 999,
            }}>Step {number}</span>
            {tag && (
                <span style={{
                    background: `${tagColor}18`, border: `1px solid ${tagColor}44`,
                    color: tagColor, fontSize: '0.68rem', fontWeight: 600,
                    padding: '2px 10px', borderRadius: 999,
                }}>{tag}</span>
            )}
        </div>
        {title && (
            <h3 style={{
                fontSize: '1.05rem', fontWeight: 700, color: '#e2e8ff',
                marginBottom: '0.6rem', letterSpacing: '-0.01em',
            }}>{title}</h3>
        )}
        <div style={{ fontSize: '0.9rem', color: 'rgba(148,163,200,0.85)', lineHeight: 1.85 }}>
            {children}
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════════════════════
   SQL INJECTION (INTRO) — BLOG PAGE
═══════════════════════════════════════════════════════════════════ */
export default function SqlIntroPage() {
    return (
        <AuthenticatedLayout
            header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Link
                        href={route('dashboard')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            color: 'rgba(148,163,200,0.7)', fontSize: '0.82rem', fontWeight: 600,
                            textDecoration: 'none', transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#93bfff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,200,0.7)'}
                    >
                        <ArrowLeft /> Back to Dashboard
                    </Link>
                    <span style={{ color: 'rgba(99,150,255,0.3)' }}>·</span>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8ff' }}>
                        SQL Injection (Intro)
                    </h2>
                </div>
            }
        >
            <Head title="SQL Injection (Intro) — Blog" />

            <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

                {/* ── Page header ───────────────────────────────────── */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <p style={{
                        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: '#93bfff',
                        fontFamily: "'JetBrains Mono',monospace", marginBottom: '0.5rem',
                    }}>
                        WebGoat · (A3) Injection · May 2026
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900,
                        color: '#f0f4ff', letterSpacing: '-0.03em', lineHeight: 1.15,
                        marginBottom: '1rem',
                    }}>
                        SQL Injection (Intro)
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'rgba(148,163,200,0.75)', lineHeight: 1.8, maxWidth: 700 }}>
                        A complete walkthrough of all 13 steps in the WebGoat SQL Injection (Intro)
                        lesson — from basic SQL concepts through query chaining and dropping tables.
                        Screenshots include both lesson slides and our completed activity answers.
                    </p>
                    <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(99,150,255,0.5),transparent)', marginTop: '1.75rem' }} />
                </div>

                {/* ── STEP 1 ─────────────────────────────────────────── */}
                <Step number={1} title="Introduction & Concepts" tag="Lesson" tagColor="#93bfff">
                    <p>
                        The first step shows a short introduction and the concepts you will learn
                        while progressing through the page. It sets the stage for everything that follows.
                    </p>
                    <Screenshot
                        src="/images/1 lesson.jpg"
                        alt="Step 1 — Intro and Concepts"
                        label="Step 1 — Lesson slide"
                        type="lesson"
                    />
                </Step>

                {/* ── STEP 2 ─────────────────────────────────────────── */}
                <Step number={2} title="What is SQL?" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        This step introduces you to SQL and asks you to input a query that retrieves
                        the <strong style={{ color: '#93bfff' }}>Department of Bob Franco</strong> from the employees table.
                    </p>
                    <CodeBlock code="SELECT department FROM employees WHERE first_name = 'Bob' AND last_name = 'Franco';" />
                    <p>
                        Once submitted correctly it turns green. This retrieves the department of Bob stored within the table.
                    </p>
                    <Screenshot
                        src="/images/2.jpg"
                        alt="Step 2 — What is SQL activity answer"
                        label="Step 2 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 3 ─────────────────────────────────────────── */}
                <Step number={3} title="Data Manipulation Language (DML)" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        Step 3 introduces DML — used for the manipulation of data — and provides a
                        quick activity: change the department of{' '}
                        <strong style={{ color: '#93bfff' }}>Tobi Barnett</strong> to Sales.
                    </p>
                    <CodeBlock code="UPDATE employees SET department = 'Sales' WHERE first_name = 'Tobi' AND last_name = 'Barnett';" />
                    <p>This alters Tobi's department record in the database to "Sales".</p>
                    <Screenshot
                        src="/images/3.jpg"
                        alt="Step 3 — DML activity answer"
                        label="Step 3 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 4 ─────────────────────────────────────────── */}
                <Step number={4} title="Data Definition Language (DDL)" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        Step 4 introduces DDL. The activity asks you to modify the schema by adding a
                        new column <strong style={{ color: '#93bfff' }}>phone (VARCHAR 20)</strong> to
                        the employees table.
                    </p>
                    <CodeBlock code="ALTER TABLE employees ADD phone VARCHAR(20);" />
                    <p>
                        Using <code style={{ color: '#93bfff', fontFamily: 'monospace' }}>ALTER TABLE</code> modifies
                        the table's structure — not its data.
                    </p>
                    <Screenshot
                        src="/images/4.jpg"
                        alt="Step 4 — DDL activity answer"
                        label="Step 4 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 5 ─────────────────────────────────────────── */}
                <Step number={5} title="Data Control Language (DCL)" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        Step 5 introduces DCL. The activity asks you to grant all privileges on the
                        table <strong style={{ color: '#93bfff' }}>grant_rights</strong> to
                        the user <strong style={{ color: '#93bfff' }}>unauthorized_user</strong>.
                    </p>
                    <CodeBlock code="GRANT ALL PRIVILEGES ON grant_rights TO unauthorized_user;" />
                    <Screenshot
                        src="/images/5.jpg"
                        alt="Step 5 — DCL activity answer"
                        label="Step 5 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 6 ─────────────────────────────────────────── */}
                <Step number={6} title="Introducing SQL Injection" tag="Lesson" tagColor="#93bfff">
                    <p>
                        Step 6 introduces SQL Injection. The task is to simply input a username. After
                        submitting, you'll see the username reflected below the form — because the
                        application directly concatenates your input into the SQL query string.
                    </p>
                    <p>
                        The database interprets whatever you type as part of the condition for{' '}
                        <code style={{ color: '#93bfff', fontFamily: 'monospace' }}>name</code>. This
                        is the fundamental flaw that SQL injection exploits.
                    </p>
                    <Screenshot
                        src="/images/6 lesson.jpg"
                        alt="Step 6 — SQL Injection introduction"
                        label="Step 6 — Lesson slide"
                        type="lesson"
                    />
                </Step>

                {/* ── STEP 7 ─────────────────────────────────────────── */}
                <Step number={7} title="Consequences of SQL Injection" tag="Lesson" tagColor="#93bfff">
                    <p>
                        This step explains the various consequences of SQL injection — from unauthorized
                        data access to complete system compromise. No activity required; it is a reading step.
                    </p>
                    <Screenshot
                        src="/images/7 lesson.jpg"
                        alt="Step 7 — Consequences of SQL Injection"
                        label="Step 7 — Lesson slide"
                        type="lesson"
                    />
                </Step>

                {/* ── STEP 8 ─────────────────────────────────────────── */}
                <Step number={8} title="Severity of SQL Injection" tag="Lesson" tagColor="#93bfff">
                    <p>
                        Step 8 elaborates on the severity of SQL Injection and why it ranks in the OWASP
                        Top 10. No activity required — steps 7 and 8 together stress how critical it is
                        to understand and prevent SQL injection.
                    </p>
                    <Screenshot
                        src="/images/8 lesson.jpg"
                        alt="Step 8 — Severity of SQL Injection"
                        label="Step 8 — Lesson slide"
                        type="lesson"
                    />
                </Step>

                {/* ── STEP 9 ─────────────────────────────────────────── */}
                <Step number={9} title="Try It: String Injection (OR '1'='1')" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        A Try It Activity — choose the right options from the dropdown and click{' '}
                        <em>Get Account Info</em>. The injection works because the query builder
                        concatenated raw input directly into the SQL string.
                    </p>
                    <p>
                        The <strong style={{ color: '#f87171' }}>OR '1'='1'</strong> trick bypasses
                        the intended filter and forces the database to return every row.
                    </p>
                    <p style={{ color: '#fca5a5' }}>
                        ⚠️ Confidentiality compromised — you accessed data you were never supposed to see.
                    </p>
                    <Screenshot
                        src="/images/9.jpg"
                        alt="Step 9 — String injection activity answer"
                        label="Step 9 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 10 ────────────────────────────────────────── */}
                <Step number={10} title="Try It: Numeric SQL Injection" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        Another Try It activity, focused on numeric SQL injection. Concatenating raw
                        numeric input into queries is just as dangerous. Attackers inject logical
                        conditions like <strong style={{ color: '#f87171' }}>OR 1=1</strong> and
                        comments (<code style={{ color: '#93bfff', fontFamily: 'monospace' }}>--</code>)
                        to bypass filters and expose sensitive data.
                    </p>
                    <Screenshot
                        src="/images/10.jpg"
                        alt="Step 10 — Numeric injection activity answer"
                        label="Step 10 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 11 ────────────────────────────────────────── */}
                <Step number={11} title="String SQL Injection" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        Step 11 covers string SQL injection with a Try It Activity. The injection
                        exploits string concatenation and logical operators. The{' '}
                        <strong style={{ color: '#f87171' }}>OR '1'='1'</strong> trick bypasses
                        authentication and the comment operator{' '}
                        (<code style={{ color: '#93bfff', fontFamily: 'monospace' }}>--</code>)
                        neutralizes the rest of the query.
                    </p>
                    <Screenshot
                        src="/images/11.jpg"
                        alt="Step 11 — String SQL injection activity answer"
                        label="Step 11 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 12 ────────────────────────────────────────── */}
                <Step number={12} title="SQL Query Chaining — Changing Your Salary" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        Step 12 introduces <strong style={{ color: '#93bfff' }}>query chaining</strong>.
                        The activity asks you to change your salary so yours is bigger. Enter{' '}
                        <strong style={{ color: '#93bfff' }}>Smith</strong> in Employee Name, then:
                    </p>
                    <CodeBlock code={"3SL99A'; UPDATE employees SET salary = 90000 WHERE last_name = 'Smith'--"} />
                    <p>
                        This chains two queries together: the intended SELECT plus your malicious UPDATE.
                        The semicolon (<code style={{ color: '#93bfff', fontFamily: 'monospace' }}>;</code>)
                        starts a new query and the comment ensures clean syntax.
                    </p>
                    <p style={{ color: '#fca5a5' }}>
                        ⚠️ Integrity compromised — you didn't just read data, you actually changed it.
                    </p>
                    <Screenshot
                        src="/images/12.jpg"
                        alt="Step 12 — Query chaining activity answer"
                        label="Step 12 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 13 ────────────────────────────────────────── */}
                <Step number={13} title="Compromising Availability — Dropping the Log Table" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        The final step demonstrates how SQL injection can destroy data. To delete the
                        evidence, type the following into the input:
                    </p>
                    <CodeBlock code={"anything'; DROP TABLE access_log--"} />
                    <p>
                        This chains two queries: the intended SELECT and your malicious{' '}
                        <code style={{ color: '#f87171', fontFamily: 'monospace' }}>DROP TABLE</code>.
                        The semicolon enables chaining; the comment ensures clean syntax.
                    </p>
                    <p style={{ color: '#fca5a5' }}>
                        ⚠️ Availability compromised — you erased the logs and covered your tracks.
                    </p>
                    <Screenshot
                        src="/images/13.jpg"
                        alt="Step 13 — Drop table activity answer"
                        label="Step 13 — Our completed answer"
                        type="activity"
                    />
                </Step>

                {/* ── Footer ────────────────────────────────────────── */}
                <div style={{
                    marginTop: '2.5rem', paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(99,150,255,0.1)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
                }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono',monospace", color: 'rgba(148,163,200,0.4)' }}>
                        IAS Final Project · WebGoat SQL Injection Intro
                    </span>
                    <Link
                        href={route('blog.sql-advanced')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: 'linear-gradient(135deg,#4f8cff22,#a78bfa22)',
                            border: '1px solid rgba(99,150,255,0.25)', color: '#93bfff',
                            textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
                            padding: '8px 18px', borderRadius: 999, transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,140,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(99,150,255,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#4f8cff22,#a78bfa22)'; e.currentTarget.style.borderColor = 'rgba(99,150,255,0.25)'; }}
                    >
                        Next: SQL Injection Advanced →
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
