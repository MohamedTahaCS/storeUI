// delete-confirmation-modal.component.ts

import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/storeService/store.service';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {
  @Output() storeDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private storeService: StoreService,
    private dialogRef: MatDialogRef<DeleteConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public storeCode: any
  ) {}

  confirmDelete(): void {
    this.storeService.deleteStore(this.storeCode).subscribe(
      (response) => {
        this.storeDeleted.emit(this.storeCode);
        this.dialogRef.close();
      },
      (error) => {
        console.log("Delete Error: " + error);
      }
    )
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without emitting
  }
}