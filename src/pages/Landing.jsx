import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const Landing = () => {
    const features = [
        {
            icon: Shield,
            title: 'Secure & Verified',
            description: 'Aadhaar-based KYC verification ensures all users are authentic and trustworthy.',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            icon: Users,
            title: 'Easy Management',
            description: 'Streamline tenant-owner relationships with intuitive dashboards and tools.',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: TrendingUp,
            title: 'Track Everything',
            description: 'Monitor payments, requests, and property details all in one place.',
            color: 'from-purple-500 to-pink-600'
        },
    ];

    const benefits = [
        'Instant Aadhaar verification',
        'Real-time payment tracking',
        'Maintenance request management',
        'Document storage & management',
        'Automated rent reminders',
        'Secure data encryption'
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <div className="text-center animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4" />
                            <span>Trusted by 1000+ Property Owners</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            Simplify Property
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                                Management
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                            The most secure and efficient platform for owners and tenants.
                            Manage properties, track payments, and handle requests seamlessly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/register"
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
                            >
                                Get Started Free
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-300" />
                                <span>Aadhaar Verified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-300" />
                                <span>Bank-Grade Security</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-300" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
                            Why Choose TrueTenant?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built with modern technology to provide the best experience for property management
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group card-hover p-8 animate-scale-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up">
                            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
                                Everything You Need in One Platform
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                From KYC verification to payment tracking, we've got you covered with powerful features designed for modern property management.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative animate-scale-in">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-3xl opacity-20"></div>
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                            <Building2 className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900">1,000+</div>
                                            <div className="text-gray-600">Properties Managed</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                            <Users className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900">5,000+</div>
                                            <div className="text-gray-600">Verified Users</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                            <TrendingUp className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900">₹10Cr+</div>
                                            <div className="text-gray-600">Transactions Processed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Join thousands of property owners and tenants who trust TrueTenant for their property management needs.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
                    >
                        Create Free Account
                        <ArrowRight className="h-6 w-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;
