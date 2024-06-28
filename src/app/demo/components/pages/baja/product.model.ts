// src/app/demo/models/product.model.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    estado: string; // Asegúrate de que 'estado' esté definido si lo necesitas en tu aplicación
    // Agrega otras propiedades según sea necesario
}
