import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { TopicService } from '../../services/topic.service';
import { ITopic } from '../../interfaces/topics.interfaces';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-subtopics-menu',
  imports: [ButtonModule, TitleCasePipe],
  templateUrl: './subtopics-menu.html',
  styleUrl: './subtopics-menu.css',
})
export class SubtopicsMenu {

  @Input()
  subtopicsList: ITopic[] = [];

  @Output()
  selectedSubtopic = new EventEmitter<ITopic>();

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

  onEditSubtopic(subtopic: ITopic): void {
    this.topicDialogService.show(
      'edit',
      'Editar subtopic',
      subtopic,
      this.topicService.currentTopic?.id ?? null,
    );
  }

  onSelectSubtopic(subtopic: ITopic): void {
    this.selectedSubtopic.emit(subtopic);
  }
}
