import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';

@Component({
    selector: 'app-baja',
    templateUrl: './baja.component.html',
    providers: [MessageService]
})
export class BajaComponent implements OnInit {

    products: Product[] = [];
    cols: any[] = [];
    deleteProductDialog: boolean = false;
    selectedProducts: Product[] = [];

    // Propiedades para el formulario de baja
    selectedEstado: any;
    autorizado_por: string;
    justificacion: string;
    fechaBaja: string; // Nueva propiedad para la fecha de baja

    // Propiedades para mostrar detalles del producto
    selectedProduct: Product;
    detailsDialog: boolean = false;

    estadoOptions: any[] = [
        { label: 'Disponible', value: 'Disponible' },
        { label: 'De baja', value: 'De baja' }
    ];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'code', header: 'ID' },
            { field: 'name', header: 'Nombre' },
            { field: 'image', header: 'Imagen' },
            { field: 'marca', header: 'Marca' },
            { field: 'category', header: 'Categoría' },
            { field: 'fecha_adquisicion', header: 'Fecha de adquisición' },
            { field: 'estado', header: 'Estado' }
        ];
    }

    deleteProduct(product: Product) {
        this.selectedEstado = this.estadoOptions.find(option => option.value === 'De baja');
        this.autorizado_por = '';
        this.justificacion = '';
        this.fechaBaja = ''; // Limpiamos la fecha de baja al abrir el diálogo
        this.selectedProducts = [product];
        this.deleteProductDialog = true;
    }

    confirmDeleteProduct() {
        if (this.selectedEstado && this.autorizado_por && this.justificacion) {
            this.selectedProducts.forEach(product => {
                product.estado = this.selectedEstado.value; // Asignamos el estado al producto
                product.autorizado_por = this.autorizado_por;
                product.justificacion = this.justificacion;
                if (product.estado === 'De baja') {
                    product.fechaBaja = this.fechaBaja; // Asignamos la fecha de baja al producto si está marcado como 'de baja'
                } else {
                    product.fechaBaja = ''; // Limpiamos la fecha de baja si no está marcado como 'de baja'
                }
                // Aquí podrías implementar la lógica para actualizar el estado en el JSON original
                // En este ejemplo, solo actualizamos la lista local
            });
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto dado de baja exitosamente', life: 3000 });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos del formulario', life: 3000 });
        }
        this.deleteProductDialog = false;
        this.resetForm();
    }

    resetForm() {
        this.selectedEstado = null;
        this.autorizado_por = '';
        this.justificacion = '';
        this.fechaBaja = ''; // Limpiamos la fecha de baja en el reset del formulario
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showDetails(product: Product) {
        this.selectedProduct = product;
        this.detailsDialog = true;
    }
}
