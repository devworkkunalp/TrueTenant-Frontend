import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Mail, Lock, User, UserCircle, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tenant');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await register(name, email, password, role);
        setLoading(false);

        if (result.success) {
            if (role === 'owner') {
                navigate('/owner');
            } else {
                navigate('/tenant');
            }
        } else {
            setError(result.message || 'Failed to register. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <div className="max-w-md w-full space-y-8 animate-scale-in">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-10 text-center">
                        <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                            <Building2 className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white">
                            Create Account
                        </h2>
                        <p className="mt-2 text-blue-100">
                            Join TrueTenant and start managing properties
                        </p>
                    </div>

                    {/* Form */}
                    <form className="px-8 py-10 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-slide-up">
                                <div className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="input-field pl-12"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="input-field pl-12"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="input-field pl-12"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                I am a...
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('tenant')}
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${role === 'tenant'
                                            ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/20'
                                            : 'border-gray-200 hover:border-primary-300 bg-white'
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <UserCircle className={`h-8 w-8 ${role === 'tenant' ? 'text-primary-600' : 'text-gray-400'}`} />
                                        <span className={`font-semibold ${role === 'tenant' ? 'text-primary-700' : 'text-gray-700'}`}>
                                            Tenant
                                        </span>
                                    </div>
                                    {role === 'tenant' && (
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle className="h-5 w-5 text-primary-600" />
                                        </div>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole('owner')}
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${role === 'owner'
                                            ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/20'
                                            : 'border-gray-200 hover:border-primary-300 bg-white'
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Building2 className={`h-8 w-8 ${role === 'owner' ? 'text-primary-600' : 'text-gray-400'}`} />
                                        <span className={`font-semibold ${role === 'owner' ? 'text-primary-700' : 'text-gray-700'}`}>
                                            Owner
                                        </span>
                                    </div>
                                    {role === 'owner' && (
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle className="h-5 w-5 text-primary-600" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Trust indicators */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span>KYC Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span>Free</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
