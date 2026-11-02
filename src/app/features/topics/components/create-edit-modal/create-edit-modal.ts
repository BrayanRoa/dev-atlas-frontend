import { NgClass } from '@angular/common';
import { Component, effect, EventEmitter, inject, Output } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { WorkSpaceService } from '../../../workspaces/services/work-space.service';
import { TopicService } from '../../services/topic.service';
import { ITopicCreatePayload } from '../../interfaces/topics.interfaces';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagsService } from '../../../tags/services/tags.service';
import { ITag } from '../../../tags/interfaces/tag.interface';

interface IIcon {
  name: string;
  icon: string;
}

interface ISelectTag {
  label: string;
  value: string;
  color: string;
}

@Component({
  selector: 'app-create-edit-modal',
  imports: [
    NgClass,
    DialogModule, 
    SelectModule,
    MultiSelectModule, 
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
  readonly tagsService = inject(TagsService);

  @Output() created = new EventEmitter<void>();

  // Variables de estado
  icons: IIcon[] = [];
  tags: ISelectTag[] = [];

  // Formulario
  form!: FormGroup;

  action: 'Crear' | 'Actualizar' = 'Crear';

  constructor(){
    effect(() => {
      if (!this.topicDialogService.open()) return;

      this.loadTags();

      if (this.topicDialogService.action() !== 'edit' || !this.form) return;
      this.action = 'Actualizar';
      const topic = this.topicDialogService.topic();
      const icon = this.icons.find((item) => item.icon === topic?.icon) ?? null;

      this.form.patchValue({
        name: topic?.title,
        description: topic?.description,
        icon,
        tags: topic?.topicTags.map((item) => item.tagId) ?? [],
      });
    });
  }

  /**
   * Inicializa el formulario
   */
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
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      icon: new FormControl<IIcon | null>(null, [Validators.required]),
      tags: new FormControl<string[] | null>([], [Validators.required]),
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
      tags: this.form.value.tags ?? []
    };

    if (this.action === 'Actualizar') {
      this.updateRequest(topic);
    }else{
      this.createRequest(topic);
    }

  }

  /**
   * Realiza la solicitud de creación de un topic
   * @param topic - El topic a crear
   */
  createRequest(topic: ITopicCreatePayload): void {
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

  /**
   * Realiza la solicitud de actualización de un topic
   * @param topic - El topic a actualizar
   */
  updateRequest(topic: ITopicCreatePayload): void {
    this.topicService.updateTopic(topic, this.topicDialogService.topic()?.id ?? '').subscribe({
      next: (response) => {
        this.updateTopicMessage(response.data.title);
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

  updateTopicMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Topic actualizado',
      detail: `El topic ${message} ha sido actualizado correctamente`,
    });
  }

  createTopicErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message === 'Topic with this title already exists' ? 'El topic ya existe para este workspace' : 'Ocurrió un error al crear el topic',
    });
  }

  loadTags(): void {
    const workSpaceId = this.workSpaceService.currentWorkspace?.id ?? '';
    if (!workSpaceId) {
      console.error("No se encontró el workspace");
      return;
    }
    this.tagsService.getTags(workSpaceId).subscribe({
      next: (response) => {
        console.log("response.data", response.data);
        this.tags = response.data.map((tag: ITag)=>({
          label: tag.name,
          value: tag.id,
          color: tag.color,
        }));
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
