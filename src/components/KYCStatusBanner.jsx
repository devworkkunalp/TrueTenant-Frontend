import React, { useState } from 'react';
import { Shield, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import AadhaarVerificationModal from './AadhaarVerificationModal';
import { useAuth } from '../context/AuthContext';

const KYCStatusBanner = () => {
    const { user } = useAuth();
    const [showAadhaarModal, setShowAadhaarModal] = useState(false);

    if (!user) return null;

    const getStatusConfig = () => {
        if (user.aadhaarVerified) {
            return {
                icon: CheckCircle,
                bgColor: 'bg-green-50',
                borderColor: 'border-green-500',
                textColor: 'text-green-800',
                iconColor: 'text-green-500',
                title: 'KYC Verified',
                message: 'Your identity has been verified successfully',
                showButton: false
            };
        } else if (user.kycStatus === 'Pending') {
            return {
                icon: Clock,
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-500',
                textColor: 'text-yellow-800',
                iconColor: 'text-yellow-500',
                title: 'KYC Pending',
                message: 'Your verification is in progress',
                showButton: false
            };
        } else if (user.kycStatus === 'Rejected') {
            return {
                icon: XCircle,
                bgColor: 'bg-red-50',
                borderColor: 'border-red-500',
                textColor: 'text-red-800',
                iconColor: 'text-red-500',
                title: 'KYC Rejected',
                message: 'Please resubmit your documents',
                showButton: true,
                buttonText: 'Resubmit KYC'
            };
        } else {
            return {
                icon: AlertTriangle,
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-500',
                textColor: 'text-orange-800',
                iconColor: 'text-orange-500',
                title: 'KYC Required',
                message: 'Complete your KYC verification to access all features',
                showButton: true,
                buttonText: 'Verify Now'
            };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    const handleSuccess = () => {
        // Refresh user data
        window.location.reload();
    };

    return (
        <>
            <div className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 mb-6 rounded-r-md`}>
                <div className="flex items-start">
                    <Icon className={`h-6 w-6 ${config.iconColor} mr-3 flex-shrink-0`} />
                    <div className="flex-1">
                        <h3 className={`text-sm font-semibold ${config.textColor} mb-1`}>
                            {config.title}
                        </h3>
                        <p className={`text-sm ${config.textColor}`}>
                            {config.message}
                        </p>
                    </div>
                    {config.showButton && (
                        <button
                            onClick={() => setShowAadhaarModal(true)}
                            className={`ml-4 px-4 py-2 bg-white border ${config.borderColor} ${config.textColor} rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors`}
                        >
                            {config.buttonText}
                        </button>
                    )}
                </div>
            </div>

            <AadhaarVerificationModal
                isOpen={showAadhaarModal}
                onClose={() => setShowAadhaarModal(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
};

export default KYCStatusBanner;
