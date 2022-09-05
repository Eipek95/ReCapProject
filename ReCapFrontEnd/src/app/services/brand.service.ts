import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandRepsonseModel } from '../models/brandResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl='https://localhost:7199/api/Brands/getbrand';
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<BrandRepsonseModel>{
    return this.httpClient.get<BrandRepsonseModel>(this.apiUrl);
  }
}
