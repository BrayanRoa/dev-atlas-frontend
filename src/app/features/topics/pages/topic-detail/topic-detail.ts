import { Component } from '@angular/core';

@Component({
  selector: 'app-topic-detail',
  imports: [],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css',
})
export class TopicDetail {

  tags: string[] = ['tag1', 'tag2', 'tag3'];
}
