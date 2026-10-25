import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar-component/sidebar-component';
import { HeaderComponent } from '../../components/header-component/header-component';

@Component({
  selector: 'app-layout-pages',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './layout-pages.html',
  styleUrl: './layout-pages.css',
})
export class LayoutPages {

}
