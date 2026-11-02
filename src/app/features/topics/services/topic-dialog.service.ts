import { computed, Injectable, signal } from '@angular/core';
import { ITopic } from '../interfaces/topics.interfaces';

export type TopicDialogAction = 'create' | 'edit';

@Injectable({
  providedIn: 'root',
})
export class TopicDialogService {

  private state = signal<{
    open:boolean, 
    title:string,
    action:TopicDialogAction,
    topic:ITopic | null
  }>({
    open:false, 
    title:'',
    action:'create',
    topic:null
  });
  

  readonly open = computed(() => this.state().open);
  readonly action = computed(() => this.state().action);
  readonly title = computed(() => this.state().title);
  readonly topic = computed(() => this.state().topic);
  
  /**
   * Abre el modal 
   * @param action - The action to perform
   */
  show(action:TopicDialogAction, title:string, topic:ITopic | null = null){
    this.state.set({
      open:true,
      title,
      action,
      topic
    });
  }

  /**
   * Cierra el modal
   */
  close(){
    this.state.set({
      open:false,
      title:'',
      action:'create',
      topic:null
    });
  }
}
