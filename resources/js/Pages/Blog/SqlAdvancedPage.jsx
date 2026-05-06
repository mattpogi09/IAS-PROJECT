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
const ACCENT = '#c4b5fd';

/* ── Sub-components ─────────────────────────────────────────────────── */
const CodeBlock = ({ code }) => (
    <div style={{
        background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(167,139,250,0.22)',
        borderRadius: 10, padding: '0.85rem 1.1rem', margin: '0.75rem 0',
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
        fontSize: '0.82rem', color: '#c4b5fd', overflowX: 'auto',
        display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
        whiteSpace: 'pre-wrap',
    }}>
        <span style={{ color: 'rgba(167,139,250,0.4)', marginTop: 2, flexShrink: 0 }}><CodeIcon /></span>
        <span>{code}</span>
    </div>
);

/* Screenshot image with caption */
const Screenshot = ({ src, alt, label, type = 'lesson' }) => {
    const isLesson   = type === 'lesson';
    const badgeBg    = isLesson ? 'rgba(167,139,250,0.15)' : 'rgba(52,211,153,0.12)';
    const badgeColor = isLesson ? '#c4b5fd'                : '#6ee7b7';
    const badgeText  = isLesson ? 'Lesson Screenshot'      : 'Activity — Our Answer';
    return (
        <div style={{
            margin: '1.1rem 0',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(167,139,250,0.15)',
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
                borderTop: '1px solid rgba(167,139,250,0.1)',
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

const InfoBox = ({ color = ACCENT, children }) => (
    <div style={{
        background: `${color}0f`, border: `1px solid ${color}33`,
        borderRadius: 10, padding: '0.9rem 1.1rem', margin: '0.8rem 0',
        fontSize: '0.87rem', color: 'rgba(148,163,200,0.85)', lineHeight: 1.75,
    }}>
        {children}
    </div>
);

/* Step container */
const Step = ({ number, title, tag, tagColor = ACCENT, children }) => (
    <div style={{
        background: 'rgba(15,22,40,0.65)',
        border: '1px solid rgba(167,139,250,0.12)',
        borderRadius: 16, padding: '1.6rem 2rem',
        marginBottom: '1.5rem', backdropFilter: 'blur(8px)',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
            <span style={{
                background: 'linear-gradient(135deg,#a78bfa22,#4f8cff22)',
                border: '1px solid rgba(167,139,250,0.25)', color: '#c4b5fd',
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
   SQL INJECTION (ADVANCED) — BLOG PAGE
═══════════════════════════════════════════════════════════════════ */
export default function SqlAdvancedPage() {
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
                        onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,200,0.7)'}
                    >
                        <ArrowLeft /> Back to Dashboard
                    </Link>
                    <span style={{ color: 'rgba(99,150,255,0.3)' }}>·</span>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8ff' }}>
                        SQL Injection (Advanced)
                    </h2>
                </div>
            }
        >
            <Head title="SQL Injection (Advanced) — Blog" />

            <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

                {/* ── Page header ───────────────────────────────────── */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <p style={{
                        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: '#c4b5fd',
                        fontFamily: "'JetBrains Mono',monospace", marginBottom: '0.5rem',
                    }}>
                        WebGoat · (A3) Injection Advanced · May 2026
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900,
                        color: '#f0f4ff', letterSpacing: '-0.03em', lineHeight: 1.15,
                        marginBottom: '1rem',
                    }}>
                        SQL Injection (Advanced)
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'rgba(148,163,200,0.75)', lineHeight: 1.8, maxWidth: 700 }}>
                        Applying everything from the intro — combining SQL injection techniques,
                        blind SQLi, UNION-based data extraction, automated password cracking, and
                        how prepared statements stop all of it. Screenshots include lesson slides
                        and our completed activity answers.
                    </p>
                    <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(167,139,250,0.5),transparent)', marginTop: '1.75rem' }} />
                </div>

                {/* ── STEP 1 ─────────────────────────────────────────── */}
                <Step number={1} title="Goal: Combining Techniques & Blind SQLi" tag="Lesson" tagColor="#c4b5fd">
                    <p>
                        The goal of this module is to master{' '}
                        <strong style={{ color: '#c4b5fd' }}>combining SQL injection techniques</strong> and to
                        understand <strong style={{ color: '#c4b5fd' }}>Blind SQL Injection</strong> — where you
                        can't see the query output directly.
                    </p>
                    <Screenshot
                        src="/images/1 lesson advance.jpg"
                        alt="Step 1 — Advanced lesson: Concept and Goals"
                        label="Step 1 — Lesson slide (Concept & Goals)"
                        type="lesson"
                    />
                </Step>

                {/* ── STEP 2 ─────────────────────────────────────────── */}
                <Step number={2} title="Special Characters, UNION & JOIN" tag="Lesson" tagColor="#c4b5fd">
                    <p>
                        Special characters such as inline comments{' '}
                        (<code style={{ color: '#c4b5fd', fontFamily: 'monospace' }}>/* */</code>) and
                        line comments (<code style={{ color: '#c4b5fd', fontFamily: 'monospace' }}>--, #</code>)
                        allow attackers to remove conditions like password checks.
                        The semicolon (<code style={{ color: '#c4b5fd', fontFamily: 'monospace' }}>;</code>)
                        enables query chaining — executing multiple statements in one request.
                    </p>
                    <p>
                        String concatenation operators and functions like{' '}
                        <code style={{ color: '#c4b5fd', fontFamily: 'monospace' }}>CHAR()</code> allow
                        attackers to construct inputs dynamically around filters.
                    </p>
                    <InfoBox color="#c4b5fd">
                        The <strong>UNION</strong> operator combines results from multiple SELECT statements.
                        Attackers match column count/type to pull data from other tables.
                        SQL <strong>JOIN</strong> can also link datasets to expose additional sensitive information.
                    </InfoBox>
                    {/* Step 2 lesson slide shows Special Characters & Special Statements */}
                    <Screenshot
                        src="/images/1.1 lesson advance.jpg"
                        alt="Step 2 — Special Characters, UNION & JOIN lesson"
                        label="Step 2 — Lesson slide (Special Characters & UNION)"
                        type="lesson"
                    />
                </Step>

                {/* ── STEP 3 ─────────────────────────────────────────── */}
                <Step number={3} title="UNION Attack — Extracting Dave's Password" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        This exercise shows how a vulnerable input field can be exploited to retrieve data
                        from a different table. Instead of only querying{' '}
                        <code style={{ color: '#c4b5fd', fontFamily: 'monospace' }}>user_data</code>,
                        we access <code style={{ color: '#c4b5fd', fontFamily: 'monospace' }}>user_system_data</code>{' '}
                        which contains usernames and passwords. The goal: extract{' '}
                        <strong style={{ color: '#c4b5fd' }}>Dave's password</strong>.
                    </p>
                    <CodeBlock code={`' UNION SELECT userid, user_name, password, cookie, null as f1, null as f2, null as f3 FROM user_system_data;--`} />
                    <InfoBox color="#a78bfa">
                        <strong>How it works:</strong> Closes the original query, UNION pulls fields
                        (including passwords) from <code style={{ fontFamily: 'monospace' }}>user_system_data</code>.
                        Null values match the required column count.
                        The <code style={{ fontFamily: 'monospace' }}>--</code> comments out the rest.
                    </InfoBox>
                    <p style={{ color: '#fca5a5' }}>
                        ⚠️ Improper input validation allows attackers to expose sensitive data from any table.
                    </p>
                    <Screenshot
                        src="/images/2 advance.jpg"
                        alt="Step 3 — Try It: Pulling data from other tables"
                        label="Step 3 — Activity (UNION pull from user_system_data)"
                        type="activity"
                    />
                    <Screenshot
                        src="/images/2.2 advance answered.jpg"
                        alt="Step 3 — UNION attack answer showing Dave's password"
                        label="Step 3 — Our completed answer (Dave's password: passW0rD)"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 4 ─────────────────────────────────────────── */}
                <Step number={4} title="Blind SQL Injection" tag="Lesson" tagColor="#c4b5fd">
                    <p>
                        <strong style={{ color: '#c4b5fd' }}>Blind SQL Injection</strong> is an attack
                        where the application is vulnerable but hides errors and query results.
                        The attacker extracts data by asking the database True/False questions and
                        observing indirect clues.
                    </p>
                    <InfoBox color="#34d399">
                        <strong style={{ color: '#34d399' }}>Content-Based (Boolean)</strong> — Injects
                        true/false statements (<code style={{ fontFamily: 'monospace' }}>AND 1=1</code> vs{' '}
                        <code style={{ fontFamily: 'monospace' }}>AND 1=2</code>). Page content changes
                        differently based on the result.
                    </InfoBox>
                    <InfoBox color="#f97316">
                        <strong style={{ color: '#f97316' }}>Time-Based</strong> — Injects commands that
                        pause the database (e.g., <code style={{ fontFamily: 'monospace' }}>sleep(10)</code>).
                        If the page takes 10 seconds, the query executed.
                    </InfoBox>
                    <Screenshot
                        src="/images/3 lesson advance.jpg"
                        alt="Step 4 — Blind SQL Injection lesson"
                        label="Step 4 — Lesson slide (Blind SQL Injection theory & examples)"
                        type="lesson"
                    />
                </Step>

                {/* ── STEP 5 ─────────────────────────────────────────── */}
                <Step number={5} title="Login Bypass — Logging in as Tom" tag="Activity" tagColor="#6ee7b7">
                    <p>
                        This activity challenges you to bypass login and log in as{' '}
                        <strong style={{ color: '#c4b5fd' }}>Tom</strong> without knowing his password.
                        The backend query is:
                    </p>
                    <CodeBlock code={`SELECT * FROM user_system_data WHERE username='' + username + "'"`} />
                    <p>
                        We test whether Tom's password starts with "t" by injecting into the username field:
                    </p>
                    <CodeBlock code={`tom' and substring(password,1,1)='t`} />
                    <p>
                        This works because whatever goes into the username field is inserted directly into
                        a standalone SQL statement — no other statements run afterwards. So injecting our
                        own SQL there has no other barriers.
                    </p>

                    <div style={{
                        marginTop: '1rem',
                        background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(167,139,250,0.2)',
                        borderRadius: 10, padding: '1rem 1.2rem',
                    }}>
                        <p style={{ fontWeight: 600, color: '#c4b5fd', marginBottom: '0.4rem', fontSize: '0.87rem' }}>
                            🐍 Automating the Attack with Python
                        </p>
                        <p style={{ fontSize: '0.87rem', color: 'rgba(148,163,200,0.8)', marginBottom: '0.5rem' }}>
                            This script sends repeated HTTP requests using the{' '}
                            <code style={{ color: '#c4b5fd', fontFamily: 'monospace' }}>requests</code>{' '}
                            library, guessing the password one character at a time. If the server
                            response contains "already exists", the character is confirmed.
                        </p>
                        <CodeBlock code={`# Run in terminal:\npython3 getPass.py\n\n# The script reconstructs the full password character-by-character\n# by exploiting the SQL injection in the username field.`} />
                        <p style={{ fontSize: '0.87rem', color: 'rgba(148,163,200,0.75)' }}>
                            Once you have Tom's password from the script output, paste it into the login form.
                        </p>
                    </div>
                    {/* 4 advance = the login form (Goal: Can you log in as Tom?) */}
                    <Screenshot
                        src="/images/4 advance.jpg"
                        alt="Step 5 — Login bypass: Goal is to log in as Tom"
                        label="Step 5 — Activity (login form, goal: log in as Tom)"
                        type="activity"
                    />
                    {/* 4 advance answered = login succeeded with Tom's cracked password */}
                    <Screenshot
                        src="/images/4 advance answered.jpg"
                        alt="Step 5 — Login bypass completed: logged in as Tom"
                        label="Step 5 — Our completed answer (Congratulations!)"
                        type="activity"
                    />
                </Step>

                {/* ── STEP 6 ─────────────────────────────────────────── */}
                <Step number={6} title="Prepared Statements — The Defense" tag="Activity" tagColor="#6ee7b7">
                    <p style={{ marginBottom: '1rem' }}>
                        The final step is a quiz that tests your knowledge of{' '}
                        <strong style={{ color: '#34d399' }}>prepared statements</strong> and how they
                        prevent SQL injection. Five questions to answer correctly:
                    </p>

                    {[
                        {
                            q: '1. What is the difference between a prepared statement and a statement?',
                            a: 'A statement includes actual values inserted directly into the SQL string. A prepared statement uses placeholders — the SQL structure is defined first, user input is supplied later as a separate parameter, never mixed with commands.',
                            color: '#93bfff',
                        },
                        {
                            q: '2. Which character is a placeholder for variables?',
                            a: 'The question mark (?) is the standard placeholder in most database drivers (Java JDBC, PHP PDO, etc.).',
                            color: '#c4b5fd',
                        },
                        {
                            q: '3. How can prepared statements be faster than regular statements?',
                            a: 'The database compiles and optimizes the query plan just once. Running the same query 1,000 times with different inputs just plugs new values into the already-compiled plan — saving significant processing time.',
                            color: '#34d399',
                        },
                        {
                            q: '4. How do prepared statements prevent SQL injection?',
                            a: 'Because the query structure is pre-compiled before input is added, the database knows exactly what is a "command" and what is "data." It treats injected input strictly as a literal string — completely neutralizing malicious SQL.',
                            color: '#6ee7b7',
                        },
                        {
                            q: "5. What happens if an attacker enters: Robert); DROP TABLE Students;--",
                            a: 'With a prepared statement, the database registers a user whose literal first name is the exact string "Robert); DROP TABLE Students;--". No tables are dropped. The database is safe.',
                            color: '#fdba74',
                        },
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'rgba(0,0,0,0.2)',
                            border: `1px solid ${item.color}22`,
                            borderLeft: `3px solid ${item.color}`,
                            borderRadius: 8, padding: '0.85rem 1.1rem',
                            marginBottom: '0.75rem',
                        }}>
                            <p style={{ fontWeight: 600, color: item.color, marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                                {item.q}
                            </p>
                            <p style={{ fontSize: '0.87rem', color: 'rgba(148,163,200,0.8)', lineHeight: 1.7 }}>
                                {item.a}
                            </p>
                        </div>
                    ))}
                    <Screenshot
                        src="/images/5 advance.jpg"
                        alt="Step 6 — Prepared Statements quiz completed"
                        label="Step 6 — Our completed quiz answers (all correct)"
                        type="activity"
                    />
                </Step>

                {/* ── Footer ────────────────────────────────────────── */}
                <div style={{
                    marginTop: '2.5rem', paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(167,139,250,0.1)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
                }}>
                    <Link
                        href={route('blog.sql-intro')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: 'linear-gradient(135deg,#a78bfa22,#4f8cff22)',
                            border: '1px solid rgba(167,139,250,0.25)', color: '#c4b5fd',
                            textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
                            padding: '8px 18px', borderRadius: 999, transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.2)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#a78bfa22,#4f8cff22)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.25)'; }}
                    >
                        ← Back: SQL Injection Intro
                    </Link>
                    <span style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono',monospace", color: 'rgba(148,163,200,0.4)' }}>
                        IAS Final Project · WebGoat SQL Injection Advanced
                    </span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
