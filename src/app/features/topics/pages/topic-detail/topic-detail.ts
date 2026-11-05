import { Component, effect, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

import { ITopic } from '../../interfaces/topics.interfaces';
import { TopicService } from '../../services/topic.service';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { DeleteConfirmModal } from '../../components/delete-confirm-modal/delete-confirm-modal';

@Component({
  selector: 'app-topic-detail',
  imports: [TitleCasePipe, ButtonModule, MenuModule, DeleteConfirmModal],
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
    this.topicService.getTopic(this.topicId).subscribe((topicResponse) => {
      this.topicDetail = topicResponse.data ?? null;
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
