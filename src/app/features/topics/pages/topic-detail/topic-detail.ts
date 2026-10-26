import { Component, inject } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-topic-detail',
  imports: [TitleCasePipe],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css',
})
export class TopicDetail {

  readonly topicService = inject(TopicService);

  tags: string[] = ['tag1', 'tag2', 'tag3'];

  ngOnInit(): void {
    console.log('topicService.currentTopic', this.topicService.currentTopic);
  }

  getIconPath(icon: string): string {
    const path = `assets/images/${icon}`;
    return path;
  }
}
