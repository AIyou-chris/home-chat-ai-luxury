import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

export const UserProfile: React.FC = () => {
    const { user, profile, updateProfile, uploadAvatar, loading, error, clearError } = useAuth();
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [username, setUsername] = useState(profile?.username || '');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
            setUsername(profile.username || '');
        }
    }, [profile]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        setUpdating(true);

        const { error } = await updateProfile({
            full_name: fullName,
            username: username,
        });

        if (!error) {
            alert('Profile updated successfully!');
        }
        setUpdating(false);
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        clearError();
        const { error } = await uploadAvatar(file);
        if (!error) {
            alert('Avatar updated successfully!');
        }
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {error}
                </div>
            )}

            <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                    {profile?.avatar_url ? (
                        <img
                            className="h-20 w-20 rounded-full object-cover"
                            src={profile.avatar_url}
                            alt="Avatar"
                        />
                    ) : (
                        <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-2xl">
                                {user?.email?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                    />
                </div>

                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={updating || loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {updating ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
}; 