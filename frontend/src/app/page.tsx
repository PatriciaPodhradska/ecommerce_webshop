import axiosClient from '../../lib/axios';

async function getProducts() {
    try {
        const response = await axiosClient.get('/products/products/');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function Home() {
    const products = await getProducts();

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600 mt-2">${product.price}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}