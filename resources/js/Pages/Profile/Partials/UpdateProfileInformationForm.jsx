import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

const sectionTitle = { fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '0.25rem' };
const sectionSub   = { fontSize: '0.83rem', color: 'rgba(148,163,200,0.7)', lineHeight: 1.6, marginBottom: '1.25rem' };
const labelStyle   = { fontSize: '0.8rem', fontWeight: 600, color: 'rgba(148,163,200,0.85)', marginBottom: '0.35rem', display: 'block' };

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name:  user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 style={sectionTitle}>Profile Information</h2>
                <p style={sectionSub}>Update your account's profile information and email address.</p>
            </header>

            <form onSubmit={submit} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required isFocused autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p style={{ fontSize: '0.83rem', color: 'rgba(248,113,113,0.9)' }}>
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                style={{ color: '#93bfff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <p style={{ marginTop: '0.5rem', fontSize: '0.83rem', color: '#6ee7b7' }}>
                                A new verification link has been sent to your email address.
                            </p>
                        )}
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            background: 'linear-gradient(135deg, #4f8cff, #7c3aed)',
                            color: '#fff', padding: '0.6rem 1.5rem',
                            borderRadius: '10px', fontWeight: 700,
                            fontSize: '0.85rem', border: 'none',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            opacity: processing ? 0.6 : 1,
                            boxShadow: '0 4px 16px rgba(79,140,255,0.25)',
                        }}
                    >
                        Save
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out" enterFrom="opacity-0"
                        leave="transition ease-in-out" leaveTo="opacity-0"
                    >
                        <p style={{ fontSize: '0.83rem', color: '#6ee7b7' }}>Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
