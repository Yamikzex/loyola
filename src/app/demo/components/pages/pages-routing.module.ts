import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
  { path: 'poliza', loadChildren: () => import('./poliza/poliza.module').then(m => m.PolizaModule) },
  { path: 'realizar-inventario', loadChildren: () => import('./realizar-inventario/realizar-inventario.module').then(m => m.RealizarInventarioModule) },
  { path: 'baja', loadChildren: () => import('./baja/baja.module').then(m => m.BajaModule) },
  { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
  { path: 'depreciacion', loadChildren: () => import('./depreciacion/depreciacion.module').then(m => m.DepreciacionModule) },
  { path: 'infoPlaca', loadChildren: () => import('./infoPlaca/infoPlaca.module').then(m => m.InfoPlacaModule) },
  { path: 'estado', loadChildren: () => import('./estado/estado.module').then(m => m.EstadoModule) },
  { path: 'proveedor', loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
  { path: 'prestamo', loadChildren: () => import('./prestamo/prestamo.module').then(m => m.PrestamoModule) },
  { path: 'responsable', loadChildren: () => import('./responsable/responsable.module').then(m => m.ResponsableModule) },
  { path: 'ubicacion', loadChildren: () => import('./ubicacion/ubicacion.module').then(m => m.UbicacionModule) },
  { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
