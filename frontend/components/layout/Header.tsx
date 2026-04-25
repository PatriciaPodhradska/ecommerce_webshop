'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Truck, Shield, Clock } from 'lucide-react';

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto px-4 py-16 md:py-24 relative">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                            Welcome to E-Shop
                        </h1>
                        <p className="text-lg md:text-xl mb-8 opacity-90">
                            Discover amazing products at unbeatable prices. 
                            Shop the latest trends and enjoy free shipping on all orders!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/products">
                                <Button 
                                    size="lg" 
                                    className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    Shop Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/products?featured=true">
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
                                >
                                    View Featured
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className={`bg-gray-50 border-b transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1: Free Shipping */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="rounded-full bg-blue-100 p-3">
                                    <Truck className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                                <p className="text-sm text-gray-600">On orders over $50</p>
                            </div>
                        </div>

                        {/* Feature 2: Secure Payment */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="rounded-full bg-green-100 p-3">
                                    <Shield className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                                <p className="text-sm text-gray-600">100% secure transactions</p>
                            </div>
                        </div>

                        {/* Feature 3: 24/7 Support */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="rounded-full bg-purple-100 p-3">
                                    <Clock className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                                <p className="text-sm text-gray-600">Dedicated customer service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}