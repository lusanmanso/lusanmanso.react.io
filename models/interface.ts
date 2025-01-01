export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }

  export interface Technology{
    id: number;
    title: string;
    description: string;
    image: string;
    rating: number;
  }