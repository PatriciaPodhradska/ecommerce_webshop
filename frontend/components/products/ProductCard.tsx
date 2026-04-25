'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <Card className="group overflow-hidden">
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square bg-muted">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No image
                        </div>
                    )}
                    {product.is_featured && (
                        <Badge className="absolute top-2 right-2">Featured</Badge>
                    )}
                </div>
            </Link>
            
            <CardHeader className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
            </CardHeader>
            
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                </p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                    ${product.price}
                </span>
                <Button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.in_stock}
                    size="sm"
                >
                    {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </CardFooter>
        </Card>
    );
}