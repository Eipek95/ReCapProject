import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorRepsonseModel } from '../models/colorResponseModel';
@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private apiUrl='https://localhost:7199/api/Colors/getcolor';
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ColorRepsonseModel>{
    return this.httpClient.get<ColorRepsonseModel>(this.apiUrl);
  }
}
