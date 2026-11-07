import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { TopicService } from '../../services/topic.service';
import { ITopicListItem } from '../../interfaces/topics.interfaces';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-subtopics-menu',
  imports: [ButtonModule, TitleCasePipe],
  templateUrl: './subtopics-menu.html',
  styleUrl: './subtopics-menu.css',
})
export class SubtopicsMenu {

  @Input() 
  subtopicsList: ITopicListItem[] = [];

  private readonly topicDialogService = inject(TopicDialogService);
  private readonly topicService = inject(TopicService);

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
