import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentPaymentRequest } from '../models/rentpaymentrequest';
import { SingleResponseModel } from '../models/singleResponseModel';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl='https://localhost:7199/api/';
  constructor(private httpClient:HttpClient) { }


  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'Rentals/getdetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  CheckIfCanCarBeRentedNow(carId: number): Observable<SingleResponseModel<boolean>> {
    let newPath = this.apiUrl + 'Rentals/checkifcancarberentednow?carid=' + carId;
    return this.httpClient.get<SingleResponseModel<boolean>>(newPath);
  }

  checkIfCanCarBeRentedBetweenSelectedDates(carId: number, rentDate: string, returnDate: string): Observable<SingleResponseModel<boolean>> {
    let newPath = this.apiUrl + 'Rentals/checkifcancarberentedbetweenselecteddates?carid=' + carId + '&rentdate=' + rentDate + '&returndate=' + returnDate;
    return this.httpClient.get<SingleResponseModel<boolean>>(newPath);
  }

  rent(rentRequest:RentPaymentRequest):Observable<SingleResponseModel<number>>{
    let newPath = this.apiUrl + 'Rentals/rent';
    return this.httpClient.post<SingleResponseModel<number>>(newPath,rentRequest);
  }
}
