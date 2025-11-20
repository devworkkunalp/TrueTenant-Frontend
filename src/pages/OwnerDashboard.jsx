import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Home, Users, DollarSign, AlertCircle, Plus, Check, X, Eye, MapPin, Calendar } from 'lucide-react';
import AddPropertyModal from '../components/AddPropertyModal';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import KYCStatusBanner from '../components/KYCStatusBanner';

const OwnerDashboard = () => {
    const { properties, requests, payments, addProperty, updateRequestStatus } = useData();
    const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [activeTab, setActiveTab] = useState('properties');

    const totalProperties = properties.length;
    const totalTenants = properties.reduce((acc, p) => acc + (p.tenant ? 1 : 0), 0);
    const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
    const pendingRequests = requests.filter(r => r.status === 'Pending').length;

    const handleViewDetails = (property) => {
        setSelectedProperty(property);
    };

    const closeDetailsModal = () => {
        setSelectedProperty(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* KYC Status Banner */}
                <KYCStatusBanner />

                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                                Owner Dashboard
                            </h1>
                            <p className="text-gray-600">Manage your properties and tenants</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setActiveTab('requests')}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${activeTab === 'requests'
                                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                                    }`}
                            >
                                Requests {pendingRequests > 0 && (
                                    <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                        {pendingRequests}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('properties')}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${activeTab === 'properties'
                                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                                    }`}
                            >
                                Properties
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">{totalProperties}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Total Properties</p>
                    </div>

                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">{totalTenants}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Active Tenants</p>
                    </div>

                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Total Revenue</p>
                    </div>

                    <div className="stat-card group hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <AlertCircle className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">{pendingRequests}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Pending Requests</p>
                    </div>
                </div>

                {/* Content Area */}
                {activeTab === 'properties' ? (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-display font-bold text-gray-900">Your Properties</h2>
                            <button
                                onClick={() => setIsAddPropertyOpen(true)}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Plus className="h-5 w-5" />
                                Add Property
                            </button>
                        </div>

                        {properties.length === 0 ? (
                            <div className="card p-12 text-center">
                                <div className="max-w-md mx-auto">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Home className="h-10 w-10 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties yet</h3>
                                    <p className="text-gray-600 mb-6">Get started by adding your first property</p>
                                    <button
                                        onClick={() => setIsAddPropertyOpen(true)}
                                        className="btn-primary inline-flex items-center gap-2"
                                    >
                                        <Plus className="h-5 w-5" />
                                        Add Your First Property
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.map((property) => (
                                    <div key={property.id} className="card-hover group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={property.imageUrl}
                                                alt={property.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${property.status === 'Occupied'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-yellow-500 text-white'
                                                } shadow-lg`}>
                                                {property.status}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                                                {property.title}
                                            </h3>
                                            <div className="flex items-start gap-2 text-gray-600 mb-4">
                                                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                                                <p className="text-sm line-clamp-2">{property.address}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div>
                                                    <p className="text-sm text-gray-500">Rent</p>
                                                    <p className="text-2xl font-bold text-primary-600">
                                                        ₹{property.rentAmount.toLocaleString()}
                                                        <span className="text-sm text-gray-500 font-normal">/mo</span>
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleViewDetails(property)}
                                                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Maintenance Requests</h2>

                        {requests.length === 0 ? (
                            <div className="card p-12 text-center">
                                <div className="max-w-md mx-auto">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="h-10 w-10 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
                                    <p className="text-gray-600">No maintenance requests at the moment</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requests.map((request) => (
                                    <div key={request.id} className="card p-6 hover:shadow-xl transition-shadow">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {request.title}
                                                    </h3>
                                                    <span className={`badge ${request.status === 'Resolved' ? 'badge-success' :
                                                            request.status === 'Rejected' ? 'badge-error' :
                                                                'badge-warning'
                                                        }`}>
                                                        {request.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-3">{request.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <AlertCircle className="h-4 w-4" />
                                                        Type: {request.type}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        Priority: {request.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            {request.status === 'Pending' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateRequestStatus(request.id, 'Resolved')}
                                                        className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
                                                        title="Mark as Resolved"
                                                    >
                                                        <Check className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateRequestStatus(request.id, 'Rejected')}
                                                        className="p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                                                        title="Reject Request"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <AddPropertyModal
                isOpen={isAddPropertyOpen}
                onClose={() => setIsAddPropertyOpen(false)}
                onAdd={addProperty}
            />

            <PropertyDetailsModal
                isOpen={!!selectedProperty}
                onClose={closeDetailsModal}
                property={selectedProperty}
            />
        </div>
    );
};

export default OwnerDashboard;
