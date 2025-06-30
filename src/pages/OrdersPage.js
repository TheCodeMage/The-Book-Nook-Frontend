import React, { useEffect, useState } from 'react';
import API from '../services/api';

function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        API.get('/orders/')
            .then(res => setOrders(res.data))
            .catch(err => console.error('Error fetching orders:', err));
    }, []);

    return (
        <div>
            <h2>🧾 My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
                        <h4>Order #{order.id}</h4>
                        <p><strong>Status:</strong> {order.complete ? '✅ Complete' : '🕓 In Progress'}</p>
                        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.id}>
                                    {item.quantity} × {item.book.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default OrdersPage;
