import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BajaComponent } from './baja.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BajaComponent }
	])],
	exports: [RouterModule]
})
export class BajaRoutingModule { }
