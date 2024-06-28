import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    email: string = '';
    password: string = '';

    constructor(public layoutService: LayoutService, private router: Router) { }

    onLogin() {
        if (this.email === 'admin' && this.password === 'admin1') {
            // Redirigir al dashboard después de un login exitoso
            this.router.navigate(['/dashboard']);
        } else {
            alert('Credenciales incorrectas');
        }
    }
}
