import { Component, effect, inject } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  ITopic,
  ITopicDetailResponse,
} from '../../interfaces/topics.interfaces';
import { ButtonModule } from 'primeng/button';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-topic-detail',
  imports: [TitleCasePipe, ButtonModule, ConfirmDialogModule, MenuModule],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css',
  providers: [ConfirmationService, MessageService],
})
export class TopicDetail {
  items: MenuItem[] | undefined;

  readonly topicService = inject(TopicService);
  readonly route = inject(ActivatedRoute);
  readonly topicDialogService = inject(TopicDialogService);
  readonly confirmationService = inject(ConfirmationService);
  readonly messageService = inject(MessageService);

  topicId: string = '';
  topicDetail: ITopic | null = null;

  constructor() {
    effect(() => {
      if (this.topicService.topicSaved() === 0) return;
      this.loadTopic();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.topicId = param['id'];
      this.loadTopic();
      this.loadMenuItems();
    });
  }

  loadTopic(): void {
    this.topicService.getTopic(this.topicId).subscribe((topicResponse) => {
      this.topicDetail = topicResponse.data ?? null;
    });
  }

  getIconPath(icon: string): string {
    if (icon === 'default-topic.png') {
      return 'assets/images/default-topic.png';
    }
    const path = `assets/images/${icon}`;
    return path;
  }

  onEditTopic(): void {
    if (!this.topicDetail) return;
    this.topicDialogService.show('edit', 'Editar topic', this.topicDetail);
  }

  onDeleteTopic(): void {
    this.confirmationService.confirm({
      header: 'Eliminar topic',
      message: '¿Estás seguro de querer eliminar este topic?',
      accept: () => {
        if (!this.topicDetail) return;
        this.topicService.deleteTopic(this.topicDetail.id).subscribe({
          next: () => {
            this.topicDetail = null;
          },
        });
      },
    });
  }

  loadMenuItems(): void {
    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.onEditTopic(),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => this.onDeleteTopic(),
      },
    ];
  }
}
