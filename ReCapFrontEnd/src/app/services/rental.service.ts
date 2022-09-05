import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalRepsonseModel } from '../models/rentalResponseModel';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl='https://localhost:7199/api/Rentals/getrentaldetails';
  constructor(private httpClient:HttpClient) { }


  getRentals():Observable<RentalRepsonseModel>{
    return this.httpClient.get<RentalRepsonseModel>(this.apiUrl);
  }
}
