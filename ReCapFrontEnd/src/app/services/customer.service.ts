import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl='https://localhost:7199/api/Customers/';
  constructor(private httpClient:HttpClient) { }


  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+'getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getbyuserid?userid=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  addCustomer(customer: Customer): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<SingleResponseModel<number>>(newPath, customer);
  }
}
