import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { Carimage } from '../models/carimage';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetailDto } from '../models/cardetaildto';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl="https://localhost:7199/api/";
  constructor(private httpClient:HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
   let newPath=this.apiUrl+"Cars/getcar";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }


  getCarImagesByCarId(id: number): Observable<ListResponseModel<Carimage>> {
    let newPath=this.apiUrl+"CarImages/getcardetailsbyid?id="+id
    return this.httpClient.get<ListResponseModel<Carimage>>(newPath);
  }

  getCarDetailsByCarId(id: number): Observable<SingleResponseModel<CarDetailDto>> {
    let carDetailPath = this.apiUrl + "Cars/getcardetailsbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(carDetailPath);
  }
  add(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Cars/addcars';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
