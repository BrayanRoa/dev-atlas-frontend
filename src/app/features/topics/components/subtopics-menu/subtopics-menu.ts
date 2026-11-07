import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-subtopics-menu',
  imports: [ButtonModule],
  templateUrl: './subtopics-menu.html',
  styleUrl: './subtopics-menu.css',
})
export class SubtopicsMenu {

  private readonly topicDialogService = inject(TopicDialogService);
  private readonly topicService = inject(TopicService);

  subtopics: any[] = [
    {
      id: 1,
      name: 'Subtopic 1',
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Subtopic 2',
      description: 'Description 2',
    },
    {
      id: 3,
      name: 'Subtopic 3',
      description: 'Description 3',
    },
    {
      id: 4,
      name: 'Subtopic 1',
      description: 'Description 1',
    },
    {
      id: 5,
      name: 'Subtopic 2',
      description: 'Description 2',
    },
    {
      id: 6,
      name: 'Subtopic 3',
      description: 'Description 3',
    },
    {
      id: 7,
      name: 'Subtopic 1',
      description: 'Description 1',
    },
    {
      id: 8,
      name: 'Subtopic 2',
      description: 'Description 2',
    },
    {
      id: 9,
      name: 'Subtopic 3',
      description: 'Description 3',
    },
  ];

  onCreateSubtopic(): void {
    const parentTopicId = this.topicService.currentTopic?.id ?? null;
    this.topicDialogService.show(
      'create',
      'Crear nuevo subtopic',
      null,
      parentTopicId,
    );
  }

  onSelectSubtopic(subtopic: any): void {}
}
