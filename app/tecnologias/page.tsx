'use client'

import React from 'react';
import { Technology } from '@/models/interface';
import TechCard from '@/components/TechCard/TechCard';
import tecnologias from '@/app/data/tecnologias.json';

export default function Technologies() {
    // Use the imported JSON data directly
    const technologies: Technology[] = tecnologias;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {technologies.map((technology) => (
                <TechCard
                    key={technology.id}
                    title={technology.title}
                    image={technology.image}
                    description={technology.description}
                    rating={technology.rating}
                />
            ))}
        </div>
    );
}
