import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

const SimpleUserIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 19.5c1.7-3 4.3-4.5 7-4.5s5.3 1.5 7 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

/* ── Requirement check icons ─────────────────────────────────────────── */
const PassIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0, transition: 'all 0.2s' }}>
        <path d="M20 6L9 17l-5-5" />
    </svg>
);
const FailIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0, transition: 'all 0.2s' }}>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

/* ── Strength rules ──────────────────────────────────────────────────── */
const rules = [
    {
        key: 'length',
        test: (p) => p.length >= 8,
        pass: 'At least 8 characters ✓',
        fail: 'Must be at least 8 characters',
    },
    {
        key: 'upper',
        test: (p) => /[A-Z]/.test(p),
        pass: 'Uppercase letter included ✓',
        fail: 'Missing an uppercase letter (A–Z)',
    },
    {
        key: 'number',
        test: (p) => /[0-9]/.test(p),
        pass: 'Number included ✓',
        fail: 'Missing a number (0–9)',
    },
    {
        key: 'symbol',
        test: (p) => /[^A-Za-z0-9]/.test(p),
        pass: 'Special character included ✓',
        fail: 'Missing a special character (!@#$%^&*…)',
    },
];

const strengthMeta = [
    { label: '',        color: 'rgba(148,163,200,0.3)' },
    { label: 'Weak',   color: '#ef4444' },
    { label: 'Fair',   color: '#f97316' },
    { label: 'Good',   color: '#eab308' },
    { label: 'Strong', color: '#22c55e' },
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    /* Live evaluation */
    const evaluated = useMemo(() => {
        return rules.map((r) => ({ ...r, passed: r.test(data.password) }));
    }, [data.password]);

    const score   = evaluated.filter((r) => r.passed).length; // 0-4
    const meta    = strengthMeta[score];
    const isTyped = data.password.length > 0;

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout logo={<SimpleUserIcon className="h-16 w-16 text-gray-500" />}>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Full Name */}
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />
                    <TextInput
                        id="name" name="name" value={data.name}
                        className="mt-1 block w-full" autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)} required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Username */}
                <div className="mt-4">
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="username" name="username" value={data.username}
                        className="mt-1 block w-full" autoComplete="username"
                        onChange={(e) => setData('username', e.target.value)} required
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email" type="email" name="email" value={data.email}
                        className="mt-1 block w-full" autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)} required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* ── Password ──────────────────────────────────────── */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password" type="password" name="password"
                        value={data.password} className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)} required
                    />

                    {/* Backend error (only shown after submit) */}
                    <InputError message={errors.password} className="mt-2" />

                    {/* ── Strength widget ─────────────────────────── */}
                    {isTyped && (
                        <div style={{ marginTop: '0.65rem' }}>

                            {/* Progress bars */}
                            <div style={{ display: 'flex', gap: 4, marginBottom: '0.45rem' }}>
                                {[1, 2, 3, 4].map((n) => (
                                    <div key={n} style={{
                                        flex: 1, height: 5, borderRadius: 4,
                                        background: n <= score ? meta.color : 'rgba(148,163,200,0.12)',
                                        transition: 'background 0.25s',
                                    }} />
                                ))}
                            </div>

                            {/* Strength label */}
                            <p style={{
                                fontSize: '0.73rem', fontWeight: 700,
                                color: score > 0 ? meta.color : 'rgba(148,163,200,0.45)',
                                marginBottom: '0.55rem',
                                transition: 'color 0.25s',
                                letterSpacing: '0.03em',
                            }}>
                                {score === 0 ? 'Too weak' : `Password strength: ${meta.label}`}
                            </p>

                            {/* Requirement checklist — shows specific missing message */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.3rem' }}>
                                {evaluated.map((r) => (
                                    <li key={r.key} style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        fontSize: '0.74rem',
                                        color: r.passed ? '#34d399' : '#f87171',
                                        fontWeight: r.passed ? 500 : 600,
                                        transition: 'color 0.2s',
                                    }}>
                                        {r.passed ? <PassIcon /> : <FailIcon />}
                                        {r.passed ? r.pass : r.fail}
                                    </li>
                                ))}
                            </ul>

                            {/* All-pass banner */}
                            {score === 4 && (
                                <div style={{
                                    marginTop: '0.6rem',
                                    background: 'rgba(34,197,94,0.1)',
                                    border: '1px solid rgba(34,197,94,0.3)',
                                    borderRadius: 8, padding: '6px 12px',
                                    fontSize: '0.74rem', fontWeight: 600, color: '#22c55e',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                }}>
                                    🔒 Strong password — you're good to go!
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation" type="password"
                        name="password_confirmation" value={data.password_confirmation}
                        className="mt-1 block w-full" autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)} required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
