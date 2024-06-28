import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResponsableComponent } from './responsable.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ResponsableComponent }
	])],
	exports: [RouterModule]
})
export class ResponsableRoutingModule { }
