import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarRepsonseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl='https://localhost:7199/api/Cars/getcardetails';
  constructor(private httpClient:HttpClient) { }


  getCars():Observable<CarRepsonseModel>{
    return this.httpClient.get<CarRepsonseModel>(this.apiUrl);
  }
}
