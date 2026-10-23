import { Component, inject } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { TopicDialogService } from '../../services/topic-dialog.service';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

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
  imports: [
    DialogModule, 
    SelectModule, 
    InputTextModule, 
    IftaLabelModule, 
    ReactiveFormsModule, 
    ButtonModule,
  ],
  templateUrl: './create-edit-modal.html',
  styleUrl: './create-edit-modal.css',
})
export class CreateEditModal {
  readonly topicDialogService = inject(TopicDialogService);

  icons: Icon[] = [];
  tags: Tag[] = [];

  form!: FormGroup;

  ngOnInit() {
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
      icon: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    })
  }

  onSubmit(): void {
    console.log("onSubmit");
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

  onCancel(): void {
    this.topicDialogService.close();
  }
}
