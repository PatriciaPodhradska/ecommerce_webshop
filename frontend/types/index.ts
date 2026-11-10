export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone?: string;
    avatar?: string;
    is_verified: boolean;
    date_joined: string;
    is_staff?: boolean; 
    is_superuser?: boolean;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent?: number;
    children?: Category[];
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    compare_price?: string;
    category: number;
    category_name: string;
    stock: number;
    in_stock: boolean;
    sku: string;
    image?: string;
    images: ProductImage[];
    is_featured: boolean;
    created_at: string;
}

export interface ProductImage {
    id: number;
    image: string;
    is_primary: boolean;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    subtotal: string;
    created_at: string;
}

export interface Cart {
    id: number;
    items: CartItem[];
    total_items: number;
    subtotal: string;
    created_at: string;
    updated_at: string;
}

export interface Address {
    id: number;
    address_type: 'shipping' | 'billing';
    full_name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    is_default: boolean;
}

export interface Order {
    id: number;
    order_number: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
    subtotal: string;
    shipping_cost: string;
    tax: string;
    total: string;
    shipping_address: Address;
    notes: string;
    created_at: string;
}

export interface ApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}