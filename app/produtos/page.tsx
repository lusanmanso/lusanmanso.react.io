'use client'
import React from 'react';
import useSWR from 'swr';

import { Product } from '@/models/interface';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Municipalities() {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!products) return <div>No products available</div>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {products.map((product) => (
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
  );
}
