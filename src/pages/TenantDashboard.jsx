import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Home, Wrench, DollarSign, Plus, Calendar, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import NewRequestModal from '../components/NewRequestModal';
import PaymentModal from '../components/PaymentModal';
import KYCStatusBanner from '../components/KYCStatusBanner';

const TenantDashboard = () => {
    const { properties, requests, payments, addRequest, addPayment } = useData();
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const currentProperty = properties.length > 0 ? properties[0] : null;
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const lastPayment = payments.length > 0 ? payments[payments.length - 1] : null;
    const pendingRequests = requests.filter(r => r.status === 'Pending').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* KYC Status Banner */}
                <KYCStatusBanner />

                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                        Tenant Dashboard
                    </h1>
                    <p className="text-gray-600">Manage your rental and maintenance requests</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">{currentProperty ? '1' : '0'}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Current Rental</p>
                    </div>

                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <Wrench className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">{pendingRequests}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Pending Requests</p>
                    </div>

                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">₹{totalPaid.toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Total Paid</p>
                    </div>

                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">{payments.length}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Payments Made</p>
                    </div>
                </div>

                {/* Current Rental Section */}
                <div className="mb-8 animate-fade-in">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Current Rental</h2>
                    {currentProperty ? (
                        <div className="card p-0 overflow-hidden">
                            <div className="relative h-64">
                                <img
                                    src={currentProperty.imageUrl}
                                    alt={currentProperty.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-3xl font-bold mb-2">{currentProperty.title}</h3>
                                    <p className="text-blue-100 mb-4">{currentProperty.address}</p>
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-sm text-blue-200">Monthly Rent</p>
                                            <p className="text-2xl font-bold">₹{currentProperty.rentAmount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Status</p>
                                            <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                                                {currentProperty.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setIsPaymentModalOpen(true)}
                                        className="btn-primary flex items-center justify-center gap-2"
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        Pay Rent
                                    </button>
                                    <button
                                        onClick={() => setIsRequestModalOpen(true)}
                                        className="btn-secondary flex items-center justify-center gap-2"
                                    >
                                        <Plus className="h-5 w-5" />
                                        New Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Home className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No active rental</h3>
                                <p className="text-gray-600">You don't have an active rental property</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Maintenance Requests Section */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-gray-900">Maintenance Requests</h2>
                        <button
                            onClick={() => setIsRequestModalOpen(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            New Request
                        </button>
                    </div>

                    {requests.length === 0 ? (
                        <div className="card p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Wrench className="h-10 w-10 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests yet</h3>
                                <p className="text-gray-600 mb-6">Submit a maintenance request when you need help</p>
                                <button
                                    onClick={() => setIsRequestModalOpen(true)}
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    <Plus className="h-5 w-5" />
                                    Submit First Request
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {requests.map((request) => (
                                <div key={request.id} className="card p-6 hover:shadow-xl transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {request.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                                        </div>
                                        <div className={`p-2 rounded-lg ${request.status === 'Resolved' ? 'bg-green-100' :
                                                request.status === 'Rejected' ? 'bg-red-100' :
                                                    'bg-yellow-100'
                                            }`}>
                                            {request.status === 'Resolved' ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : request.status === 'Rejected' ? (
                                                <XCircle className="h-5 w-5 text-red-600" />
                                            ) : (
                                                <Clock className="h-5 w-5 text-yellow-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex gap-4 text-xs text-gray-500">
                                            <span>Type: {request.type}</span>
                                            <span>Priority: {request.priority}</span>
                                        </div>
                                        <span className={`badge ${request.status === 'Resolved' ? 'badge-success' :
                                                request.status === 'Rejected' ? 'badge-error' :
                                                    'badge-warning'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Payment History Section */}
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Payment History</h2>

                    {payments.length === 0 ? (
                        <div className="card p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <DollarSign className="h-10 w-10 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No payments yet</h3>
                                <p className="text-gray-600">Your payment history will appear here</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Method</th>
                                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {payments.map((payment, index) => (
                                            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {new Date(payment.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {payment.description}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="badge badge-info">
                                                        {payment.method}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-lg font-bold text-green-600">
                                                        ₹{payment.amount.toLocaleString()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <NewRequestModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                onSubmit={addRequest}
            />

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSubmit={addPayment}
                rentAmount={currentProperty?.rentAmount || 0}
            />
        </div>
    );
};

export default TenantDashboard;
