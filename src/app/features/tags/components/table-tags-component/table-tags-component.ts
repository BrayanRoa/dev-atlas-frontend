import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IWorkspace } from '../../../workspaces/interfaces/workspace.interface';
import { ITag } from '../../interfaces/tag.interface';
import { ButtonModule } from 'primeng/button';

export interface ITableTags extends ITag  {
  workspace: string
}


@Component({
  selector: 'app-table-tags-component',
  imports: [TableModule, ButtonModule],
  templateUrl: './table-tags-component.html',
  styleUrl: './table-tags-component.css',
})
export class TableTagsComponent implements OnChanges {

  @Output() 
  onEditTagEvent = new EventEmitter<ITag>();

  @Output() 
  onDeleteTagEvent = new EventEmitter<ITag>();

  @Input() workspaces!: IWorkspace[];

  tableTags: ITableTags[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workspaces']) {
      this.buildTableTags();
    }
  }

  private buildTableTags(): void {
    this.tableTags = [];
    for (const workspace of this.workspaces) {
      for (const tag of workspace.tags ?? []) {
        this.tableTags.push({
          workspace: workspace.name,
          ...tag,
        });
      }
    }
  }

  onEditTag(tag: ITag): void {
    this.onEditTagEvent.emit(tag);
  }

  onDeleteTag(tag: ITag): void {
    this.onDeleteTagEvent.emit(tag);
  }
}
