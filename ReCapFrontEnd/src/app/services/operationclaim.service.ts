import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationclaim';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationclaimService {
private apiUrl="https://localhost:7199/api"
  constructor(private httpClient:HttpClient) { }


  getClaims(){
    let newPath=this.apiUrl+"/OperationClaim/getclaims";
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath)
  }

  add(claim: OperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/OperationClaim/addclaim';
    return this.httpClient.post<ResponseModel>(newPath, claim);
  }
  update(claim: OperationClaim): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + '/OperationClaim/updateclaim';
    return this.httpClient.post<ResponseModel>(newPath, claim);
  }
  delete(claim: OperationClaim): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + '/OperationClaim/deleteclaim';
    return this.httpClient.post<ResponseModel>(newPath, claim);
  }
}


