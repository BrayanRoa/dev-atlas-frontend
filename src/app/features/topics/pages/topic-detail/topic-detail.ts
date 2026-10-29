import { Component, inject } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ITopic, ITopicDetailResponse } from '../../interfaces/topics.interfaces';

@Component({
  selector: 'app-topic-detail',
  imports: [TitleCasePipe],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css',
})
export class TopicDetail {

  readonly topicService = inject(TopicService);
  readonly route = inject(ActivatedRoute);

  topicId: string = '';
  topicDetail : ITopic | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{
      this.topicId = param['id'];
      this.loadTopic();
    })
  }

  loadTopic(): void {
    this.topicService.getTopic(this.topicId).subscribe((topicResponse)=>{
      this.topicDetail = topicResponse.data;
    })
  }

  getIconPath(icon: string): string {
    if(icon === 'default-topic.png') {
      return 'assets/images/default-topic.png';
    }
    const path = `assets/images/${icon}`;
    return path;
  }
}
