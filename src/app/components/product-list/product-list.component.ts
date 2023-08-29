import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/productService/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/services/stockService/stock.service';
import { StockRequest } from 'src/app/models/stockRequest';
import { StoreService } from 'src/app/services/storeService/store.service';
import { Store } from 'src/app/models/store';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  storeCode!: string;

  loading = false;

  products!: Product[];
  isProcessing = false;

  constructor(private productService: ProductService, private storeService: StoreService, private stockService: StockService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.storeCode = params['store_code'];
    });
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.loading = false;      
        this.products = response;

        for (let product of this.products) {
          this.stockService.getQuantityInStore(this.storeCode, product.productCode).subscribe(
            (response) => {
              product.quantity = response;
            },
            (error) => {
              console.log("get Quantity error: " + error);
            }
          )
          
        }

        console.log(this.products);                                                               
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  decreaseQuantity(productCode: string) {
    // dec by one
    if (this.isProcessing) return;

    this.isProcessing = true;

    const stockRequest: StockRequest = {
      store_code: this.storeCode,
      product_code: productCode,
      quantity: 1
    };

    this.stockService.decreaseQuantity(stockRequest).subscribe(
      (response) => {
        console.log(response.message);
        const updatedIndex = this.products.findIndex(product => product.productCode === productCode);
        if (updatedIndex !== -1) {
          this.products[updatedIndex].quantity--;
        }
        this.isProcessing = false;
      },
      (error) => {
        console.log(error);
        this.isProcessing = false;
      }
    );
  }

  increaseQuantity(productCode: string) {
    if (this.isProcessing) return;

    this.isProcessing = true;

    const stockRequest: StockRequest = {
      store_code: this.storeCode,
      product_code: productCode,
      quantity: 1
    };

    this.stockService.increaseQuantity(stockRequest).subscribe(
      (response) => {
        console.log(response.message);
        const updatedIndex = this.products.findIndex(product => product.productCode === productCode);
        if (updatedIndex !== -1) {
          this.products[updatedIndex].quantity++;
        }
        this.isProcessing = false;
      },
      (error) => {
        console.log(error);
        this.isProcessing = false;
      }
    );
  }
}

