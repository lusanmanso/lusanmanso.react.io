export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number; // int
    title: string;
    price: number; // float
    description: string;
    category: string;
    image: string; // URL
    rating: Rating; // nested object
}