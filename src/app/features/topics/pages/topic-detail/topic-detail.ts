import { Component, effect, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

import { ITopic, ITopicListItem } from '../../interfaces/topics.interfaces';
import { TopicService } from '../../services/topic.service';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { DeleteConfirmModal } from '../../components/delete-confirm-modal/delete-confirm-modal';
import { SubtopicsMenu } from '../../components/subtopics-menu/subtopics-menu';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-topic-detail',
  imports: [TitleCasePipe, ButtonModule, MenuModule, DeleteConfirmModal, SubtopicsMenu],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css',
})
export class TopicDetail {

  // Servicios
  readonly topicService = inject(TopicService);
  readonly route = inject(ActivatedRoute);
  readonly topicDialogService = inject(TopicDialogService);

  // Datos del topic
  topicId = '';
  topicDetail: ITopic | null = null;
  subtopics: ITopicListItem[] = [];

  // Menú y confirmación
  items: MenuItem[] | undefined;
  visible = false;

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

  // Carga del topic

  loadTopic(): void {
    this.topicService.getTopic(this.topicId).pipe(
      switchMap((topicResponse) => {
        this.topicDetail = topicResponse.data ?? null;
        return this.topicService.getSubtopics(this.topicId);
      }),
    ).subscribe((subtopicsResponse) => {
      this.subtopics = subtopicsResponse.data ?? [];
    });
  }

  getIconPath(icon: string): string {
    if (icon === 'default-topic.png') {
      return 'assets/images/default-topic.png';
    }
    return `assets/images/${icon}`;
  }

  // Menú

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

  // Editar

  onEditTopic(): void {
    if (!this.topicDetail) return;
    this.topicDialogService.show('edit', 'Editar topic', this.topicDetail);
  }

  // Eliminar

  /** Abre el diálogo. La página es quien guarda visible. */
  onDeleteTopic(): void {
    this.visible = true;
  }

  /** Solo corre si el modal emitió confirm. */
  onConfirmDeleteTopic(): void {
    if (!this.topicDetail) return;
    this.topicService.deleteTopic(this.topicDetail.id).subscribe({
      next: () => {
        this.topicDetail = null;
      },
    });
  }
}
