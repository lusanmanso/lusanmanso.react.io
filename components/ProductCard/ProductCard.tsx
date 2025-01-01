import React from 'react';
import Image from 'next/image';
import { Product } from '@/models/interfaces/product';

interface ProductCardProps {
  // product: Product;
  title: string;
  price: number;
  description: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, price, description, category, image, rating } = product;

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white flex flex-col items-center space-y-4">
      {/* Imagen del producto */}
      <Image 
        src={image} 
        alt={title} 
        width={200} 
        height={200} 
        className="rounded-md object-cover"
      />
      
      {/* Product title */}
      <h2 className="text-lg font-bold">{title}</h2>

      {/* Category */}
      <p className="text-sm text-gray-500">{category}</p>

      {/* Price */}
      <p className="text-xl font-semibold text-green-600">${price.toFixed(2)}</p>

      {/* Description */}
      <p className="text-sm text-gray-600">{description}</p>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        <p className="text-yellow-500">⭐ {rating.rate}</p>
        <p className="text-gray-500">({rating.count} reviews)</p>
      </div>
    </div>
  );
}