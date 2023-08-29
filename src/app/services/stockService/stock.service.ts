import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockRequest } from 'src/app/models/stockRequest';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = "https://store-service-api.onrender.com/stocks";

  constructor(private http: HttpClient) { }

  public getQuantityInStore(storeCode: string, productCode: string): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/store/' + storeCode + '/product/' + productCode + '/quantity');
  }

  public increaseQuantity(stockRequest: StockRequest): Observable<any> {
    return this.http.post(this.apiUrl + '/increase', stockRequest);
  }

  public decreaseQuantity(stockRequest: StockRequest): Observable<any> {
    return this.http.post(this.apiUrl + '/decrease', stockRequest);
  }
}
