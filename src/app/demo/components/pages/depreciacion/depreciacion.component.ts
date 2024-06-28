import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';

@Component({
    selector: 'app-depreciacion',
    templateUrl: './depreciacion.component.html',
    providers: [MessageService]
})
export class DepreciacionComponent implements OnInit {

    products: Product[] = [];
    cols: any[] = [];
    selectedProducts: Product[] = [];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'code', header: 'ID' },
            { field: 'name', header: 'Nombre' },
            { field: 'image', header: 'Imagen' },
            { field: 'price', header: 'useful_life' },
            { field: 'useful_life', header: 'useful_life' },
            { field: 'category', header: 'Categoría' },
            { field: 'fecha_adquisicion', header: 'Fecha de adquisición' }
        ];
    }

    depreciateProduct(product: Product) {
        // Verificar si la vida útil es mayor que 0
        if (product.useful_life > 0) {
            // Calcular la depreciación por año
            const depreciationPerYear = (product.price - product.residual_value) / product.useful_life;
    
            // Calcular el nuevo precio y la nueva vida útil
            const newUsefulLife = product.useful_life - 1;
            const newPrice = product.price - depreciationPerYear;
    
            // Actualizar el producto
            product.useful_life = newUsefulLife;
            product.price = newPrice;
    
            // Mostrar mensaje de éxito
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto depreciado exitosamente', life: 3000 });
        } else {
            // Mostrar mensaje de advertencia si la vida útil es 0
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Este producto no se puede depreciar más', life: 3000 });
        }
    }
    
    
    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
