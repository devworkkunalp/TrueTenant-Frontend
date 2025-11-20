import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [requests, setRequests] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Fetch Properties
            let propertiesRes;
            if (user.role === 'owner') {
                propertiesRes = await api.get('/properties/owner');
            } else {
                propertiesRes = await api.get('/properties');
            }
            setProperties(propertiesRes.data);

            // Fetch Requests
            const requestsRes = await api.get('/requests');
            setRequests(requestsRes.data);

            // Fetch Payments
            const paymentsRes = await api.get('/payments');
            setPayments(paymentsRes.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addProperty = async (newProperty) => {
        try {
            const response = await api.post('/properties', newProperty);
            setProperties([...properties, response.data]);
            return { success: true };
        } catch (error) {
            console.error("Error adding property:", error);
            return { success: false, message: error.message };
        }
    };

    const addRequest = async (newRequest) => {
        try {
            const response = await api.post('/requests', newRequest);
            setRequests([...requests, response.data]);
            return { success: true };
        } catch (error) {
            console.error("Error adding request:", error);
            return { success: false, message: error.message };
        }
    };

    const updateRequestStatus = async (id, status) => {
        try {
            await api.put(`/requests/${id}`, status); // Send string directly as body based on controller
            setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
        } catch (error) {
            console.error("Error updating request:", error);
        }
    };

    const addPayment = async (newPayment) => {
        try {
            const response = await api.post('/payments', newPayment);
            setPayments([...payments, response.data]);
            return { success: true };
        } catch (error) {
            console.error("Error adding payment:", error);
            return { success: false, message: error.message };
        }
    };

    return (
        <DataContext.Provider value={{
            properties,
            requests,
            payments,
            addProperty,
            addRequest,
            updateRequestStatus,
            addPayment,
            loading,
            refreshData: fetchData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
