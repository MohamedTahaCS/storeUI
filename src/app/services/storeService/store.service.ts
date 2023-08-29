import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // private apiUrl = "http://localhost:8080/api/stores/";
  private apiUrl = "https://store-service-api.onrender.com/stores";

  constructor(private http: HttpClient) { }

  public getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  public getStore(code: string): Observable<Store> {
    return this.http.get<Store>(this.apiUrl + '/' + code);
  }

  public addStore(store: Store): Observable<any> {
    return this.http.post(this.apiUrl, store);
  }

  updateStore(store: Store): Observable<any> {
    const updateUrl = this.apiUrl + "/" + store.code ;
    return this.http.put(updateUrl, store);
  }

  deleteStore(code: string): Observable<any> {
    const deleteUrl = this.apiUrl + "/" + code ;
    return this.http.delete(deleteUrl);
  }

}
