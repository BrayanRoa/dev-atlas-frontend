import { Component, computed, inject, Input } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface Icon {
  name: string;
  icon: string;
}

interface Tag {
  name: string;
  color: string;
}

@Component({
  selector: 'app-create-edit-modal',
  imports: [DialogModule, SelectModule, FormsModule],
  templateUrl: './create-edit-modal.html',
  styleUrl: './create-edit-modal.css',
})
export class CreateEditModal {
  readonly topicDialogService = inject(TopicDialogService);

  icons: Icon[] | undefined;
  selectedIcon: Icon | undefined;

  tags: Tag[] | undefined;
  selectedTags: Tag[] | undefined;

  ngOnInit() {
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
}
