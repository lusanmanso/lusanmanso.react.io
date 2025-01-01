import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import TechCard from '@/components/TechCard/TechCard';

export default function Technologies() {
    return (
        <div className="w-[90%] h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] mx-auto overflow-y-scroll bg-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {tecnologias.map((tech) => (
                    <TechCard
                        key={tech.id}
                        title={tech.title}
                        image={tech.image}
                        rating={tech.rating}
                        description={tech.description}
                    />
                ))}
            </div>
        </div>
    );
}