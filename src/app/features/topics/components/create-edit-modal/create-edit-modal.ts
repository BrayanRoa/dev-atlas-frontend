import { Component, EventEmitter, inject, Output } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { WorkSpaceService } from '../../../workspaces/services/work-space.service';
import { TopicService } from '../../services/topic.service';
import { ITopicCreatePayload } from '../../interfaces/topics.interfaces';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface IIcon {
  name: string;
  icon: string;
}

interface ITag {
  name: string;
  color: string;
}

@Component({
  selector: 'app-create-edit-modal',
  imports: [
    DialogModule, 
    SelectModule, 
    InputTextModule, 
    IftaLabelModule, 
    ReactiveFormsModule, 
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './create-edit-modal.html',
  styleUrl: './create-edit-modal.css',
  providers: [MessageService],
})
export class CreateEditModal {
  
  // Servicios
  readonly topicDialogService = inject(TopicDialogService);
  readonly workSpaceService = inject(WorkSpaceService);
  readonly topicService = inject(TopicService);
  readonly messageService = inject(MessageService);

  @Output() created = new EventEmitter<void>();

  // Variables de estado
  icons: IIcon[] = [];
  tags: ITag[] = [];

  // Formulario
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm()

    this.icons = [
      { name: 'Angular', icon: 'angular.png' },
      { name: 'AWS', icon: 'aws.png' },
      { name: 'MySql', icon: 'mysql.png' },
      { name: 'Nest', icon: 'nest.png' },
      { name: 'Postgres', icon: 'postgres.png' },
      { name: 'Typescript', icon: 'typescript.png' },
    ];

    this.tags = [
      { name: 'Tag 1', color: 'primary' },
      { name: 'Tag 2', color: 'secondary' },
      { name: 'Tag 3', color: 'success' },
      { name: 'Tag 4', color: 'info' },
      { name: 'Tag 5', color: 'warning' },
      { name: 'Tag 6', color: 'danger' },
    ];
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      icon: new FormControl<IIcon | null>(null, [Validators.required]),
      tags: new FormControl<ITag | null>(null, [Validators.required]),
    })
  }

  /**
   * Envía el formulario para crear un nuevo topic
   */
  onSubmit(): void {
    const workSpaceId = this.workSpaceService.currentWorkspace?.id;
    const icon = this.form.value.icon as IIcon | null;

    if (this.form.invalid || !workSpaceId || !icon) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos requeridos',
      });
      return;
    }

    const topic: ITopicCreatePayload = {
      title: this.form.value.name,
      description: this.form.value.description,
      icon: icon.icon,
      content: '',
      parentId: null,
      workSpaceId,
    };

    this.topicService.createTopic(topic).subscribe({
      next: (response) => {
        this.createTopicMessage(response.data.title);
        this.created.emit();
        this.closeDialog();
      },
      error: (error) => {
        this.createTopicErrorMessage(error?.error?.message);
      }
    });
  }

  onCancel(): void {
    this.closeDialog();
  }

  onDialogVisibleChange(open: boolean): void {
    if (!open) {
      this.closeDialog();
    }
  }

  private closeDialog(): void {
    this.form?.reset();
    this.topicDialogService.close();
  }

  createTopicMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Topic creado',
      detail: `El topic ${message} ha sido creado correctamente`,
    });
  }

  createTopicErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message === 'Topic with this title already exists' ? 'El topic ya existe para este workspace' : 'Ocurrió un error al crear el topic',
    });
  }
}
