export interface Product {
    id: number; // El ID del producto es un número
    title: string; // El título del producto es un string
    price: number; // El precio del producto es un número
    description: string; // La descripción del producto es un string
    category: string; // La categoría del producto es un string
    image: string; // La URL de la imagen del producto es un string
    rating: {
      rate: number; // La calificación del producto es un número
      count: number; // La cantidad de calificaciones es un número
    };
  }