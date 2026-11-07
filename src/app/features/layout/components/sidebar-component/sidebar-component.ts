import { Component, effect, inject, OnInit } from '@angular/core';
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
import { ITopicListItem } from '../../../topics/interfaces/topics.interfaces';
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
  topics: ITopicListItem[] = [];
  topicSelected: ITopicListItem | null = null;

  private readonly topicDialogService = inject(TopicDialogService);
  private readonly workSpaceService = inject(WorkSpaceService);
  private readonly topicService = inject(TopicService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.topicService.topicRemoved() === 0) return;
      this.loadWorkspaces();
    });
  }

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
    this.applyTopicsFromWorkspace(workspace);
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

  onSelectTopic(topic: ITopicListItem): void {
    this.applyTopic(topic);
  }

  /** Tras crear, vuelve a pedir workspaces: ahí vienen los topics raíz del sidebar. */
  onTopicCreated(): void {
    this.loadWorkspaces();
  }

  // Carga de workspaces

  private loadWorkspaces(): void {
    this.workSpaceService.getWorkspaces().subscribe({
      next: (response) => {
        this.workSpaceService.workspaces = response.data;
        this.onWorkspacesLoaded(response.data);
      },
      error: (error) => console.error(error),
    });
  }

  private onWorkspacesLoaded(workspaces: IWorkspace[]): void {
    this.workspaces = workspaces;
    const workspace = this.resolveSelectedWorkspace(workspaces);
    this.applyWorkspace(workspace);
    this.applyTopicsFromWorkspace(workspace);
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

  // Topics desde el workspace ya cargado

  private applyTopicsFromWorkspace(workspace: IWorkspace | null): void {
    const topics = (workspace?.topics ?? []).map((topic) => ({
      id: topic.id,
      title: topic.title,
    }));
    this.onTopicsLoaded(topics);
  }

  private onTopicsLoaded(topics: ITopicListItem[]): void {
    if (!topics.length) {
      this.topics = [];
      this.applyTopic(null);
      this.router.navigate(['/dashboard/topic/empty']);
      return;
    }

    this.topics = topics;

    const selectedStillExists = topics.some(
      (topic) => topic.id === this.topicSelected?.id,
    );
    const topicToSelect = selectedStillExists
      ? this.topicSelected
      : topics[0];

    this.applyTopic(topicToSelect ?? null);
    this.router.navigate(['/dashboard/topic', this.topicSelected?.id ?? '']);
  }

  private applyTopic(topic: ITopicListItem | null): void {
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
