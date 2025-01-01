'use client';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Product } from '@/models/interface';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Products() {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);
    
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (products) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [search, products]);

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
            {/* Renderizado de productos filtrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        category={product.category}
                        image={product.image}
                        price={product.price}
                        description={product.description}
                    />
                ))}
            </div>
        </div>
    );
}