import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';

export default function page() {

  // Change from JSON to string
  const technologiesString = JSON.stringify(tecnologias, null, 2);

  return (
    <div style={{ padding: '16px' }}>
      <h1>Tecnologías Aprendidas</h1>
      {/* Renderizado en formato legible */}
      <pre style={{ backgroundColor: '#f4f4f4', padding: '16px', borderRadius: '8px' }}> {technologiesString}
      </pre>
    </div>
  );
}