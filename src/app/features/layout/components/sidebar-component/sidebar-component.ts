import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TopicDialogService } from '../../../topics/services/topic-dialog.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar-component',
  imports: [ButtonModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {

  openWorkspace: boolean = false;

  private readonly topicDialogService = inject(TopicDialogService);

  /**
   * Abre el modal para crear un nuevo topic
   */
  onCreateTopic(): void {
    this.topicDialogService.show('create', 'Crear nuevo topic');
  }

  /**
   * Abre el modal para crear un nuevo workspace
   */
  onOpenWorkspace(): void {
    this.openWorkspace = !this.openWorkspace;
  }
  
}
