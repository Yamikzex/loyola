import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './prestamo.component.html',
    providers: [MessageService]
})
export class PrestamoComponent implements OnInit {

    formularioDevolucion: boolean = false;

    productDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'code', header: 'Número de inventario' },
            { field: 'name', header: 'Nombre' },
            { field: 'image', header: 'Imagen' },
            { field: 'marca', header: 'Marca' },
            { field: 'category', header: 'Categoría' },
            { field: 'fecha_prestamo', header: 'Fecha de préstamo' },
            { field: 'fecha_devolucion', header: 'Fecha de devolución' },
            { field: 'estadoPresta', header: 'Estado' },
            { field: 'nombrePresta', header: 'Prestado a' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
        this.formularioDevolucion = product.estadoPresta === 'PRESTADO';
    }
    

    deleteProduct(product: Product) {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    resetForm() {
        this.product.cedulaPresta = "";
        this.product.nombrePresta = "";
        this.product.cargoPresta = "";
        this.product.fecha_prestamo = "";
        this.product.observacionesPresta = "";
        this.product.fecha_devolucion = "";
        this.product.observacionesDevolucion = "";
        this.product.fechaDevolucion_final = "";
    }
    

    saveProduct() {
        this.submitted = true;
    
        if (this.formularioDevolucion) {
            // Validar los campos del formulario de devolución
            if (this.product.fechaDevolucion_final && this.product.observacionesDevolucion) {
                this.product.estadoPresta = 'DISPONIBLE';
                this.resetForm(); // Limpiar el formulario
                this.updateProduct();
            }
        } else {
            // Validar los campos del formulario de préstamo
            if (this.product.cedulaPresta && this.product.nombrePresta && this.product.cargoPresta && this.product.fecha_prestamo && this.product.fecha_devolucion) {
                this.product.estadoPresta = 'PRESTADO';
                this.updateProduct();
            }
        }
    }
    
    updateProduct() {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
    
        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
    }
    
    
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getHeaderTitle() {
        return this.product.id ? 'Editar prestamo' : 'Nuevo prestamo';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
