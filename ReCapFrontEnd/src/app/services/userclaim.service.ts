import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserClaim } from '../models/userclaim';

@Injectable({
  providedIn: 'root',
})
export class UserclaimService {
  private apiUrl = 'https://localhost:7199/api/';
  constructor(private httpClient: HttpClient) {}

  getClaimDetail(): Observable<ListResponseModel<UserClaim>> {
    let newPath = this.apiUrl + 'UserOperationClaim/getalldetail';
    return this.httpClient.get<ListResponseModel<UserClaim>>(newPath);
  }

  getClaimDetailByUserId(userId: number): Observable<SingleResponseModel<UserClaim>> {
    let newPath=this.apiUrl + 'UserOperationClaim/getalldetailbyid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<UserClaim>>(newPath);
  }
}
