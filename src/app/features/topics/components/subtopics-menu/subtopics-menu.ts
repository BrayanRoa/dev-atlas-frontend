import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { TopicDialogService } from '../../services/topic-dialog.service';
import { TopicService } from '../../services/topic.service';
import { ITopic } from '../../interfaces/topics.interfaces';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm-component/modal-confirm-component';
import { IModalConfirmation } from '../../../../shared/interfaces/modal-confirmation.interface';

@Component({
  selector: 'app-subtopics-menu',
  imports: [ButtonModule, TitleCasePipe, ModalConfirmComponent],
  templateUrl: './subtopics-menu.html',
  styleUrl: './subtopics-menu.css',
})
export class SubtopicsMenu {
  
  // ─── Inputs / Outputs ────────────────────────────────────────
  @Input()
  subtopicsList: ITopic[] = [];

  @Input()
  selectedSubtopicId: string | null = null;
  
  @Output()
  selectedSubtopic = new EventEmitter<ITopic>();

  @Output()
  deletedSubtopic = new EventEmitter<ITopic>();

  // ─── Confirmación eliminar ───────────────────────────────────
  visibleModalConfirm = false;
  selectedSubtopicToDelete: ITopic | null = null;
  configModalConfirm: IModalConfirmation = {
    title: 'Eliminar subtopic',
    message:
      '¿Estás seguro de querer eliminar este subtopic? Esta acción no se puede deshacer.',
    icon: 'pi pi-trash',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  };

  // ─── Servicios ───────────────────────────────────────────────
  private readonly topicDialogService = inject(TopicDialogService);
  private readonly topicService = inject(TopicService);

  // ─── Crear / editar ──────────────────────────────────────────
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

  // ─── Selección ───────────────────────────────────────────────
  onSelectSubtopic(subtopic: ITopic): void {
    this.selectedSubtopic.emit(subtopic);
  }

  // ─── Eliminar ────────────────────────────────────────────────
  onDeleteSubtopic(subtopic: ITopic): void {
    this.selectedSubtopicToDelete = subtopic;
    this.visibleModalConfirm = true;
  }

  onConfirmDeleteSubtopic(): void {
    if (!this.selectedSubtopicToDelete) return;
    this.deletedSubtopic.emit(this.selectedSubtopicToDelete);
    this.visibleModalConfirm = false;
    this.selectedSubtopicToDelete = null;
  }

  onCancelDeleteSubtopic(): void {
    this.visibleModalConfirm = false;
    this.selectedSubtopicToDelete = null;
  }
}
