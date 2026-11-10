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
import { TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import Editor from '@toast-ui/editor';

import { ITopic, ITopicCreatePayload } from '../../interfaces/topics.interfaces';
import { TopicService } from '../../services/topic.service';

// Ngx Markdown imports
import { MarkdownModule } from 'ngx-markdown';
@Component({
  selector: 'app-topic-content-component',
  imports: [TitleCasePipe, ButtonModule, MarkdownModule],
  templateUrl: './topic-content-component.html',
  styleUrl: './topic-content-component.css',
})
export class TopicContentComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  subtopic: ITopic | null = null;

  @ViewChild('editorHost')
  editorHost?: ElementRef<HTMLDivElement>;

  isEditing = false;

  private readonly topicService = inject(TopicService);
  private editor: Editor | null = null;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.scheduleInitEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['subtopic'] || !this.viewReady) return;
    // Espera a que @if pinte #editorHost al cambiar de subtopic.
    this.scheduleInitEditor();
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }

  onEdit(): void {
    this.isEditing = true;
  }

  onCancelEdit(): void {
    this.isEditing = false;
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
      previewStyle: 'tab',
      initialValue: this.subtopic.content ?? '',
      theme: 'dark',
      usageStatistics: false,
    });
  }

  private destroyEditor(): void {
    this.editor?.destroy();
    this.editor = null;
  }
}
