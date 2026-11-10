import { Component, effect, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { switchMap } from 'rxjs';

import { ITopic } from '../../interfaces/topics.interfaces';
import { TopicService } from '../../services/topic.service';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { SubtopicsMenu } from '../../components/subtopics-menu/subtopics-menu';
import { TopicContentComponent } from '../../components/topic-content-component/topic-content-component';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm-component/modal-confirm-component';
import { IModalConfirmation } from '../../../../shared/interfaces/modal-confirmation.interface';
import { ITag } from '../../../tags/interfaces/tag.interface';

@Component({
  selector: 'app-topic-detail',
  imports: [
    TitleCasePipe,
    ButtonModule,
    MenuModule,
    ModalConfirmComponent,
    SubtopicsMenu,
    TopicContentComponent,
  ],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css',
})
export class TopicDetail {
  // ─── Servicios ───────────────────────────────────────────────
  readonly topicService = inject(TopicService);
  readonly route = inject(ActivatedRoute);
  readonly topicDialogService = inject(TopicDialogService);

  // ─── Estado del topic padre ────────────────────────────────────────
  topicId = '';
  topicDetail: ITopic | null = null;

  // ─── Estado de subtopics ─────────────────────────────────────
  subtopics: ITopic[] = [];
  selectedSubtopic: ITopic | null = null;

  // ─── Menú del topic ──────────────────────────────────────────
  items: MenuItem[] | undefined;

  // ─── Confirmación eliminar topic ─────────────────────────────
  visibleModalConfirmation = false;
  modalConfirmationConfig: IModalConfirmation = {
    title: 'Eliminar topic',
    message:
      '¿Estás seguro de querer eliminar este topic? Esta acción no se puede deshacer.',
    icon: 'pi pi-trash',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  };

  // ─── Ciclo de vida ───────────────────────────────────────────
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

  // ─── Carga de datos ──────────────────────────────────────────
  loadTopic(): void {
    this.topicService
      .getTopic(this.topicId)
      .pipe(
        switchMap((topicResponse) => {
          this.topicDetail = topicResponse.data ?? null;
          return this.topicService.getSubtopics(this.topicId);
        }),
      )
      .subscribe((subtopicsResponse) => {
        this.subtopics = subtopicsResponse.data ?? [];
        this.selectedSubtopic = this.subtopics[0] ?? null;
      });
  }

  private reloadSubtopics(deletedId?: string): void {
    this.topicService.getSubtopics(this.topicId).subscribe((res) => {
      this.subtopics = res.data ?? [];
      if (!deletedId || this.selectedSubtopic?.id === deletedId) {
        this.selectedSubtopic = this.subtopics[0] ?? null;
      }
    });
  }

  // ─── Helpers de UI ───────────────────────────────────────────
  getIconPath(icon: string): string {
    if (icon === 'default-topic.png') {
      return 'assets/images/default-topic.png';
    }
    return `assets/images/${icon}`;
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

  // ─── Acciones del topic principal ────────────────────────────
  onEditTopic(): void {
    if (!this.topicDetail) return;
    this.topicDialogService.show('edit', 'Editar topic', this.topicDetail);
  }

  onDeleteTopic(): void {
    this.visibleModalConfirmation = true;
  }

  onConfirmDeleteTopic(): void {
    this.visibleModalConfirmation = false;
    if (!this.topicDetail) return;
    this.topicService.deleteTopic(this.topicDetail.id).subscribe({
      next: () => {
        this.topicDetail = null;
        this.selectedSubtopic = null;
        this.subtopics = [];
      },
    });
  }

  onCancelDeleteTopic(): void {
    this.visibleModalConfirmation = false;
  }

  // ─── Acciones de subtopics ───────────────────────────────────
  onSelectSubtopic(subtopic: ITopic): void {
    this.selectedSubtopic = subtopic;
  }

  onDeletedSubtopic(subtopic: ITopic): void {
    const deletedId = subtopic.id;
    this.topicService.deleteTopic(deletedId).subscribe({
      next: () => this.reloadSubtopics(deletedId),
    });
  }

  // ─── Helpers de UI ───────────────────────────────────────────
  joinTags(): ITag[] {
    const parentTags = this.topicDetail?.topicTags.map((t) => t.tag) ?? [];
    const subtopicTags = this.selectedSubtopic?.topicTags.map((t) => t.tag) ?? [];
  
    return [
      ...new Map(
        [...parentTags, ...subtopicTags].map((tag) => [tag.id, tag]),
      ).values(),
    ];
  }
}
