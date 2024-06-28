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
        { label: 'Inundación', value: 'inundacion' }    ,
        { label: 'Terremoto', value: 'terremoto' },
        { label: 'Asonada', value: 'asonada' }
    ];

    products: Product[] = [];

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
    }

    savePoliza() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Poliza saved successfully', life: 3000 });
    }
}
