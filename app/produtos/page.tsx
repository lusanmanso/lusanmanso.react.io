'use client';
import React from 'react';
import useSWR from 'swr';
import { Product } from '@/models/interfaces/product';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Page() {
  const fetcher = (url: string) => fetch('https://api.deisi.shop/products').then(res => res.json());
  const { data: products, error } = useSWR<Product[], Error>('/api/products', fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
}