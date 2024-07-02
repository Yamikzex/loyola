import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service'; // Asegúrate de que la ruta sea correcta


@Component({
  templateUrl: './ubicacion.component.html',
  providers: [MessageService]
})
export class UbicacionComponent implements OnInit {
  products: any[] = [];
  product: any = {};
  noInventario: string = '';
  submitted: boolean = false;
  constructor(private productService: ProductService, private messageService: MessageService) { }

  ngOnInit() {
    // Cargar productos desde el servicio
    this.productService.getProducts().then(data => this.products = data);
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
    const foundProduct = this.products.find(p => p.code === this.noInventario);
    if (foundProduct) {
      this.product = { ...foundProduct };
      console.log('Product found:', this.product);
    } else {
      console.log('Product not found');
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
