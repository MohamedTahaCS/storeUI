import { Component, Inject, Optional, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/storeService/store.service';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-add-store-modal',
  templateUrl: './add-store-modal.component.html',
  styleUrls: ['./add-store-modal.component.css']
})
export class AddStoreModalComponent {
  store_name = '';
  store_location = '';
  store_phone_number = '';
  @Output() storeAdded: EventEmitter<Store> = new EventEmitter<Store>();

  constructor(private storeService: StoreService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any,     private dialogRef: MatDialogRef<AddStoreModalComponent>) {
    if (data) {
      // If data is provided, populate the fields for updating
      this.store_name = data.name;
      this.store_location = data.location;
      this.store_phone_number = data.phoneNumber;
    }
    this.dialogRef.disableClose = true;
  }

  save(): void {
    const storeData : Store = {
      code: "",
      name: this.store_name,
      location: this.store_location,
      phone_number: this.store_phone_number
    };

    // Emit/store the data for saving/updating
    console.log(storeData);
    this.dialogRef.close(storeData);
    this.storeService.addStore(storeData).subscribe(
      (response) => {
        this.storeAdded.emit(response);
        this.dialogRef.close();
      },
      (error) => {
        console.log('error: ' + error);
      }
    );
  }

  cancel(): void {
    // Close the modal without saving
    this.dialogRef.close();
  }
}
