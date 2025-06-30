import React, { useContext } from 'react';
import API from '../services/api';
import { CartContext } from '../CartContext';

function CartPage() {
    const { cart, clearCart } = useContext(CartContext);

    const checkout = async () => {
        try {
            // Step 1: Create order
            const orderRes = await API.post('/orders/', { complete: false });
            const orderId = orderRes.data.id;

            // Step 2: Add items
            await Promise.all(
                cart.map(item =>
                    API.post('/order-items/', {
                        order: orderId,
                        book_id: item.book.id,
                        quantity: item.quantity
                    })
                )
            );

            // Step 3: Mark order complete
            await API.patch(`/orders/${orderId}/`, { complete: true });

            alert('✅ Order placed!');
            clearCart();
        } catch (err) {
            console.error(err);
            alert('❌ Failed to place order');
        }
    };

    return (
        <div>
            <h2>🛒 My Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item, i) => (
                            <li key={i}>
                                {item.quantity} × {item.book.title} - {item.book.price} Ks
                            </li>
                        ))}
                    </ul>
                    <button onClick={checkout}>✅ Checkout</button>
                </>
            )}
        </div>
    );
}

export default CartPage;
