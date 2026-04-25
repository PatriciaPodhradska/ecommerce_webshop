import { Header } from '@/components/layout/Header';
import { FeaturedProducts } from '@/components/products/FeaturedProducts';

export default function Home() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-12">
                <section>
                    <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
                    <FeaturedProducts />
                </section>
            </div>
        </>
    );
}