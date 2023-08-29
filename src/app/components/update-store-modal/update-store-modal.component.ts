import { Component, Optional, Inject, Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/storeService/store.service';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-update-store-modal',
  templateUrl: './update-store-modal.component.html',
  styleUrls: ['./update-store-modal.component.css']
})
export class UpdateStoreModalComponent {
  store_code = ''; // Add this line
  store_name = '';
  store_location = '';
  store_phone_number = '';
  @Output() storeUpdated: EventEmitter<Store> = new EventEmitter<Store>();

  constructor(
    private storeService: StoreService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateStoreModalComponent>
  ) {
    if (data) {
      this.store_code = data.code; // Set the store code
      this.store_name = data.name;
      this.store_location = data.location;
      this.store_phone_number = data.phone_number;
    }
  }

  update(): void {
    const updatedData: Store = {
      code: this.store_code, // Include the store code in the updated data
      name: this.store_name,
      location: this.store_location,
      phone_number: this.store_phone_number
    };

    this.storeService.updateStore(updatedData).subscribe(
      response => {
        this.storeUpdated.emit(response); // Emit the updated data
        this.dialogRef.close(); // Close the modal
      },
      error => {
        console.error('Update failed:', error);
        // Handle error if necessary
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}