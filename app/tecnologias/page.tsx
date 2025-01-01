'use client'
import React from 'react';

// Importa el JSON
import'@/data/tecnologias.json';

import { Technology } from '@/models/interface';
import TechCard from '@/components/TechCard/TechCard';

export default function Technologies() {
    // Usa los datos directamente desde el JSON
    const products: Technology[] = technologies;

    return (
        <div className="w-[90%] h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] mx-auto overflow-y-scroll bg-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {products.map((product) => (
                <TechCard
                    key={product.id}
                    title={product.title}
                    image={product.image}
                    rating={product.rating}
                    description={product.description}
                />
            ))}
            </div>
        </div>
    );
}
