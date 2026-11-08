import { Component, Input } from '@angular/core';
import { ITopic } from '../../interfaces/topics.interfaces';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-topic-content-component',
  imports: [TitleCasePipe],
  templateUrl: './topic-content-component.html',
  styleUrl: './topic-content-component.css',
})
export class TopicContentComponent {
  @Input()
  subtopic: ITopic | null = null;

  getIconPath(icon: string): string {
    if (icon === 'default-topic.png') {
      return 'assets/images/default-topic.png';
    }
    return `assets/images/${icon}`;
  }
}
