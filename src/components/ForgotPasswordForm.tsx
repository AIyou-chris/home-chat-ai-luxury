import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const { resetPassword, loading, error, clearError } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        const { error } = await resetPassword(email);
        if (!error) {
            setSent(true);
        }
    };

    if (sent) {
        return (
            <div className="text-center">
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-4">
                    Password reset email sent! Check your inbox and follow the instructions.
                </div>
                <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                    Back to Sign In
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Sending...' : 'Send Reset Email'}
            </button>

            <div className="text-center">
                <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                    Back to Sign In
                </a>
            </div>
        </form>
    );
}; 