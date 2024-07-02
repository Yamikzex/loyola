import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    selector: 'app-poliza',
    templateUrl: './poliza.component.html',
    styleUrls: ['./poliza.component.scss'],
    providers: [MessageService]
})
export class PolizaComponent implements OnInit {

    poliza: any = {
        numero: '',
        fechaExpedicion: null,
        vigencia: { inicio: null, fin: null },
        aseguradora: { nombre: '', nit: '', telefono: '', contacto: '', correo: '' },
        descripcion: '',
        cubrimientos: [],
        excepciones: '',
        productos: []
    };

    cubrimientosOptions = [
        { label: 'Alta Tensión', value: 'alta_tension' },
        { label: 'Robo', value: 'robo' },
        { label: 'Inundación', value: 'inundacion' },
        { label: 'Terremoto', value: 'terremoto' },
        { label: 'Asonada', value: 'asonada' }
    ];

    products: Product[] = [];

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProducts().then(data => {
            this.products = data;
        });
    }

    savePoliza() {
        this.products.forEach(product => {
            if (product.selected) {
                product.insuranceStatus = 'Con póliza';
                product.nombrePoliza = this.poliza.aseguradora.nombre;
                product.numeroPoliza = this.poliza.numero;
                product.cubierto = true;
            }
        });

        this.productService.updateProducts(this.products);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto añadido a una Póliza exitosamente', life: 3000 });
    }

    removePoliza() {
        this.products.forEach(product => {
            if (product.selected) {
                product.insuranceStatus = 'Sin póliza';
                product.nombrePoliza = '';
                product.numeroPoliza = '';
                product.cubierto = false;
            }
        });

        this.productService.updateProducts(this.products);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado de una Póliza exitosamente', life: 3000 });
    }
}
