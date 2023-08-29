import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './components/store-list/store-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  // Other routes
  { path: "", component: StoreListComponent},
  { path: 'products', component: ProductListComponent } // Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
