import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cbrand } from '../models/cbrand';
import { ListResponseModel } from '../models/listResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CbrandService {

  private apiUrl='https://localhost:7199/api/Cars/getcardetailbybrand';
  constructor(private httpClient:HttpClient) { }

  getCbrands():Observable<ListResponseModel<Cbrand>>{
    return this.httpClient.get<ListResponseModel<Cbrand>>(this.apiUrl);
  }
}
