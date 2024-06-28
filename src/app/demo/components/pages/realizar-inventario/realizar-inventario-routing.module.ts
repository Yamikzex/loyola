
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealizarInventarioComponent } from './realizar-inventario.component';

const routes: Routes = [
    { path: '', component: RealizarInventarioComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RealizarInventarioRoutingModule { }
