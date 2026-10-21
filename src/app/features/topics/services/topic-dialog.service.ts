import { computed, Injectable, signal } from '@angular/core';

export type TopicDialogAction = 'create' | 'edit';

@Injectable({
  providedIn: 'root',
})
export class TopicDialogService {

  private state = signal<{
    open:boolean, 
    title:string,
    action:TopicDialogAction
  }>({
    open:false, 
    title:'',
    action:'create'
  });
  

  readonly open = computed(() => this.state().open);
  readonly action = computed(() => this.state().action);
  readonly title = computed(() => this.state().title);
  
  /**
   * Abre el modal 
   * @param action - The action to perform
   */
  show(action:TopicDialogAction, title:string){
    this.state.set({
      open:true,
      title,
      action
    });
  }

  /**
   * Cierra el modal
   */
  close(){
    this.state.set({
      open:false,
      title:'',
      action:'create'
    });
  }
}
