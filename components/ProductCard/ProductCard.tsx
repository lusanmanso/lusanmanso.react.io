/* /components/Card/Card.tsx */
import React from 'react';

interface ProductCardProps {
    title: string;
    category: string;
    image: string;
    price: number;
    description?: string;
}

import { useState } from 'react';

const ProductCard: React.FC<ProductCardProps> = ({ title, category, image, price, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
            <div className="w-full h-32 flex items-center justify-center mt-4">
                <img
                    src={image}
                    alt={title}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="text-lg font-semibold text-green-600">${price.toFixed(2)}</p>
               {/* Description */}
               <p
                  className={`text-sm text-gray-600 mt-2 text-justify transition-all duration-300 ease-in-out ${
                  isExpanded ? '' : 'line-clamp-3'
                  }`}
               >  
                  {description}
                </p>

               {/*Button to close/expand the description */}
               <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-500 hover:underline mt-2 text-xs"
               >
                  {isExpanded ? 'Read less' : 'Read more'}
               </button>
            </div>
            <div className="px-4 pb-4">
                <button className="w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-md hover:bg-blue-700 transition">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;