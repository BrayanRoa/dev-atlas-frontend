import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TopicDialogService } from '../../../topics/services/topic-dialog.service';

@Component({
  selector: 'app-sidebar-component',
  imports: [],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {

  private readonly topicDialogService = inject(TopicDialogService);

  /**
   * Abre el modal para crear un nuevo topic
   */
  onCreateTopic(): void {
    this.topicDialogService.show('create', 'Crear nuevo topic');
  }
}
