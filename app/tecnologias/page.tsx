import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import Card from '@/components/Card/Card';

export default function Page() {
    return (
        <div style={{ padding: '16px' }}>
            <h1>Tecnologías Aprendidas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tecnologias.map((tecnologia, index) => (
                    <Card
                        key={index}
                        title={tecnologia.name}
                        subtitle={tecnologia.category}
                        image={tecnologia.image}
                        description={tecnologia.description}
                        extraInfo={tecnologia.usage}
                    />
                ))}
            </div>
        </div>
    );
}