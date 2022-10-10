import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = 'https://localhost:7199/api/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'Brands/getbrand';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  add(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Brands/addBrand';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  update(brand: Brand): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + 'Brands/updateBrand';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  delete(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Brands/deleteBrand'
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }
}
