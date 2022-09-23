import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7199/api/Auth/';
  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }

  isAuthenticated(){
    //tarayıcı yenilenice response,token bilgileri kaybolmaması için bilgileri tuttuğumuz yerdir.localstorage
    if(localStorage.getItem("token")){//token varsa
      return true;
    }
    else{
      return false;
    }
  }
}
