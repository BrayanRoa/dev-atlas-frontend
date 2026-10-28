import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';

import { WorkSpaceService } from '../../../workspaces/services/work-space.service';
import { ITagPayload } from '../../interfaces/tag.interface';

interface ISelectWorkspace {
  label: string;
  value: string;
}

@Component({
  selector: 'app-create-edit-tag-component',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    IftaLabelModule,
    ButtonModule,
    CommonModule,
    SelectModule,
  ],
  templateUrl: './create-edit-tag-component.html',
  styleUrl: './create-edit-tag-component.css',
})
export class CreateEditTagComponent implements OnInit {

  /**
   * Clases completas a propósito. Tailwind no genera `bg-red-500`
   * si el nombre se arma en tiempo de ejecución.
   */
  colors = [
    { value: 'bg-red-500' },
    { value: 'bg-orange-500' },
    { value: 'bg-amber-400' },
    { value: 'bg-green-500' },
    { value: 'bg-teal-500' },
    { value: 'bg-blue-500' },
    { value: 'bg-purple-500' },
    { value: 'bg-gray-400' },
  ];

  workspaces: ISelectWorkspace[] = [];

  form!: FormGroup;

  private _visible = false;

  /** Al cerrarse se limpia el formulario. Si el nombre ya existe, la página no cierra y el texto se queda. */
  @Input()
  set visible(value: boolean) {
    this._visible = value;
    if (!value) {
      this.form?.reset();
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onCancelEvent = new EventEmitter<void>();
  @Output() onSubmitEvent = new EventEmitter<ITagPayload>();

  private readonly workSpaceService = inject(WorkSpaceService);

  ngOnInit(): void {
    this.buildForm();
    this.loadWorkspaces();
  }

  // Formulario

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      color: new FormControl('', [Validators.required]),
      workSpaceId: new FormControl('', [Validators.required]),
    });
  }

  /** Copia los workspaces que el sidebar ya cargó. Este modal no vuelve a pedirlos. */
  private loadWorkspaces(): void {
    this.workspaces = this.workSpaceService.workspaces.map((workspace) => ({
      label: workspace.name,
      value: workspace.id,
    }));
  }

  // Color

  onSelectColor(color: string): void {
    this.form.get('color')?.setValue(color);
  }

  isSelected(color: string): boolean {
    return this.form?.get('color')?.value === color;
  }

  // Guardar y cerrar

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { name, color, workSpaceId } = this.form.value;
    this.onSubmitEvent.emit({ name, color, workSpaceId });
  }

  onCancel(): void {
    this.visibleChange.emit(false);
    this.onCancelEvent.emit();
  }
}
