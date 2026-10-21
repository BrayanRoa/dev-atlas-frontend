import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header-component',
  imports: [InputTextModule, IconFieldModule, InputIconModule, SplitButtonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  items!: MenuItem[];


  // constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      { label: 'Profile', icon: 'pi pi-user' },
      { label: 'Logout', icon: 'pi pi-sign-out' },
    ];
  }
}
