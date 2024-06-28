import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service'; 

@Component({
    templateUrl: './infoPlaca.component.html',
    providers: [MessageService]
})
export class InfoPlacaComponent {

    products: any[] = [];
    product: any = {};
    submitted: boolean = false;
    noInventario: string = '';
    photoPreview: string | ArrayBuffer | null = null;
    tipos: any[] = [
        { label: 'EQUIPOS Y DISPOSITIVOS ELECTRÓNICOS', value: 'equipos y dispositivos electrónicos' },
        { label: 'MOBILIARIO ESCOLAR', value: 'mobiliario escolar' },
        { label: 'MATERIAL DE ENSEÑANZA', value: 'material de enseñanza' },
        { label: 'SUMINISTROS DE OFICINA', value: 'suministros de oficina' },
        { label: 'EQUIPO DE LABORATORIO', value: 'equipo de laboratorio' },
        { label: 'EQUIPAMIENTO DEPORTIVO', value: 'equipamiento deportivo' },
        { label: 'SUMINISTROS DE LIMPIEZA Y MANTENIMIENTO', value: 'suministros de limpieza y mantenimiento' },
        { label: 'EQUIPAMIENTO DE SEGURIDAD', value: 'equipamiento de seguridad' }
    ];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.photoPreview = e.target.result;
            reader.readAsDataURL(file);
        }
    }

    save() {
        this.submitted = true;

        if (this.product.name.trim()) {
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
            this.product = {};
        }
    }

    search() {
        console.log('Search for product');
        const foundProduct = this.products.find(p => p.id === this.noInventario);
        if (foundProduct) {
            this.product = { ...foundProduct };
            console.log('Product found:', this.product);
        } else {
            console.log('Product not found');
            // Opcional: mostrar un mensaje de error al usuario
        }
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
}
