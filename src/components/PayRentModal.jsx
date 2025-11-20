import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';

const PayRentModal = ({ isOpen, onClose, onPay, amount, propertyTitle }) => {
    const [method, setMethod] = useState('Credit Card');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            onPay({
                amount,
                method
            });
            setIsProcessing(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <CreditCard className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Pay Rent for {propertyTitle}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    You are about to pay <span className="font-bold text-gray-900">${amount}</span>.
                                </p>

                                <div className="mt-4">
                                    <label htmlFor="method" className="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select
                                        id="method"
                                        name="method"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                        value={method}
                                        onChange={(e) => setMethod(e.target.value)}
                                    >
                                        <option>Credit Card</option>
                                        <option>Bank Transfer</option>
                                        <option>PayPal</option>
                                    </select>
                                </div>

                                <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                                    <p className="text-xs text-gray-500">
                                        This is a secure mock payment. No actual money will be deducted.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                            onClick={handlePay}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : `Pay $${amount}`}
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={onClose}
                            disabled={isProcessing}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayRentModal;
