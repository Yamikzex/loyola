import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/demo/service/product.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-inventory-manager',
  templateUrl: './responsable.component.html'
})
export class ResponsableComponent implements OnInit {
  products: any[] = [];
  cols: any[];
  product: any = {};
  noInventario: string = ''; // Para el número de inventario buscado

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Cargar productos desde el servicio
    this.productService.getProducts().then(data => this.products = data);

    this.cols = [
      { field: 'ID_responsable', header: 'ID del responsable' },
      { field: 'Nombre_responsable', header: 'Nombre completo del responsable' },
      { field: 'Cargo_responsable', header: 'Cargo del responsable' },
      { field: 'Fecha_asignacion', header: 'Fecha de asignación' },
      { field: 'Observaciones', header: 'Observaciones' },
      { field: 'Fecha_devolucion', header: 'Fecha de devolución' }
    ];
  }

  save() {
    console.log('Product saved', this.product);
  }

  search() {
    const foundProduct = this.products.find(p => p.noInventario === this.noInventario);
    if (foundProduct) {
      this.product = { ...foundProduct };
      console.log('Product found', this.product);
    } else {
      console.log('Product not found');
      // Opcional: mostrar un mensaje de error al usuario
    }
  }
}
