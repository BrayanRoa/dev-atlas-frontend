import { computed, Injectable, signal } from '@angular/core';
import { ITopic } from '../interfaces/topics.interfaces';

export type TopicDialogAction = 'create' | 'edit';

@Injectable({
  providedIn: 'root',
})
export class TopicDialogService {

  private state = signal<{
    open: boolean;
    title: string;
    action: TopicDialogAction;
    topic: ITopic | null;
    parentTopicId: string | null;
  }>({
    open: false,
    title: '',
    action: 'create',
    topic: null,
    parentTopicId: null,
  });

  readonly open = computed(() => this.state().open);
  readonly action = computed(() => this.state().action);
  readonly title = computed(() => this.state().title);
  readonly topic = computed(() => this.state().topic);
  readonly parentTopicId = computed(() => this.state().parentTopicId);

  /**
   * Abre el modal.
   * parentTopicId solo aplica al create de un subtopic; en create raíz o edit va null.
   */
  show(
    action: TopicDialogAction,
    title: string,
    topic: ITopic | null = null,
    parentTopicId: string | null = null,
  ): void {
    this.state.set({
      open: true,
      title,
      action,
      topic,
      parentTopicId,
    });
  }

  /**
   * Cierra el modal
   */
  close(): void {
    this.state.set({
      open: false,
      title: '',
      action: 'create',
      topic: null,
      parentTopicId: null,
    });
  }
}
