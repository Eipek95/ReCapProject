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
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'https://localhost:7199/api/';
  constructor(private httpClient: HttpClient) {}

  getMyCars() {
    let newPath = this.apiUrl + 'Cars/getcar';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCars() {
    let newPath = this.apiUrl + 'Cars/getallcars';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCar(id:number) :Observable<SingleResponseModel<Car>> {
    let newPath=this.apiUrl+'Cars/getallcars?carId='+id;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getCarDetail(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'Cars/getcar';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarImagesByCarId(id: number): Observable<ListResponseModel<Carimage>> {
    let newPath = this.apiUrl + 'CarImages/getcardetailsbyid?id=' + id;
    return this.httpClient.get<ListResponseModel<Carimage>>(newPath);
  }

  getCarDetailsByCarId(id: number): Observable<SingleResponseModel<CarDetailDto>> {
    let carDetailPath = this.apiUrl + 'Cars/getcardetailsbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(
      carDetailPath
    );
  }
  add(car: Car): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + 'Cars/addcars';
    return this.httpClient.post<SingleResponseModel<number>>(newPath, car);
  }
  update(car: Car): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + 'Cars/updatecars';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  delete(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Cars/deletecars'
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
}
