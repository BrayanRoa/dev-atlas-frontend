import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header-component',
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  items!: MenuItem[];
  menuOpen = false;

  // constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      { label: 'Perfil', icon: 'pi pi-user' },
      { label: 'Cerrar sesión', icon: 'pi pi-sign-out' },
    ];
  }
}
