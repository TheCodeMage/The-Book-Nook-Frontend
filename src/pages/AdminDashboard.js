import React, { useEffect, useState } from 'react';
import API from '../services/api';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalSales = orders.reduce((acc, order) => {
    const total = order.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
    return acc + total;
  }, 0);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Admin Dashboard</h2>
      <p><strong>Total Orders:</strong> {orders.length}</p>
      <p><strong>Total Sales:</strong> {totalSales.toLocaleString()} Ks</p>
      <h3>Recent Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id} by User {order.user} — {order.items.length} items
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
