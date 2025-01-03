'use client';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Product } from '@/models/interface';
import ProductCard from '@/components/ProductCard/ProductCard';

// Extended type to include quantity
interface CartProduct extends Product {
    quantity: number;
}

export default function Products() {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);

    // Main states
    const [cart, setCart] = useState<CartProduct[]>([]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [message, setMessage] = useState('');
    const [buying, setBuying] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Filter products based on search input
    useEffect(() => {
        if (products) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [search, products]);

    // Add product to cart
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setMessage(`${product.title} was added to the cart`);
        setTimeout(() => setMessage(''), 3000);
    };

    // Remove product from cart
    const removeFromCart = (index: number) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Calculate cart total
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    // Handle purchase
    const handleBuy = async () => {
        setBuying(true);
        try {
            const response = await fetch('/api/deisishop/buy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart }),
            });

            if (!response.ok) {
                throw new Error('Error processing the purchase.');
            }

            const result = await response.json();
            setMessage(`Purchase successful. Order ID: ${result.order_id}`);
            setCart([]); // Clear the cart after purchase
        } catch (error) {
            setMessage((error as Error).message || 'There was a problem with the purchase.');
        } finally {
            setBuying(false);
        }
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) return <div>No products available</div>;

    return (
        <div className="w-[90%] h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] mx-auto overflow-y-scroll bg-transparent">
            {/* Confirmation message */}
            {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Filtered products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        category={product.category}
                        image={product.image}
                        price={product.price}
                        description={product.description}
                        onAddToCart={() => addToCart(product)}
                    />
                ))}
            </div>

            {/* Show cart */}
            <div className="mt-6 p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-bold mb-2">Cart</h2>
                {cart.length > 0 ? (
                    <>
                        {cart.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b p-2">
                                <span>{item.title}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="text-right font-bold mt-4">Total: ${total.toFixed(2)}</div>
                        <button
                            onClick={handleBuy}
                            disabled={buying}
                            className={`w-full mt-4 p-2 ${
                                buying ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'
                            } text-white font-bold rounded`}
                        >
                            {buying ? 'Processing...' : 'Buy'}
                        </button>
                    </>
                ) : (
                    <p>The cart is empty.</p>
                )}
            </div>
        </div>
    );
}
