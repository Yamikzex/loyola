import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfoPlacaComponent } from './infoPlaca.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: InfoPlacaComponent }
    ])],
    exports: [RouterModule]
})
export class InfoPlacaRoutingModule { }
