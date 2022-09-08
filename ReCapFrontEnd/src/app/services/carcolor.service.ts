import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carcolor } from '../models/carcolor';
import { ListResponseModel } from '../models/listResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CarcolorService {

  private apiUrl='https://localhost:7199/api/';
  constructor(private httpClient:HttpClient) { }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Carcolor>>{
    let newPath=this.apiUrl+"Cars/getcardetailbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Carcolor>>(newPath);
  }
}
