'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { User, Mail, Phone, Calendar, Package, ShoppingBag } from 'lucide-react';

export default function AccountPage() {
    const { user, logout, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="text-center py-12">
                <p>Please log in to view your account.</p>
                <Link href="/account/login" className="text-blue-600 underline">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Account</h1>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        Profile Information
                    </h2>
                    <div className="space-y-3">
                        <p><strong>Username:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Full name:</strong> {user?.first_name} {user?.last_name}</p>
                        {user?.phone && <p><strong>Phone:</strong> {user?.phone}</p>}
                        <p><strong>Member since:</strong> {user?.date_joined ? new Date(user?.date_joined).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/orders" className="block">
                        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
                            <Package className="h-8 w-8 text-blue-600 mb-3" />
                            <h3 className="text-lg font-semibold mb-2">My Orders</h3>
                            <p className="text-gray-600">View your order history and tracking</p>
                        </div>
                    </Link>
                    <Link href="/account/addresses" className="block">
                        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
                            <ShoppingBag className="h-8 w-8 text-blue-600 mb-3" />
                            <h3 className="text-lg font-semibold mb-2">Addresses</h3>
                            <p className="text-gray-600">Manage your shipping addresses</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}