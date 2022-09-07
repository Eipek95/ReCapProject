import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cbrand } from '../models/cbrand';
import { ListResponseModel } from '../models/listResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CbrandService {

  private apiUrl='https://localhost:7199/api/';
  constructor(private httpClient:HttpClient) { }

  getCbrands():Observable<ListResponseModel<Cbrand>>{
    let newPath=this.apiUrl+"Cars/getcardetailbybrand"
    return this.httpClient.get<ListResponseModel<Cbrand>>(this.apiUrl);
  }

  getCarsByBrand(id:number):Observable<ListResponseModel<Cbrand>>{
    let newPath=this.apiUrl+"Cars/getcardetailbybrandid?id="+id
    return this.httpClient.get<ListResponseModel<Cbrand>>(newPath);
  }
}
