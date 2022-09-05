import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRepsonseModel } from '../models/customerResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl='https://localhost:7199/api/Customers/getcustomer';
  constructor(private httpClient:HttpClient) { }


  getCustomers():Observable<CustomerRepsonseModel>{
    return this.httpClient.get<CustomerRepsonseModel>(this.apiUrl);
  }
}
