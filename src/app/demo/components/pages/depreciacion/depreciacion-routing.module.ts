import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepreciacionComponent } from './depreciacion.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DepreciacionComponent }
	])],
	exports: [RouterModule]
})
export class DepreciacionRoutingModule { }
