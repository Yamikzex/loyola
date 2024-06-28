import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';

@Component({
    selector: 'app-realizar-inventario',
    templateUrl: './realizar-inventario.component.html',
    providers: [MessageService]
})
export class RealizarInventarioComponent implements OnInit {

    products: Product[] = [];
    cols: any[] = [];
    deleteProductDialog: boolean = false;
    selectedProducts: Product[] = [];

    // Propiedades para el formulario de cambio de estado
    selectedEstado: any;
    responsable: string;
    revisado_por: string;
    observacion: string;
    fechaBaja: string; // Nueva propiedad para la fecha de baja

    // Propiedades para mostrar detalles del producto
    selectedProduct: Product;
    detailsDialog: boolean = false;

    estadoOptions: any[] = [
        { label: 'Robado', value: 'Robado' },
        { label: 'Desaparecido', value: 'Desaparecido' },
        { label: 'Dañado', value: 'Desaparecido' },
        { label: 'En reparación', value: 'Desaparecido' },
        { label: 'En revisión', value: 'Desaparecido' },
        { label: 'Prestado', value: 'Desaparecido' },
        { label: 'Disponible', value: 'OK' }
    ];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'code', header: 'ID' },
            { field: 'name', header: 'Nombre' },
            { field: 'image', header: 'Imagen' },
            { field: 'category', header: 'Categoría' },
            { field: 'responsable', header: 'Responsable' },
            { field: 'fecha_ultimo_cambio', header: 'Última modificación' },
            { field: 'estado_actual', header: 'Estado Actual' },
            { field: 'ubicacion', header: 'Ubicación' },
            { field: 'acciones', header: 'Acciones' }
        ];
    }

    changeProductStatus(product: Product) {
        this.selectedProducts = [product];
        this.deleteProductDialog = true;
    }

    confirmChangeStatus() {
        if (this.selectedEstado && this.observacion) {
            this.selectedProducts.forEach(product => {
                product.estado_actual = this.selectedEstado.label;
                product.revisado_por = this.revisado_por;
                product.observacion = this.observacion;
                product.fecha_ultimo_cambio = new Date().toISOString().slice(0, 10); // Fecha actual
                // Aquí podrías implementar lógica adicional según tu backend para actualizar el estado
            });
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado exitosamente', life: 3000 });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completa todos los campos del formulario', life: 3000 });
        }
        this.deleteProductDialog = false;
        this.resetForm();
    }

    resetForm() {
        this.selectedEstado = null;
        this.revisado_por = '';
        this.observacion = '';
        this.fechaBaja = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showProductDetails(product: Product) {
        this.selectedProduct = product;
        this.detailsDialog = true;
    }
}
