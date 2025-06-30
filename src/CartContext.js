import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // {book, quantity}

    const addToCart = (book) => {
        setCart(prev => {
            const exists = prev.find(item => item.book.id === book.id);
            if (exists) {
                return prev.map(item =>
                    item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { book, quantity: 1 }];
            }
        });
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
