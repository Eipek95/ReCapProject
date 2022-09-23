import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl='https://localhost:7199/api/'
  constructor(private httpClient:HttpClient) { }

  add(register: Register): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Auth/register';
    return this.httpClient.post<ResponseModel>(newPath, register);
  }
}




