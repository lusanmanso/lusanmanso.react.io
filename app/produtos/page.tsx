'use client'
import React from 'react';
import useSWR from 'swr';

import { Product } from '@/models/interface';
import Card from '@/components/Card/Card';

export default function Products() {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) return <div>No products available</div>;

    return (
        <div className="w-[90%] h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] mx-auto overflow-y-scroll bg-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {products.map((product) => (
                <Card
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
