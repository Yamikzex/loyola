import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service'; // Asegúrate de que la ruta sea correcta

@Component({
    selector: 'app-estado-manager',
    templateUrl: './estado.component.html',
    providers: [MessageService],
})
export class EstadoComponent implements OnInit {
    products: any[] = [];
    product: any = {};
    noInventario: string = '';
    submitted: boolean = false;

    constructor(
        private productService: ProductService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        // Cargar productos desde el servicio al iniciar el componente
        this.productService
            .getProducts()
            .then((data) => (this.products = data));
    }

    estadoOptions: any[] = [
        { label: 'Disponible', value: 'Disponible' },
        { label: 'De baja', value: 'De baja' },
    ];

    save() {
        this.submitted = true;

        // Mostrar el mensaje de éxito sin modificar el producto
        if (this.product.name.trim()) {
            if (this.product.id) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Producto Actualizado',
                    life: 3000,
                });
            } else {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Producto Creado',
                    life: 3000,
                });
            }
            this.product = {}; // Limpia el formulario después de guardar
        }
    }

    search() {
        // Función para buscar un producto por su número de inventario
        console.log('Buscar producto');
        const foundProduct = this.products.find((p) => p.code === this.noInventario);
        if (foundProduct) {
            // Copia el producto encontrado al objeto `product`
            this.product = { ...foundProduct };
    
            // Aquí puedes agregar lógica adicional para mostrar información relevante
            console.log('Producto encontrado:', this.product);
    
            // Por ejemplo, puedes mostrar más detalles en la interfaz
            // Asignamos los detalles que queremos mostrar
            this.product.estado = foundProduct.estado; // Esto asume que `estado` es un campo relevante que deseas mostrar
            this.product.autorizado_por = foundProduct.autorizado_por; // Otro campo relevante
    
        } else {
            console.log('Producto no encontrado');
        }
    }
    

    findIndexById(id: string): number {
        // Función auxiliar para encontrar el índice de un producto por su ID
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
}
