import { Component, inject } from '@angular/core';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topic-empty',
  imports: [ButtonModule],
  templateUrl: './topic-empty.html',
  styleUrl: './topic-empty.css',
})
export class TopicEmpty {

  readonly topicDialogService = inject(TopicDialogService);

  onCreateTopic(): void {
    this.topicDialogService.show('create', 'Crear nuevo topic');
  }

}
