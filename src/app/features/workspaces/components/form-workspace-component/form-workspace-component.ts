import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form-workspace-component',
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    IftaLabelModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './form-workspace-component.html',
  styleUrl: './form-workspace-component.css',
})
export class FormWorkspaceComponent implements OnInit{

  form!: FormGroup;

  @Input() visible: boolean = false;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onCancelEvent = new EventEmitter<void>();
  @Output() onSubmitEvent = new EventEmitter<{ name: string }>();
  
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Construye el formulario
   */
  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  /**
   * Abre el formulario
   */
  onOpenWorkspace() {
    this.visible = true;
  }

  /**
   * Cancela el formulario
   */
  onCancel() {
    this.visibleChange.emit(false);
    this.onCancelEvent.emit();
  }

  /**
   * Envía el formulario
   */
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.onSubmitEvent.emit(this.form.value);
    this.clearForm();
  }

  /**
   * Limpia el formulario
   */
  private clearForm(): void {
    this.form.reset();
  }
}
