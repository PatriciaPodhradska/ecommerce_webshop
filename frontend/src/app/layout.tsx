import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'E-Shop - Your Online Store',
    description: 'Best products at best prices',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <CartProvider>
                        <Navbar />
                        <main className="min-h-screen bg-background">
                            {children}
                        </main>
                        <Toaster position="bottom-right" />
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}