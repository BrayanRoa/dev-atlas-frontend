import { Component, inject, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { catchError, of, tap } from 'rxjs';

import { TopicDialogService } from '../../../topics/services/topic-dialog.service';
import { TopicService } from '../../../topics/services/topic.service';
import { CreateEditModal } from '../../../topics/components/create-edit-modal/create-edit-modal';
import { FormWorkspaceComponent } from '../../../workspaces/components/form-workspace-component/form-workspace-component';
import { WorkSpaceService } from '../../../workspaces/services/work-space.service';
import { ITopic } from '../../../topics/interfaces/topics.interfaces';
import { IWorkspace, IWorkspaceCreateRequest } from '../../../workspaces/interfaces/workspace.interface';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    ButtonModule,
    ToastModule,
    TitleCasePipe,
    FormWorkspaceComponent,
    CreateEditModal,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  providers: [MessageService],
})
export class SidebarComponent implements OnInit {

  // Menú y diálogos
  openListWorkspace = false;
  createNewWorkspaceModal = false;

  // Datos que pinta la plantilla
  workspaces: IWorkspace[] = [];
  workspaceSelected: IWorkspace | null = null;
  topics: ITopic[] = [];
  topicSelected: ITopic | null = null;

  private readonly topicDialogService = inject(TopicDialogService);
  private readonly workSpaceService = inject(WorkSpaceService);
  private readonly topicService = inject(TopicService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loadWorkspaces();
  }

  /** Abre la página de tags del workspace. El botón de crear un tag vive ahí. */
  onOpenTags(): void {
    this.router.navigate(['/dashboard/tags']);
  }

  // Workspaces: abrir la lista y elegir uno

  onOpenWorkspace(): void {
    this.openListWorkspace = !this.openListWorkspace;
  }

  onSelectWorkspace(workspace: IWorkspace): void {
    this.applyWorkspace(workspace);
    this.openListWorkspace = false;
    this.loadTopics(workspace.id);
  }

  // Workspaces: crear uno nuevo

  onOpenCreateNewWorkspaceModal(): void {
    this.createNewWorkspaceModal = true;
    this.openListWorkspace = false;
  }

  onCloseCreateNewWorkspaceModal(): void {
    this.createNewWorkspaceModal = false;
  }

  onSubmitCreateNewWorkspaceModal(value: IWorkspaceCreateRequest): void {
    if (value.name === '') {
      return;
    }

    this.createWorkspace(value);
  }

  private createWorkspace(request: IWorkspaceCreateRequest): void {
    this.workSpaceService.createWorkspace(request).pipe(
      tap((response) => this.onWorkspaceCreated(response.data)),
      catchError((error) => {
        this.showError(this.workspaceErrorMessage(error));
        return of(null);
      }),
    ).subscribe();
  }

  /** Deja el nuevo workspace seleccionado antes de recargar, para que la lista no vuelva al primero. */
  private onWorkspaceCreated(workspace: IWorkspace): void {
    this.applyWorkspace(workspace);
    this.createNewWorkspaceModal = false;
    this.showWorkspaceCreated(workspace.name);
    this.loadWorkspaces();
  }

  private workspaceErrorMessage(error: { error?: { message?: string } }): string {
    if (error?.error?.message === 'Workspace already exists for this user') {
      return 'El workspace ya existe para este usuario';
    }

    return 'Ocurrió un error al crear el workspace';
  }

  // Topics: abrir el diálogo, elegir uno y recargar al crearlo

  onCreateTopic(): void {
    this.topicDialogService.show('create', 'Crear nuevo topic');
  }

  onSelectTopic(topic: ITopic): void {
    this.applyTopic(topic);
  }

  /** El modal vive en este componente, así que el evento llega directo y se puede volver a pedir la lista. */
  onTopicCreated(): void {
    const workspaceId = this.workspaceSelected?.id;
    if (!workspaceId) {
      return;
    }

    this.loadTopics(workspaceId);
  }

  // Carga de workspaces

  private loadWorkspaces(): void {
    this.workSpaceService.getWorkspaces().subscribe({
      next: (response) => {
        this.onWorkspacesLoaded(response.data);
        this.workSpaceService.workspaces = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  private onWorkspacesLoaded(workspaces: IWorkspace[]): void {
    this.workspaces = workspaces;
    this.applyWorkspace(this.resolveSelectedWorkspace(workspaces));
    this.loadTopics(this.workspaceSelected?.id ?? '');
  }

  /** Conserva el workspace actual si sigue en la lista. Si no, toma el primero. */
  private resolveSelectedWorkspace(workspaces: IWorkspace[]): IWorkspace | null {
    const currentId = this.workSpaceService.currentWorkspace?.id;

    return workspaces.find((workspace) => workspace.id === currentId)
      ?? workspaces[0]
      ?? null;
  }

  private applyWorkspace(workspace: IWorkspace | null): void {
    this.workspaceSelected = workspace;
    this.workSpaceService.currentWorkspace = workspace;
  }

  // Carga de topics

  private loadTopics(workspaceId: string): void {
    if (!workspaceId) {
      this.topics = [];
      return;
    }

    this.topicService.getAllTopics(workspaceId).subscribe({
      next: (response) => this.onTopicsLoaded(response.data),
      error: (error) => console.error(error),
    });
  }

  private onTopicsLoaded(topics: ITopic[]): void {
    this.topics = topics;
    this.applyTopic(topics[0] ?? null);
    this.router.navigate(['/dashboard/topic', this.topicSelected?.id ?? '']);
  }

  private applyTopic(topic: ITopic | null): void {
    this.topicSelected = topic;
    this.topicService.currentTopic = topic;
  }

  // Avisos

  private showWorkspaceCreated(name: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Workspace creado',
      detail: `El workspace ${name} ha sido creado correctamente`,
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}

