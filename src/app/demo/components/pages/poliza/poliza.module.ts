import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PolizaRoutingModule } from './poliza-routing.module';
import { PolizaComponent } from './poliza.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog'; // Importa el DialogModule
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PolizaRoutingModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        MultiSelectModule,
        CheckboxModule,
        DialogModule, // Asegúrate de agregar DialogModule aquí
        ToastModule,

    ],
    declarations: [PolizaComponent],
    providers: [MessageService]
})
export class PolizaModule { }
