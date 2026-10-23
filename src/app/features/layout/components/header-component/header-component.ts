import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
@Component({
  selector: 'app-header-component',
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TitleCasePipe,
    SplitButtonModule
],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  items!: MenuItem[];
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [
      { label: 'Perfil', icon: 'pi pi-user' },
      { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() },
    ];
  }

  logout() {
    console.log("logout");
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get userInformation() {
    return this.authService.userInformation?.firstName + ' ' + this.authService.userInformation?.lastName;
  }
}
