import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class ProductService {

    private products: Product[] = [];

    constructor(private http: HttpClient) {
        this.loadProductsFromLocalStorage();
    }

    // Cargar productos desde el localStorage
    private loadProductsFromLocalStorage() {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            this.products = JSON.parse(storedProducts);
        }
    }

    // Guardar productos en el localStorage
    private saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    // Obtener todos los productos desde el servidor y combinar con los productos locales
    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => {
                const serverProducts = res.data as Product[];
                this.products = this.mergeProducts(serverProducts, this.products);
                this.saveProductsToLocalStorage();
                return this.products;
            });
    }

    // Combinar los productos del servidor con los productos almacenados localmente
    private mergeProducts(serverProducts: Product[], localProducts: Product[]): Product[] {
        return serverProducts.map(product => {
            const localProduct = localProducts.find(p => p.id === product.id);
            return localProduct ? { ...product, ...localProduct } : product;
        });
    }

    // Actualizar productos
    updateProducts(updatedProducts: Product[]) {
        this.products = updatedProducts;
        this.saveProductsToLocalStorage();
    }

    // Métodos adicionales para otros endpoints
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
