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
 
  getCarDetailByBrandIdOwner(brandId:number):Observable<ListResponseModel<Car>>{
    let carDetailPath = this.apiUrl + 'Cars/getownercardetailbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(carDetailPath);
  }
  getCarDetailByColorIdOwner(colorid:number):Observable<ListResponseModel<Car>>{
    let carDetailPath = this.apiUrl + 'Cars/getownercardetailbycolorid?colorId=' + colorid;
    return this.httpClient.get<ListResponseModel<Car>>(carDetailPath);
  }
  getCarsByFilter(brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsbyfilterwithdetails?brandid=' + brandId + "&colorid=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getcardetailbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getcardetailbybrandid?id="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


  getCarDetailByCarIdOwner(carid:number):Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getownercardetailbycarid?carid=' + carid;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
}


