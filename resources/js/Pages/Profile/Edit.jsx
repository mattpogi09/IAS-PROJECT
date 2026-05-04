import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <h2 className="page-title">Profile</h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div style={{ padding: '2rem 0' }}>
                <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gap: '1.5rem' }}>

                    {/* Profile Information */}
                    <div style={{
                        background: 'rgba(15,22,40,0.8)',
                        border: '1px solid rgba(99,150,255,0.15)',
                        borderRadius: '16px',
                        padding: '2rem',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Update Password */}
                    <div style={{
                        background: 'rgba(15,22,40,0.8)',
                        border: '1px solid rgba(99,150,255,0.15)',
                        borderRadius: '16px',
                        padding: '2rem',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Delete Account */}
                    <div style={{
                        background: 'rgba(15,22,40,0.8)',
                        border: '1px solid rgba(248,113,113,0.15)',
                        borderRadius: '16px',
                        padding: '2rem',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}>
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
