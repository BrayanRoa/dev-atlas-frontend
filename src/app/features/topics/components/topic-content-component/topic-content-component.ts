import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import Editor from '@toast-ui/editor';

import { ITopic, ITopicCreatePayload } from '../../interfaces/topics.interfaces';
import { TopicService } from '../../services/topic.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Ngx Markdown imports
import { MarkdownModule } from 'ngx-markdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
type ImportMode = 'replace' | 'append';

@Component({
  selector: 'app-topic-content-component',
  imports: [ButtonModule, MarkdownModule, ConfirmDialogModule, ToastModule, TooltipModule
  ],
  templateUrl: './topic-content-component.html',
  styleUrl: './topic-content-component.css',
  providers: [ConfirmationService, MessageService],
})
export class TopicContentComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input()
  subtopic: ITopic | null = null;

  @Output()
  contentSaved = new EventEmitter<ITopic>();

  @ViewChild('editorHost')
  editorHost?: ElementRef<HTMLDivElement>;

  isEditing = false;
  backupContent = '';

  private readonly topicService = inject(TopicService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  private editor: Editor | null = null;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.scheduleInitEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['subtopic'] || !this.viewReady) return;
    this.changeTopic();
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }

  private changeTopic() {
    this.destroyEditor();
    this.isEditing = false;
    this.scheduleInitEditor();
  }

  onEdit(): void {
    this.isEditing = true;
    this.setBackupContent();
    this.scheduleInitEditor();
  }

  onCancelEdit(): void {
    this.destroyEditor();
    this.isEditing = false;
    if (this.subtopic) {
      this.subtopic.content = this.backupContent;
    }
  }

  onSave(): void {
    if (!this.subtopic || !this.editor) return;

    const payload: ITopicCreatePayload = {
      title: this.subtopic.title,
      description: this.subtopic.description,
      icon: this.subtopic.icon,
      content: this.editor.getMarkdown(),
      parentId: this.subtopic.parentId,
      workSpaceId: this.subtopic.workSpaceId,
      tags: this.subtopic.topicTags.map((item) => item.tagId),
    };

    this.topicService.updateTopic(payload, this.subtopic.id).subscribe({
      next: (response) => {
        this.subtopic = response.data;
        this.isEditing = false;
        this.setBackupContent();
        this.destroyEditor();
        this.contentSaved.emit(response.data);
        this.messageService.add({
          severity: 'success',
          summary: 'Topic Actualizado',
          detail: 'Topic actualizado correctamente',
          life: 3000,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar el topic',
        });
      },
    });
  }

  getIconPath(icon: string): string {
    if (icon === 'default-topic.png') {
      return 'assets/images/default-topic.png';
    }
    return `assets/images/${icon}`;
  }

  private scheduleInitEditor(): void {
    setTimeout(() => this.initEditor());
  }

  private initEditor(): void {
    this.destroyEditor();

    if (!this.subtopic || !this.editorHost?.nativeElement) return;

    this.editor = new Editor({
      el: this.editorHost.nativeElement,
      height: '100%',
      initialEditType: 'markdown',
      previewStyle: 'tab', // 'vertical' | 'tab'
      initialValue: this.subtopic.content ?? '',
      theme: 'dark',
      usageStatistics: false,
    });
  }

  private destroyEditor(): void {
    this.editor?.destroy();
    this.editor = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imported = String(reader.result ?? '');
      const current = this.getCurrentMarkdown();

      if (!current.trim()) {
        this.applyImportedMarkdown(imported, 'replace');
      } else {
        this.askImportMode(imported);
      }

      input.value = '';
    };
    reader.readAsText(file);
  }

  private askImportMode(imported: string): void {
    this.confirmationService.confirm({
      message: '¿Quieres reemplazar el contenido actual o añadir el archivo al final?',
      header: 'Cargar archivo Markdown',
      icon: 'pi pi-file',
      // Sin cerrar con X/Escape: en ConfirmDialog eso dispara reject y añadiría sin querer.
      closable: false,
      closeOnEscape: false,
      acceptButtonProps: {
        label: 'Reemplazar',
      },
      rejectButtonProps: {
        label: 'Añadir al final',
        severity: 'secondary',
        outlined: true,
      },
      accept: () => this.applyImportedMarkdown(imported, 'replace'),
      reject: () => this.applyImportedMarkdown(imported, 'append'),
    });
  }

  private applyImportedMarkdown(imported: string, mode: ImportMode): void {
    this.setBackupContent();

    const current = this.getCurrentMarkdown();
    const next =
      mode === 'append' && current.trim()
        ? `${current.trimEnd()}\n\n${imported}`
        : imported;

    if (this.editor) {
      this.editor.setMarkdown(next);
      return;
    }

    if (this.subtopic) {
      this.subtopic.content = next;
    }
    this.isEditing = true;
    this.scheduleInitEditor();
  }

  private getCurrentMarkdown(): string {
    if (this.editor) {
      return this.editor.getMarkdown();
    }
    return this.subtopic?.content ?? '';
  }

  private setBackupContent(): void {
    this.backupContent = this.getCurrentMarkdown();
  }
}
