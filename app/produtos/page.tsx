'use client';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Product } from '@/models/interface';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Products() {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);

    // Estados principales
    const [cart, setCart] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [message, setMessage] = useState('');

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

    // Añadir producto al carrito
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setMessage(`${product.title} fue añadido al carrito`);
        setTimeout(() => setMessage(''), 3000);
    };

    // Eliminar producto del carrito
    const removeFromCart = (index: number) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Calcular el total del carrito
    const total = cart.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) return <div>No products available</div>;

    return (
        <div className="w-[90%] h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] mx-auto overflow-y-scroll bg-transparent">
            {/* Mensaje de confirmación */}
            {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}

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
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        category={product.category}
                        image={product.image}
                        price={product.price}
                        description={product.description}
                        onAddToCart={() => addToCart(product)} // Usar el botón de ProductCard
                    />
                ))}
            </div>

            {/* Mostrar carrito */}
            <div className="mt-6 p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-bold mb-2">Carrito</h2>
                {cart.length > 0 ? (
                    <>
                        {cart.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b p-2">
                                <span>{item.title}</span>
                                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-red-500"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <div className="text-right font-bold mt-4">Total: ${total.toFixed(2)}</div>
                    </>
                ) : (
                    <p>El carrito está vacío.</p>
                )}
            </div>
        </div>
    );
}