import { Component, inject, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { catchError, of, tap } from 'rxjs';

import { TopicDialogService } from '../../../topics/services/topic-dialog.service';
import { TopicService } from '../../../topics/services/topic.service';
import { CreateEditModal } from '../../../topics/components/create-edit-modal/create-edit-modal';
import { FormWorkspaceComponent } from '../../../workspaces/components/form-workspace-component/form-workspace-component';
import { WorkSpaceService } from '../../../workspaces/services/work-space.service';
import { ITopic } from '../../../../shared/interfaces/topics.interfaces';
import { IWorkspace, IWorkspaceCreateRequest } from '../../../../shared/interfaces/workspace.interface';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    ButtonModule,
    ToastModule,
    TitleCasePipe,
    FormWorkspaceComponent,
    CreateEditModal,
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  providers: [MessageService],
})
export class SidebarComponent implements OnInit {

  openListWorkspace = false;
  createNewWorkspaceModal = false;

  workspaces: IWorkspace[] = [];
  workspaceSelected: IWorkspace | null = null;
  topics: ITopic[] = [];

  private readonly topicDialogService = inject(TopicDialogService);
  private readonly workSpaceService = inject(WorkSpaceService);
  private readonly topicService = inject(TopicService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.getWorkspaces();
  }

  onOpenWorkspace(): void {
    this.openListWorkspace = !this.openListWorkspace;
  }

  onSelectWorkspace(workspace: IWorkspace): void {
    this.workspaceSelected = workspace;
    this.workSpaceService.currentWorkspace = workspace;
    this.openListWorkspace = false;
    this.getTopics(workspace.id);
  }

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

    this.workSpaceService.createWorkspace(value).pipe(
      tap((response) => {
        this.workSpaceService.currentWorkspace = response.data;
        this.workspaceSelected = response.data;
        this.createNewWorkspaceModal = false;
        this.showWorkspaceMessage(response.data.name);
      }),
      tap(() => this.getWorkspaces()),
      catchError((error) => {
        const apiMessage = error?.error?.message;
        const message = apiMessage === 'Workspace already exists for this user'
          ? 'El workspace ya existe para este usuario'
          : 'Ocurrió un error al crear el workspace';
        this.showError(message);
        return of(null);
      }),
    ).subscribe();
  }

  onCreateTopic(): void {
    this.topicDialogService.show('create', 'Crear nuevo topic');
  }

  onTopicCreated(): void {
    const workspaceId = this.workspaceSelected?.id;
    if (!workspaceId) {
      return;
    }
    this.getTopics(workspaceId);
  }

  private getWorkspaces(): void {
    this.workSpaceService.getWorkspaces().subscribe({
      next: (response) => {
        this.workspaces = response.data;
        const currentId = this.workSpaceService.currentWorkspace?.id;
        this.workspaceSelected = this.workspaces.find((workspace) => workspace.id === currentId)
          ?? this.workspaces[0]
          ?? null;
        this.workSpaceService.currentWorkspace = this.workspaceSelected;
        this.getTopics(this.workspaceSelected?.id ?? '');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private getTopics(workspaceId: string): void {
    console.log('getTopics', workspaceId);
    if (!workspaceId) {
      this.topics = [];
      return;
    }

    this.topicService.getAllTopics(workspaceId).subscribe({
      next: (response) => {
        this.topics = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private showWorkspaceMessage(name: string): void {
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
