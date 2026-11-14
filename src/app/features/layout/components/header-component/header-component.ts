import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm-component/modal-confirm-component';
import { IModalConfirmation } from '../../../../shared/interfaces/modal-confirmation.interface';

@Component({
  selector: 'app-header-component',
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ModalConfirmComponent
],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  items!: MenuItem[];
  menuOpen = false;
  showLogoutConfirmation = false;
  logoutConfirmationConfig: IModalConfirmation = {
    title: 'Confirmar cierre de sesión',
    message: '¿Seguro que quieres salir de DevAtlas?',
    icon: 'pi pi-sign-out',
    confirmButtonText: 'Salir',
    cancelButtonText: 'Cancelar'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [
      { label: 'Perfil', icon: 'pi pi-user' },
      { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.confirmLogout() },
    ];
  }

  confirmLogout() {
    this.showLogoutConfirmation = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onCancelLogout() {
    this.showLogoutConfirmation = false;
  }

  get userInformation() {
    const userName = localStorage.getItem("user_name");
    if (userName) {
      return userName;
    }
    return 'Usuario';
  }
}
