'use client';

import { useState, useEffect } from 'react';
import { ProductGrid } from './ProductGrid';
import { Product } from '@/types';
import axiosClient from '@/lib/axios';

export function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosClient.get('/products/products/?is_featured=true');
                setProducts(response.data.results || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return <ProductGrid products={products} loading={loading} />;
}