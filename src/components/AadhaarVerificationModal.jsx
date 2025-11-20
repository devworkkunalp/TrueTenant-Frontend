import React, { useState } from 'react';
import { X, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';

const AadhaarVerificationModal = ({ isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState(1); // 1: Enter Aadhaar, 2: Enter OTP, 3: Success/Error
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [clientId, setClientId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [verifiedDetails, setVerifiedDetails] = useState(null);
    const [mockOTP, setMockOTP] = useState('');

    if (!isOpen) return null;

    const handleGenerateOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/kyc/aadhaar/generate-otp', { aadhaarNumber });
            setClientId(response.data.clientId);
            setMockOTP(response.data.mockOTP || ''); // For development
            setStep(2);
        } catch (err) {
            setError(err.response?.data || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/kyc/aadhaar/verify-otp', { clientId, otp });
            setVerifiedDetails(response.data.verifiedDetails);
            setStep(3);
            setTimeout(() => {
                onSuccess && onSuccess();
                handleClose();
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setAadhaarNumber('');
        setOtp('');
        setClientId('');
        setError('');
        setVerifiedDetails(null);
        setMockOTP('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Header */}
                    <div className="bg-primary px-4 py-3 sm:px-6 flex justify-between items-center">
                        <div className="flex items-center">
                            <Shield className="h-6 w-6 text-white mr-2" />
                            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                                Aadhaar Verification
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="bg-transparent rounded-md text-white hover:text-gray-200 focus:outline-none"
                            onClick={handleClose}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {/* Step 1: Enter Aadhaar Number */}
                        {step === 1 && (
                            <form onSubmit={handleGenerateOTP}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-2">
                                            Enter your 12-digit Aadhaar Number
                                        </label>
                                        <input
                                            id="aadhaar"
                                            type="text"
                                            maxLength="12"
                                            pattern="[0-9]{12}"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="XXXX XXXX XXXX"
                                            value={aadhaarNumber}
                                            onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            OTP will be sent to your Aadhaar-registered mobile number
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border-l-4 border-red-500 p-3 flex items-start">
                                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading || aadhaarNumber.length !== 12}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Sending OTP...' : 'Send OTP'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 2: Enter OTP */}
                        {step === 2 && (
                            <form onSubmit={handleVerifyOTP}>
                                <div className="space-y-4">
                                    <div className="bg-green-50 border-l-4 border-green-500 p-3">
                                        <p className="text-sm text-green-700">
                                            OTP sent to your registered mobile number ending with ****
                                        </p>
                                    </div>

                                    {mockOTP && (
                                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                                            <p className="text-sm text-yellow-700">
                                                <strong>Development Mode:</strong> Use OTP: <span className="font-mono font-bold">{mockOTP}</span>
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                                            Enter 6-digit OTP
                                        </label>
                                        <input
                                            id="otp"
                                            type="text"
                                            maxLength="6"
                                            pattern="[0-9]{6}"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                                            placeholder="------"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            autoFocus
                                        />
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border-l-4 border-red-500 p-3 flex items-start">
                                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading || otp.length !== 6}
                                            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Verifying...' : 'Verify OTP'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {/* Step 3: Success */}
                        {step === 3 && verifiedDetails && (
                            <div className="space-y-4">
                                <div className="flex flex-col items-center text-center">
                                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        Aadhaar Verified Successfully!
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Your identity has been verified
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium text-gray-900">{verifiedDetails.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Date of Birth:</span>
                                        <span className="font-medium text-gray-900">{verifiedDetails.dob}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Gender:</span>
                                        <span className="font-medium text-gray-900">{verifiedDetails.gender === 'M' ? 'Male' : 'Female'}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-center text-gray-500">
                                    This window will close automatically...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AadhaarVerificationModal;
