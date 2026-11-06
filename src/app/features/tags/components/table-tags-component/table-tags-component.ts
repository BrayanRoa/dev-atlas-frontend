import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IWorkspace } from '../../../workspaces/interfaces/workspace.interface';
import { ITag } from '../../interfaces/tag.interface';
import { ButtonModule } from 'primeng/button';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm-component/modal-confirm-component';
import { IModalConfirmation } from '../../../../shared/interfaces/modal-confirmation.interface';

export interface ITableTags extends ITag  {
  workspace: string
}


@Component({
  selector: 'app-table-tags-component',
  imports: [TableModule, ButtonModule, ModalConfirmComponent],
  templateUrl: './table-tags-component.html',
  styleUrl: './table-tags-component.css',
})
export class TableTagsComponent implements OnChanges {

  visibleModalConfirmation = false;

  tagToDelete: ITag | null = null;

  @Output() 
  onEditTagEvent = new EventEmitter<ITag>();

  @Output() 
  onDeleteTagEvent = new EventEmitter<ITag>();

  modalConfirmationConfig: IModalConfirmation = {
    title: 'Eliminar etiqueta',
    message: 'Esta acción no puede ser deshecha.',
    icon: 'pi pi-trash',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  };

  @Input() workspaces!: IWorkspace[];

  tableTags: ITableTags[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workspaces']) {
      this.buildTableTags();
    }
  }

  private buildTableTags(): void {
    this.tableTags = [];
    for (const workspace of this.workspaces) {
      for (const tag of workspace.tags ?? []) {
        this.tableTags.push({
          workspace: workspace.name,
          ...tag,
        });
      }
    }
  }

  onEditTag(tag: ITag): void {
    this.onEditTagEvent.emit(tag);
  }

  onDeleteTag(tag: ITag): void {
    this.visibleModalConfirmation = true;
    this.tagToDelete = tag;
  }

  onConfirm(): void {
    if (this.tagToDelete) {
      this.onDeleteTagEvent.emit(this.tagToDelete);
      this.tagToDelete = null;
    }
    this.visibleModalConfirmation = false;
  }

  onCancel(): void {
    this.visibleModalConfirmation = false;
  }
}
