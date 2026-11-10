import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import Editor from '@toast-ui/editor';

import { ITopic, ITopicCreatePayload } from '../../interfaces/topics.interfaces';
import { TopicService } from '../../services/topic.service';

import { FileUploadModule } from 'primeng/fileupload';

// Ngx Markdown imports
import { MarkdownModule } from 'ngx-markdown';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-topic-content-component',
  imports: [ButtonModule, MarkdownModule, FileUploadModule],
  templateUrl: './topic-content-component.html',
  styleUrl: './topic-content-component.css',
  providers: [MessageService],
})
export class TopicContentComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input()
  subtopic: ITopic | null = null;

  @ViewChild('editorHost')
  editorHost?: ElementRef<HTMLDivElement>;

  isEditing = false;
  backupContent:string = '';

  private readonly topicService = inject(TopicService);
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

  private changeTopic(){
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
        // destroy editor
        this.destroyEditor();
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
    this.setBackupContent();
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = (e.target?.result as string) ?? '';
    
      if (this.editor) {
        this.editor.setMarkdown(content); // ya estaba editando
        return;
      }
    
      if (this.subtopic) this.subtopic.content = content;
      this.isEditing = true;
      this.scheduleInitEditor(); // primera vez: crear editor
    };
    reader.readAsText(file);
  }

  private setBackupContent(): void {
    if (this.editor) {
      this.backupContent = this.editor.getMarkdown();
    } else if (this.subtopic) {
      this.backupContent = this.subtopic.content ?? '';
    }
  }
}
