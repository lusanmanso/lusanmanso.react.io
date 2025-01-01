'use client';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Product } from '@/models/interface';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Products() {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);

    const [cart, setCart] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    // Cargar el carrito desde localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Guardar el carrito en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Filtrar productos según la búsqueda
    useEffect(() => {
        if (products) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [search, products]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) return <div>No products available</div>;

    return (
        <div className="w-[90%] h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] mx-auto overflow-y-scroll bg-transparent">
            {/* Input de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            {/* Productos filtrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="border p-4 rounded shadow">
                        <ProductCard
                            title={product.title}
                            category={product.category}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                        />
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
                        >
                            Añadir al Carrito
                        </button>
                    </div>
                ))}
            </div>
            {/* Mostrar carrito */}
            <div className="mt-6 p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-bold mb-2">Carrito</h2>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b p-2">
                            <span>{item.title}</span>
                            <span>${item.price.toFixed(2)}</span>
                        </div>
                    ))
                ) : (
                    <p>El carrito está vacío.</p>
                )}
            </div>
        </div>
    );
}