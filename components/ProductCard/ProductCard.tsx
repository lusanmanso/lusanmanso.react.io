/* /components/ProductCard/ProductCard.tsx */}
import React from 'react';

interface ProductCardProps {
    title: string;
    category: string;
    image: string;
    price: number;
    description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, image, price, description }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="text-lg font-semibold text-green-600">${price}</p>
                {description && (
                    <p className="text-sm text-gray-600 mt-2">
                        {description}
                    </p>
                )}
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