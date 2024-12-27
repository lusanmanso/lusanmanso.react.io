import React from 'react';
import { Product } from '@/models/interfaces/product'

export default function ProductCard ({id, title, price, description, image}: Product ) {
    return <div>{title} ({price}) ({description}) ({image})</div>
}