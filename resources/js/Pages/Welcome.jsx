import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

/* ─── Shield SVG icon ─────────────────────────────────────────── */
const ShieldIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

/* ─── Small lock icon for buttons ────────────────────────────── */
const LockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

/* ─── Form field wrapper ─────────────────────────────────────── */
const Field = ({ id, label, children }) => (
    <div>
        <InputLabel
            htmlFor={id}
            value={label}
            style={{ color: 'rgba(148,163,200,0.85)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}
        />
        {children}
    </div>
);

export default function Welcome({ auth }) {
    const [showLogin, setShowLogin]       = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const loginForm = useForm({ login: '', password: '', remember: false });
    const registerForm = useForm({
        name: '', username: '', email: '',
        password: '', password_confirmation: '',
    });

    const closeLogin    = () => { setShowLogin(false);    loginForm.reset(); };
    const closeRegister = () => { setShowRegister(false); registerForm.reset(); };

    const submitLogin = (e) => {
        e.preventDefault();
        loginForm.post(route('login'), { onFinish: () => loginForm.reset('password') });
    };

    const submitRegister = (e) => {
        e.preventDefault();
        registerForm.post(route('register'), {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    /* shared input style override */
    const inputStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(99,150,255,0.18)',
        borderRadius: '10px',
        color: '#f0f4ff',
        width: '100%',
        padding: '0.6rem 0.9rem',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    };

    return (
        <div className="app-shell min-h-screen">
            <Head title="Welcome — Secure Login" />

            {/* ── HERO ──────────────────────────────────────────── */}
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Glow orb behind icon */}
                <div style={{
                    width: 100, height: 100,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(79,140,255,0.25) 0%, transparent 70%)',
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -130%)',
                    pointerEvents: 'none',
                }} />

                {/* Icon badge */}
                <div style={{
                    width: 64, height: 64,
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, rgba(79,140,255,0.15) 0%, rgba(167,139,250,0.15) 100%)',
                    border: '1px solid rgba(99,150,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#93bfff',
                    marginBottom: '1.5rem',
                    boxShadow: '0 0 32px rgba(79,140,255,0.15)',
                }}>
                    <ShieldIcon />
                </div>

                <p style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4f8cff',
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: '0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                }}>
                    <span style={{ display:'block', width:20, height:2, background:'#4f8cff', borderRadius:2 }} />
                    IAS Final Project
                    <span style={{ display:'block', width:20, height:2, background:'#4f8cff', borderRadius:2 }} />
                </p>

                <h1 style={{
                    fontSize: 'clamp(2rem,4vw,3.2rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    background: 'linear-gradient(135deg, #f0f4ff 30%, #93bfff 70%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.75rem',
                }}>
                    Secure Login
                </h1>

                <p style={{
                    color: 'rgba(148,163,200,0.8)',
                    fontSize: '1rem',
                    maxWidth: '28rem',
                    lineHeight: 1.65,
                    marginBottom: '2.5rem',
                }}>
                    A security-focused web application built for the IAS course.
                    Implements bcrypt hashing, server-side validation, and safe error handling.
                </p>

                {auth?.user ? (
                    <Link
                        href={route('dashboard')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            background: 'linear-gradient(135deg, #4f8cff, #7c3aed)',
                            color: '#fff',
                            padding: '0.75rem 2rem',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            boxShadow: '0 4px 24px rgba(79,140,255,0.3)',
                            transition: 'opacity 0.2s, transform 0.2s',
                        }}
                    >
                        <LockIcon /> Go to Dashboard
                    </Link>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '22rem' }}>
                        {/* Log In */}
                        <button
                            type="button"
                            id="btn-login"
                            onClick={() => setShowLogin(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                background: 'linear-gradient(135deg, #4f8cff, #7c3aed)',
                                color: '#fff',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '0.92rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 24px rgba(79,140,255,0.3)',
                                transition: 'opacity 0.2s, transform 0.2s',
                                width: '100%',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <LockIcon /> Log In
                        </button>

                        {/* Register */}
                        <button
                            type="button"
                            id="btn-register"
                            onClick={() => setShowRegister(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                background: 'rgba(255,255,255,0.04)',
                                color: 'rgba(148,163,200,0.9)',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '0.92rem',
                                border: '1px solid rgba(99,150,255,0.2)',
                                cursor: 'pointer',
                                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                                width: '100%',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(79,140,255,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(79,140,255,0.4)';
                                e.currentTarget.style.color = '#f0f4ff';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                e.currentTarget.style.borderColor = 'rgba(99,150,255,0.2)';
                                e.currentTarget.style.color = 'rgba(148,163,200,0.9)';
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                )}

                {/* Security tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
                    {['bcrypt hashing', 'SQL injection defense', 'safe error handling', 'rate limiting'].map(t => (
                        <span key={t} className="tag">{t}</span>
                    ))}
                </div>
            </div>

            {/* ── LOGIN MODAL ───────────────────────────────────── */}
            <Modal show={showLogin} onClose={closeLogin} maxWidth="md">
                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                            <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(99,150,255,0.7)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>
                                Authentication
                            </p>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em' }}>
                                Welcome back
                            </h2>
                        </div>
                        <button type="button" onClick={closeLogin}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,150,255,0.15)', color: 'rgba(148,163,200,0.7)', borderRadius: 8, padding: '5px 12px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#f0f4ff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(148,163,200,0.7)'; }}
                        >✕ Close</button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(148,163,200,0.7)', marginBottom: '1.5rem' }}>
                        Enter your credentials to access the dashboard.
                    </p>

                    <form onSubmit={submitLogin} style={{ display: 'grid', gap: '1rem' }}>
                        <Field id="login" label="Username or Email">
                            <TextInput
                                id="login" type="text" name="login"
                                value={loginForm.data.login}
                                style={inputStyle}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => loginForm.setData('login', e.target.value)}
                            />
                            <InputError message={loginForm.errors.login} className="mt-2" />
                        </Field>

                        <Field id="password" label="Password">
                            <TextInput
                                id="password" type="password" name="password"
                                value={loginForm.data.password}
                                style={inputStyle}
                                autoComplete="current-password"
                                onChange={(e) => loginForm.setData('password', e.target.value)}
                            />
                            <InputError message={loginForm.errors.password} className="mt-2" />
                        </Field>

                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'rgba(148,163,200,0.8)', cursor: 'pointer' }}>
                            <Checkbox
                                name="remember"
                                checked={loginForm.data.remember}
                                onChange={(e) => loginForm.setData('remember', e.target.checked)}
                            />
                            Remember me
                        </label>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '0.25rem' }}>
                            <Link href={route('password.request')}
                                style={{ fontSize: '0.82rem', color: 'rgba(148,163,200,0.65)', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color='#93bfff'}
                                onMouseLeave={e => e.currentTarget.style.color='rgba(148,163,200,0.65)'}
                            >
                                Forgot password?
                            </Link>
                            <button type="submit" disabled={loginForm.processing}
                                style={{
                                    background: 'linear-gradient(135deg, #4f8cff, #7c3aed)',
                                    color: '#fff',
                                    padding: '0.65rem 1.5rem',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.88rem',
                                    border: 'none',
                                    cursor: loginForm.processing ? 'not-allowed' : 'pointer',
                                    opacity: loginForm.processing ? 0.6 : 1,
                                    boxShadow: '0 4px 20px rgba(79,140,255,0.25)',
                                    transition: 'opacity 0.2s',
                                }}
                            >
                                {loginForm.processing ? 'Logging in…' : 'Log In →'}
                            </button>
                        </div>
                    </form>

                    <p style={{ marginTop: '1.5rem', fontSize: '0.83rem', color: 'rgba(148,163,200,0.6)', borderTop: '1px solid rgba(99,150,255,0.1)', paddingTop: '1rem' }}>
                        Don't have an account?{' '}
                        <button type="button"
                            onClick={() => { closeLogin(); setShowRegister(true); }}
                            style={{ fontWeight: 700, color: '#93bfff', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </Modal>

            {/* ── REGISTER MODAL ────────────────────────────────── */}
            <Modal show={showRegister} onClose={closeRegister} maxWidth="md">
                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                            <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(99,150,255,0.7)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>
                                New Account
                            </p>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em' }}>
                                Create account
                            </h2>
                        </div>
                        <button type="button" onClick={closeRegister}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,150,255,0.15)', color: 'rgba(148,163,200,0.7)', borderRadius: 8, padding: '5px 12px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#f0f4ff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(148,163,200,0.7)'; }}
                        >✕ Close</button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(148,163,200,0.7)', marginBottom: '1.5rem' }}>
                        Fill in the details below to create your account.
                    </p>

                    <form onSubmit={submitRegister} style={{ display: 'grid', gap: '1rem' }}>
                        <Field id="name" label="Full Name">
                            <TextInput id="name" name="name" value={registerForm.data.name}
                                style={inputStyle} autoComplete="name" required
                                onChange={(e) => registerForm.setData('name', e.target.value)}
                            />
                            <InputError message={registerForm.errors.name} className="mt-2" />
                        </Field>

                        <Field id="username" label="Username">
                            <TextInput id="username" name="username" value={registerForm.data.username}
                                style={inputStyle} autoComplete="username" required
                                onChange={(e) => registerForm.setData('username', e.target.value)}
                            />
                            <InputError message={registerForm.errors.username} className="mt-2" />
                        </Field>

                        <Field id="email" label="Email Address">
                            <TextInput id="email" type="email" name="email" value={registerForm.data.email}
                                style={inputStyle} autoComplete="email" required
                                onChange={(e) => registerForm.setData('email', e.target.value)}
                            />
                            <InputError message={registerForm.errors.email} className="mt-2" />
                        </Field>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Field id="register-password" label="Password">
                                <TextInput id="register-password" type="password" name="password"
                                    value={registerForm.data.password}
                                    style={inputStyle} autoComplete="new-password" required
                                    onChange={(e) => registerForm.setData('password', e.target.value)}
                                />
                                <InputError message={registerForm.errors.password} className="mt-2" />
                            </Field>

                            <Field id="password_confirmation" label="Confirm Password">
                                <TextInput id="password_confirmation" type="password" name="password_confirmation"
                                    value={registerForm.data.password_confirmation}
                                    style={inputStyle} autoComplete="new-password" required
                                    onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={registerForm.errors.password_confirmation} className="mt-2" />
                            </Field>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '0.25rem' }}>
                            <button type="button"
                                onClick={() => { closeRegister(); setShowLogin(true); }}
                                style={{ fontSize: '0.82rem', color: 'rgba(148,163,200,0.65)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                onMouseEnter={e => e.currentTarget.style.color='#93bfff'}
                                onMouseLeave={e => e.currentTarget.style.color='rgba(148,163,200,0.65)'}
                            >
                                Already registered?
                            </button>
                            <button type="submit" disabled={registerForm.processing}
                                style={{
                                    background: 'linear-gradient(135deg, #4f8cff, #7c3aed)',
                                    color: '#fff',
                                    padding: '0.65rem 1.5rem',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.88rem',
                                    border: 'none',
                                    cursor: registerForm.processing ? 'not-allowed' : 'pointer',
                                    opacity: registerForm.processing ? 0.6 : 1,
                                    boxShadow: '0 4px 20px rgba(79,140,255,0.25)',
                                    transition: 'opacity 0.2s',
                                }}
                            >
                                {registerForm.processing ? 'Creating…' : 'Create Account →'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
