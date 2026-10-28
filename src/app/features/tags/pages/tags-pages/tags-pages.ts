import { Component, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { CreateEditTagComponent } from '../../components/create-edit-tag-component/create-edit-tag-component';
import { TagsService } from '../../services/tags.service';
import { ITagPayload } from '../../interfaces/tag.interface';
import { WorkSpaceService } from '../../../workspaces/services/work-space.service';
import { IWorkspace } from '../../../workspaces/interfaces/workspace.interface';

@Component({
  selector: 'app-tags-pages',
  imports: [
    ButtonModule,
    CreateEditTagComponent,
    CommonModule,
    TitleCasePipe,
    ToastModule,
  ],
  templateUrl: './tags-pages.html',
  styleUrl: './tags-pages.css',
  providers: [MessageService],
})
export class TagsPages {

  private readonly workSpaceService = inject(WorkSpaceService);
  private readonly tagsService = inject(TagsService);
  private readonly messageService = inject(MessageService);

  visibleModal = false;

  // Modal

  openModal(): void {
    this.visibleModal = true;
  }

  closeModal(): void {
    this.visibleModal = false;
  }

  // Lista
  // Esta página no guarda su propia lista: pinta la del servicio.
  // GET /workspaces ya incluye los tags de cada uno.

  allWorkspacesWithTags(): IWorkspace[] {
    return this.workSpaceService.workspaces;
  }

  /**
   * Después de crear, vuelve a pedir los workspaces para que el tag
   * aparezca en su grupo. No pasa por el sidebar: ese método también recarga topics.
   */
  loadWorkspacesWithTags(): void {
    this.workSpaceService.getWorkspaces().subscribe({
      next: (response) => {
        this.workSpaceService.workspaces = response.data;
      },
      error: (error) => this.loadWorkspacesWithTagsError(error),
    });
  }

  private loadWorkspacesWithTagsError(error: { status?: number; error?: { message?: string } }): void {
    this.showErrorToast('Error', 'Error al cargar los workspaces con tags');
  }

  // Crear

  onCreateTag(payload: ITagPayload): void {
    this.tagsService.createTag(payload).subscribe({
      next: () => {
        this.visibleModal = false;
        this.showSuccessToast('Tag creado correctamente', 'El tag ha sido creado correctamente');
        this.loadWorkspacesWithTags();
      },
      error: (error) => this.onCreateTagError(error),
    });
  }

  /** El nombre repetido deja el modal abierto y no vuelve a pedir los workspaces. */
  private onCreateTagError(error: { status?: number; error?: { message?: string } }): void {
    if (error.status === 400 && error.error?.message === 'Tag already exists') {
      this.showErrorToast('Error', 'El tag ya existe para este workspace');
      return;
    }

    this.showErrorToast('Error', 'Error al crear el tag');
  }

  // Avisos

  private showSuccessToast(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
    });
  }

  private showErrorToast(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
    });
  }
}
