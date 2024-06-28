import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UbicacionComponent } from './ubicacion.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UbicacionComponent }
	])],
	exports: [RouterModule]
})
export class UbicacionRoutingModule { }
