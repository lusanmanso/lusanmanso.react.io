/* app/produtos/page.tsx */ 

'use client'
import React from 'react';
import useSWR from 'swr';

import { Product } from '@/models/interface';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Municipalities() {

    const fetcher = (url: string) => fetch(url).then(res => {
        if (!res.ok) {
            throw new Error('An error occurred while fetching the data.');
        }
        return res.json();
    });
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products');
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) {

    };

    return <>
        {products.map((product) => (
            <ProductCard 
                id={product.id} 
                title={product.title}
                category={product.category}
                image={product.image}
                price={product.price}
                description={product.description}
                rating={product.rating}
            />
        ))}
    </>
}
