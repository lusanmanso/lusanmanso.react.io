import React from 'react';
import Image from 'next/image';

interface TechCardProps {
    title: string;
    image: string;
    description?: string;
    rating: number;
}

const TechCard: React.FC<TechCardProps> = ({ title, image, description, rating }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
            <div className="w-full h-32 flex items-center justify-center mt-4">
                <Image
                    src={image}
                    alt={title}
                    width={150}
                    height={150}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                <p className="text-lg font-semibold text-red-600">{rating.toFixed(2)} ★</p>
                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-600 mt-2 text-justify transition-all duration-300 ease-in-out">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TechCard;