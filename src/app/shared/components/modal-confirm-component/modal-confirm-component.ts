import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';


import { DialogModule } from 'primeng/dialog';
import { IModalConfirmation } from '../../interfaces/modal-confirmation.interface';

@Component({
  selector: 'app-modal-confirm-component',
  imports: [DialogModule, ButtonModule],
  templateUrl: './modal-confirm-component.html',
  styleUrl: './modal-confirm-component.css',
})
export class ModalConfirmComponent {

  @Input() visible = false;

  @Input() config: IModalConfirmation | null = null;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.visible = false;
  }

  onCancel() {
    this.cancel.emit();
    this.visible = false;
  }

}
