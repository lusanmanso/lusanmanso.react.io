/* /components/ProductCard/ProductCard.tsx */

import React from 'react'
import { Product } from '@/models/interface'

export default function ProductCard
({title, image, price, description}: Product) {
   return <div>{title} {image} {price} {description}</div>
}