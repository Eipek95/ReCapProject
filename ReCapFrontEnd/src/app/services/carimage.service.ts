import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carimage } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarimageService {
  apiUrl = 'https://localhost:7199/api/CarImages'
  constructor(private httpClient: HttpClient) {}

  getCarsImage(): Observable<ListResponseModel<Carimage>> {
    let allImages=this.apiUrl+"/getall";
    return this.httpClient.get<ListResponseModel<Carimage>>(allImages);
  }
}
