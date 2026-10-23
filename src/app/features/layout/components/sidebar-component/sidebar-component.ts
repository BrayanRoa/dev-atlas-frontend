import { Component, inject, OnInit } from '@angular/core';
import { TopicDialogService } from '../../../topics/services/topic-dialog.service';
import { ButtonModule } from 'primeng/button';
import { FormWorkspaceComponent } from '../../../workspaces/components/form-workspace-component/form-workspace-component';
import { WorkSpaceService } from '../../../workspaces/services/work-space.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IWorkspace, IWorkspaceCreateRequest } from '../../../workspaces/interfaces/workspace.interface';
import { catchError, of, tap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    ButtonModule,
    FormWorkspaceComponent,
    ToastModule,
    TitleCasePipe
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  providers: [MessageService],
})
export class SidebarComponent implements OnInit{
  
  // Variables de estado
  openListWorkspace: boolean = false;
  createNewWorkspaceModal: boolean = false;

  // Servicios
  private readonly topicDialogService = inject(TopicDialogService);
  private readonly workSpaceService = inject(WorkSpaceService);
  private readonly messageService = inject(MessageService);

  // Variables de respuesta
  workspaces: IWorkspace[] = [];
  workspaceSelected: IWorkspace | null = null;
  

  ngOnInit(): void {
    this.getWorkspaces();
  }
  /**
   * Abre el modal para crear un nuevo topic
   */
  onCreateTopic(): void {
    this.topicDialogService.show('create', 'Crear nuevo topic');
  }

  /**
   * Abre el modal para crear un nuevo workspace
   */
  onOpenWorkspace(): void {
    this.openListWorkspace = !this.openListWorkspace;
  }

  /**
   * Abre el modal para crear un nuevo workspace
   */
  onOpenCreateNewWorkspaceModal(): void {
    this.createNewWorkspaceModal = true;
    this.openListWorkspace = false;
  }

  /**
   * Cierra el modal para crear un nuevo workspace
   */
  onCloseCreateNewWorkspaceModal(): void {
    this.createNewWorkspaceModal = false;
  }

  /**
   * Obtiene la lista de workspaces
   */
  getWorkspaces(): void {
    this.workSpaceService.getWorkspaces().subscribe({
      next: (response) => {
        this.workspaces = response.data;
        const currentId = this.workSpaceService.currentWorkspace?.id;
        this.workspaceSelected = this.workspaces.find((workspace) => workspace.id === currentId)
          ?? this.workspaces[0]
          ?? null;
        this.workSpaceService.currentWorkspace = this.workspaceSelected;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  /**
   * Cierra el modal para crear un nuevo workspace
   */
  onSubmitCreateNewWorkspaceModal(value: IWorkspaceCreateRequest): void {
    if (value.name === '') {
      return;
    }

    this.workSpaceService.createWorkspace(value).pipe(
      tap((response) => {
        this.workSpaceService.currentWorkspace = response.data;
        this.workspaceSelected = response.data;
        this.createWorkSpaceMessage(response.data.name);
        this.createNewWorkspaceModal = false;
      }),
      tap(() => {
        this.getWorkspaces();
      }),
      catchError((error) => {
        const apiMessage = error?.error?.message;
        const message = apiMessage === 'Workspace already exists for this user'
          ? 'El workspace ya existe para este usuario'
          : 'Ocurrió un error al crear el workspace';
        this.createWorkSpaceErrorMessage(message);
        return of(null);
      }),
    ).subscribe()
  }

  /**
   * Muestra un mensaje de éxito al crear un workspace
   * @param message - El nombre del workspace creado
   */
  createWorkSpaceMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Workspace creado',
      detail: `El workspace ${message} ha sido creado correctamente`,
    });
  }

  /**
   * Muestra un mensaje de error al crear un workspace
   * @param message - El nombre del workspace creado
   */
  createWorkSpaceErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  /**
   * Selecciona un workspace
   * @param workspace - El workspace seleccionado
   */
  onSelectWorkspace(workspace: IWorkspace): void {
    this.workspaceSelected = workspace;
    this.workSpaceService.currentWorkspace = workspace;
    this.openListWorkspace = false;
  }
}
