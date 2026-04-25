'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axiosClient from '@/lib/axios';
import { toast } from 'sonner';
import { Cart, CartItem } from '@/types';

interface CartContextType {
    cart: Cart;
    loading: boolean;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>({ 
        items: [], 
        total_items: 0, 
        subtotal: '0',
        id: 0,
        created_at: '',
        updated_at: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setCart({ 
                    items: [], 
                    total_items: 0, 
                    subtotal: '0',
                    id: 0,
                    created_at: '',
                    updated_at: ''
                });
                setLoading(false);
                return;
            }
            
            const response = await axiosClient.get<Cart>('/cart/');
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId: number, quantity: number = 1) => {
        try {
            await axiosClient.post('/cart/add/', {
                product_id: productId,
                quantity: quantity
            });
            await fetchCart();
            toast.success('Product added to cart!');
        } catch (error) {
            toast.error('Failed to add product to cart');
            throw error;
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        try {
            await axiosClient.put(`/cart/update/${itemId}/`, { quantity });
            await fetchCart();
        } catch (error) {
            toast.error('Failed to update cart');
            throw error;
        }
    };

    const removeItem = async (itemId: number) => {
        try {
            await axiosClient.delete(`/cart/remove/${itemId}/`);
            await fetchCart();
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
            throw error;
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            updateQuantity,
            removeItem,
            refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}