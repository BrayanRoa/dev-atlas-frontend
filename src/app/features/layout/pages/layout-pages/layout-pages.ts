import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { HeaderComponent } from '../../components/header-component/header-component';
import { CreateEditModal } from '../../../topics/components/create-edit-modal/create-edit-modal';

@Component({
  selector: 'app-layout-pages',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    CreateEditModal
  ],
  templateUrl: './layout-pages.html',
  styleUrl: './layout-pages.css',
})
export class LayoutPages {

}
