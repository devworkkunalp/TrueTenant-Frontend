export const USERS = [
    {
        id: 'u1',
        name: 'John Owner',
        email: 'owner@example.com',
        password: 'password',
        role: 'owner',
        avatar: 'https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff'
    },
    {
        id: 'u2',
        name: 'Alice Tenant',
        email: 'tenant@example.com',
        password: 'password',
        role: 'tenant',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Tenant&background=random'
    },
    {
        id: 'u3',
        name: 'Bob Tenant',
        email: 'bob@example.com',
        password: 'password',
        role: 'tenant',
        avatar: 'https://ui-avatars.com/api/?name=Bob+Tenant&background=random'
    }
];

export const PROPERTIES = [
    {
        id: 'p1',
        ownerId: 'u1',
        title: 'Sunset Apartments',
        address: '123 Sunset Blvd, California',
        rentAmount: 2500,
        status: 'Occupied',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        tenants: ['u2']
    },
    {
        id: 'p2',
        ownerId: 'u1',
        title: 'Downtown Loft',
        address: '456 Main St, New York',
        rentAmount: 3200,
        status: 'Vacant',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        tenants: []
    },
    {
        id: 'p3',
        ownerId: 'u1',
        title: 'Suburban Home',
        address: '789 Oak Ln, Texas',
        rentAmount: 1800,
        status: 'Occupied',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        tenants: ['u3']
    }
];

export const REQUESTS = [
    {
        id: 'r1',
        propertyId: 'p1',
        tenantId: 'u2',
        type: 'Maintenance',
        title: 'Leaking Faucet',
        description: 'The kitchen faucet is leaking continuously.',
        status: 'Pending',
        date: '2023-10-25',
        priority: 'Medium'
    },
    {
        id: 'r2',
        propertyId: 'p3',
        tenantId: 'u3',
        type: 'Complaint',
        title: 'Noisy Neighbors',
        description: 'Neighbors are playing loud music late at night.',
        status: 'Resolved',
        date: '2023-10-20',
        priority: 'Low'
    }
];

export const PAYMENTS = [
    {
        id: 'pay1',
        tenantId: 'u2',
        propertyId: 'p1',
        amount: 2500,
        date: '2023-10-01',
        status: 'Paid',
        method: 'Credit Card'
    },
    {
        id: 'pay2',
        tenantId: 'u3',
        propertyId: 'p3',
        amount: 1800,
        date: '2023-10-01',
        status: 'Paid',
        method: 'Bank Transfer'
    },
    {
        id: 'pay3',
        tenantId: 'u2',
        propertyId: 'p1',
        amount: 2500,
        date: '2023-09-01',
        status: 'Paid',
        method: 'Credit Card'
    }
];
