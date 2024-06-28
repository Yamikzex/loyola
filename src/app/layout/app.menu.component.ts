import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menú',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard']
                    },
                    {
                        label: 'Inventario',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Registro',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Información de Placa',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/infoPlaca']
                            },
                            {
                                label: 'Ubicación',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/ubicacion']
                            },
                            {
                                label: 'Estado',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/estado']
                            },
                            {
                                label: 'Proveedor',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/proveedor']
                            },
                            {
                                label: 'Asignación de responsable',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/responsable']
                            },
                        ]
                    },
                    {
                        label: 'Pólizas',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/poliza']
                    },
                    {
                        label: 'Realizar inventario',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/realizar-inventario']
                    },
                    {
                        label: 'Auditoría',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'De baja',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/baja']
                    },
                    {
                        label: 'Préstamo',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/prestamo']
                    },
                    {
                        label: 'Depreciación',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/depreciacion']
                    },
                    {
                        label: 'Listado',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Por bienes',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/notfound']
                            },
                            {
                                label: 'Por persona',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/notfound']
                            },
                            {
                                label: 'Por sede',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/notfound']
                            },
                            {
                                label: 'Por póliza',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/notfound']
                            },
                            {
                                label: 'Por prestamo',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/notfound']
                            },
                            {
                                label: 'Por devueltos',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/notfound']
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
