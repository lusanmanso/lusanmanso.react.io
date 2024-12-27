'use client'
import React from 'react';
import useSWR from 'swr';
import { Product } from '@/models/interfaces/product';
import  ProductCard from '@/components/ProductCard/ProductCard';

export default function page() {

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products');
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!products) return <div>No data available</div>;

  return <>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        description={product.description}
        />
    ))}
  </>
}