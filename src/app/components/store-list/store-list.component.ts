import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/storeService/store.service';
import { AddStoreModalComponent } from '../add-store-modal/add-store-modal.component';
import { UpdateStoreModalComponent } from '../update-store-modal/update-store-modal.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  loading = false;
  stores: Store[] = [];
  
  constructor(private storeService: StoreService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
      this.getStores();
  }

  getStores(): void {
    this.loading = true;
    this.storeService.getStores().subscribe(
      (response: Store[]) => {              
        this.stores = response;
        this.loading = false;                                                           
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  showStock(store: Store): void {
    this.router.navigate(['/products'], {
      relativeTo: this.route,
      queryParams: { store_code: store.code }
    }); // Navigate to the product list component
  }

  openAddStoreModal(): void {
    const dialogRef = this.dialog.open(AddStoreModalComponent, {
      width: '700px',
      
    });

    dialogRef.componentInstance.storeAdded.subscribe(newStore => {
      this.stores.push(newStore);
    })
  }

  openUpdateStoreModal(storeData: any): void {
    const dialogRef = this.dialog.open(UpdateStoreModalComponent, {
      width: '700px',
      data: storeData // Pass the store data, including store_code
    });

    dialogRef.componentInstance.storeUpdated.subscribe(updatedStore => {
      const updatedIndex = this.stores.findIndex(store => store.code === updatedStore.code);
      if (updatedIndex !== -1) {
        this.stores[updatedIndex] = updatedStore;
      }
    })
  }

  openDeleteConfirmationModal(storeCode: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      width: '450px',
      data: storeCode  // Pass the store code to the dialog
    });

    dialogRef.componentInstance.storeDeleted.subscribe(() => {
      this.stores = this.stores.filter(store => store.code !== storeCode);
    });
  }

}
