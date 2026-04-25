'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, User, Package, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const { cart } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-primary">
                        E-Shop
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Link href="/products">
                            <Button variant="ghost">Products</Button>
                        </Link>
                        
                        {/* Cart Button */}
                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {cart.total_items > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                                        {cart.total_items}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                        
                        {/* User Menu - Desktop (without asChild) */}
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href="/account" className="flex w-full items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            My Account
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/orders" className="flex w-full items-center">
                                            <Package className="mr-2 h-4 w-4" />
                                            My Orders
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/account/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                        )}
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
                
                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t py-4 space-y-2">
                        <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">Products</Button>
                        </Link>
                        <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">
                                Cart ({cart.total_items})
                            </Button>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">My Account</Button>
                                </Link>
                                <Link href="/orders" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">My Orders</Button>
                                </Link>
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-start text-red-600"
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link href="/account/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start">Login</Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}