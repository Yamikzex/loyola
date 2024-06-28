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
    responsable: string;
    descripcion: string;
    fechaBaja: string; // Nueva propiedad para la fecha de baja

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
        this.responsable = '';
        this.descripcion = '';
        this.fechaBaja = ''; // Limpiamos la fecha de baja al abrir el diálogo
        this.selectedProducts = [product];
        this.deleteProductDialog = true;
    }

    confirmDeleteProduct() {
        if (this.selectedEstado && this.responsable && this.descripcion) {
            this.selectedProducts.forEach(product => {
                product.estado = this.selectedEstado.value; // Asignamos el estado al producto
                if (product.estado === 'De baja') {
                    product.fecha_baja = this.fechaBaja; // Asignamos la fecha de baja al producto si está marcado como 'de baja'
                } else {
                    product.fecha_baja = ''; // Limpiamos la fecha de baja si no está marcado como 'de baja'
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
        this.responsable = '';
        this.descripcion = '';
        this.fechaBaja = ''; // Limpiamos la fecha de baja en el reset del formulario
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showDetails(product: Product) {
        console.log(product); // Muestra los detalles del producto dado de baja
        // Aquí podrías implementar la lógica para mostrar los detalles del producto dado de baja
        // Por ejemplo, podrías abrir un diálogo o navegar a una nueva página para mostrar los detalles
    }
}
