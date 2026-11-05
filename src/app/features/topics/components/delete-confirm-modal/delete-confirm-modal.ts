import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-delete-confirm-modal-component',
  imports: [DialogModule, ButtonModule],
  templateUrl: './delete-confirm-modal.html',
  styleUrl: './delete-confirm-modal.css',
})
export class DeleteConfirmModal {

  // Estado del diálogo. Lo escribe la página.
  @Input() visible = false;

  // Avisos hacia la página
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<boolean>();

  // Acciones

  /** Cierra el diálogo y avisa que el usuario confirmó. */
  onConfirm(): void {
    this.visibleChange.emit(false);
    this.confirm.emit(true);
  }

  /** Cierra el diálogo sin confirmar. */
  onCancel(): void {
    this.visibleChange.emit(false);
  }
}
