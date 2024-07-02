import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    
    currentStep: number = 1;

    totalSteps: number = 6;

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statusesGarantia: any[] = [];

    tipos: any[] = [];

    Paises: any[] = [];

    garantiatipos: any[] = [];

    statusProduct: any[] = [];

    cobertura: any[] = [];

    maintenancetype: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    pieces: { category: string } = { category: '' };

    parts: { name: string, id: string }[] = [];

    fundamentalPart: { name: string, id: string } = { name: '', id: '' };

    constructor(private productService: ProductService, private messageService: MessageService) { }


    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'garantiaProveedor', header: 'Garantía del proveedor' },
            { field: 'insuranceStatus', header: 'Insurance' },
            { field: 'inventoryGroup', header: 'InventoryGroup' }           
        ];

        this.statusesGarantia = [
            { label: 'ACTIVO', value: 'activo' },
            { label: 'INACTIVO', value: 'inactivo' }
        ];

        this.tipos = [
            { label: 'EQUIPOS Y DISPOSITIVOS ELECTRÓNICOS', value: 'equipos y dispositivos electrónicos' },
            { label: 'MOBILIARIO ESCOLAR', value: 'mobiliario escolar' },
            { label: 'MATERIAL DE ENSEÑANZA', value: 'material de enseñanza' },
            { label: 'SUMINISTROS DE OFICINA', value: 'suministros de oficina' },
            { label: 'EQUIPO DE LABORATORIO', value: 'equipo de laboratorio' },
            { label: 'EQUIPAMIENTO DEPORTIVO', value: 'equipamiento deportivo' },
            { label: 'SUMINISTROS DE LIMPIEZA Y MANTENIMIENTO', value: 'suministros de limpieza y mantenimiento' },
            { label: 'EQUIPAMIENTO DE SEGURIDAD', value: 'equipamiento de seguridad' }
        ];
        this.statusProduct = [
            { label: 'PRESTADO', value: 'prestado' },
            { label: 'REPARACIÓN', value: 'reparación' },
            { label: 'EN USO', value: 'en uso' },
            { label: 'INACTIVO', value: 'inactivo' }
        ];
        this.garantiatipos = [
            { label: 'GARANTÍA POR DAÑO ACCIDENTAL', value: 'garantía por daño accidental' },
            { label: 'GARANTÍA POR ROBO', value: 'grantía por robos' },
            { label: 'GARANTÍA POR PÉRDIDA', value: 'garantía por pérdida' },
            { label: 'GARANTÍA POR DAÑO DE FÁBRICA', value: 'garantía por daño de fábrica'}
        ];
        this.cobertura = [
            { label: 'SEGURO DE PROPIEDADES', value: 'seguro de propiedades' },
            { label: 'SEGURO DE EQUIPO Y MOBILIARIO', value: 'seguro de equipo y mobiliario' },
            { label: 'SEGURO DE RESPONSABILIDAD CIVIL DE PROPIEDAD', value: 'seguro de responsabilidad civil de propiedad' },
            { label: 'SEGURO DE EQUIPO DEPORTIVO', value: 'seguro de equipo deportivo' },
            { label: 'SEGURO DE LIBROS Y MATERIALES EDUCATIVOS', value: 'seguro de libros y materiales educativos' }
        ];
        this.maintenancetype = [
            { label: 'MANTENIMIENTO PREVENTIVO', value: 'mantenimiento preventivo' },
            { label: 'MANTENIMIENTO PREDICTIVO', value: 'mantenimiento predictivo' },
            { label: 'MANTENIMIENTO CORRECTIVO', value: 'mantenimiento correctivo' },
        ];
        
        this.Paises = [
            { label: 'COLOMBIA', value: 'colombia' },
            { label: 'BRASIL', value: 'brasil' },
            { label: 'MÉXICO', value: 'méxico' },
        ];
    }

    getHeaderTitle(): string {
        switch (this.currentStep) {
            case 1:
                return "Información de Placa";
            case 2:
                return "Ubicación";
            case 3:
                 return "Estado";
            case 4:
                return "Proveedor";                       
            case 5:
                return "Asignación de responsable";
            case 6:
                return "Foto";
            default:
                return "Otro título";
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    resetSteps() {
        this.currentStep = 1;
        this.resetParts();
    }

    resetParts() {
        this.parts = [];
    }

    addPart() {
        this.parts.push({ name: '', id: '' });
    }    

    removeLastPart() {
        if (this.parts.length > 0) {
          this.parts.pop();
        }
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'ACTIVO';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
