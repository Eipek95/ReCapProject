import { Injectable } from '@angular/core';
import { CarDetailDto } from '../models/cardetaildto';
import { Carimage } from '../models/carimage';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CardetailService {
  carDetails: CarDetailDto;
  carImages: Carimage[];
  apiUrl = 'https://localhost:7199/api/CarImages';

  constructor(private httpClient: HttpClient) {}
  getAllCarImages(): Observable<ListResponseModel<Carimage>> {
    let allImages = this.apiUrl + 'CarImages/getall';
    return this.httpClient.get<ListResponseModel<Carimage>>(allImages);
  }

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<Carimage>> {
    let imagesByCarId = this.apiUrl + "getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Carimage>>(imagesByCarId);
  }

  getImagePath(imagePath: string) {
    return this.apiUrl + imagePath;
  }
}
