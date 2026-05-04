import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

const sectionTitle = { fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '0.25rem' };
const sectionSub   = { fontSize: '0.83rem', color: 'rgba(148,163,200,0.7)', lineHeight: 1.6, marginBottom: '1.25rem' };

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 style={sectionTitle}>Delete Account</h2>
                <p style={sectionSub}>
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                    Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <button
                type="button"
                onClick={confirmUserDeletion}
                style={{
                    background: 'rgba(248,113,113,0.1)',
                    border: '1px solid rgba(248,113,113,0.3)',
                    color: '#fca5a5',
                    padding: '0.6rem 1.4rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(248,113,113,0.2)'; e.currentTarget.style.borderColor='rgba(248,113,113,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(248,113,113,0.1)'; e.currentTarget.style.borderColor='rgba(248,113,113,0.3)'; }}
            >
                Delete Account
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser} style={{ padding: '2rem' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(248,113,113,0.8)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>
                                Danger Zone
                            </p>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f0f4ff' }}>
                                Delete your account?
                            </h2>
                        </div>
                        <button type="button" onClick={closeModal}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,150,255,0.15)', color: 'rgba(148,163,200,0.7)', borderRadius: 8, padding: '5px 12px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#f0f4ff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(148,163,200,0.7)'; }}
                        >✕</button>
                    </div>

                    <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(248,113,113,0.4), transparent)', marginBottom: '1rem' }} />

                    <p style={{ fontSize: '0.85rem', color: 'rgba(148,163,200,0.8)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                        Once your account is deleted, all of its resources and data will be permanently deleted.
                        Enter your password to confirm.
                    </p>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(148,163,200,0.85)', display: 'block', marginBottom: '0.35rem' }}>
                            Password
                        </label>
                        <TextInput
                            id="delete-password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            isFocused
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button type="button" onClick={closeModal}
                            style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,150,255,0.15)',
                                color: 'rgba(148,163,200,0.85)', padding: '0.6rem 1.25rem',
                                borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}
                        >
                            Cancel
                        </button>
                        <button type="submit" disabled={processing}
                            style={{
                                background: processing ? 'rgba(248,113,113,0.3)' : 'rgba(248,113,113,0.15)',
                                border: '1px solid rgba(248,113,113,0.4)',
                                color: '#fca5a5', padding: '0.6rem 1.25rem',
                                borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                opacity: processing ? 0.6 : 1,
                            }}
                        >
                            {processing ? 'Deleting…' : 'Delete Account'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
