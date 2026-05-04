import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

const sectionTitle = { fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '0.25rem' };
const sectionSub   = { fontSize: '0.83rem', color: 'rgba(148,163,200,0.7)', lineHeight: 1.6, marginBottom: '1.25rem' };
const labelStyle   = { fontSize: '0.8rem', fontWeight: 600, color: 'rgba(148,163,200,0.85)', marginBottom: '0.35rem', display: 'block' };

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput        = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 style={sectionTitle}>Update Password</h2>
                <p style={sectionSub}>Ensure your account is using a long, random password to stay secure.</p>
            </header>

            <form onSubmit={updatePassword} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label htmlFor="current_password" style={labelStyle}>Current Password</label>
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password" style={labelStyle}>New Password</label>
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" style={labelStyle}>Confirm Password</label>
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

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
