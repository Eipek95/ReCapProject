import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangePasswordModel } from '../models/changepassword';
import { LoginModel } from '../models/login';
import { Register } from '../models/register';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserForLogin } from '../models/userForLogin';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthcustomserviceService {
  private apiUrl = 'https://localhost:7199/api/Auth/';

  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired());

  public get loginStatus() {
    return this.loggedIn.asObservable();
  }
  public get isLoggedIn() {
    return this.loggedIn.getValue();
  }
  public set isLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
    private localStorageService: LocalStorageService
  ) {}

  private isTokenExpired(): boolean {
    let token = this.getToken();
    if (token != null) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }
  private getToken(): string | null {
    return this.localStorageService.getItem('token');
  }

  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user);
  }
  logOut() {
    this.localStorageService.remove('token');
    this.loggedIn.next(false);
  }
  register(newUser: Register): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'register'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, newUser);
  }
  getUser(): UserForLogin | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(
        this.jwtHelperService.decodeToken(token)
      );
      let user: UserForLogin = new UserForLogin();
      tokenDetails.forEach((response) => {
        switch (response[0]) {
          case 'email': {
            user.email = String(response[1]);
            break;
          }
          case 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': {
            user.name = String(response[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.roles = response[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = Number(response[1]);
          }
        }
      });
      if(!user.roles){
        user.roles=[];
      }
      return user;
    }
    return undefined;
  }

  hasRole(user:UserForLogin,role:string):boolean{
    if(user.roles.indexOf(role)!=-1){
      return true;
    }
    return false;
  }
  changePassword(updatedUser: ChangePasswordModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'changepassword';
    return this.httpClient.post<ResponseModel>(newPath, updatedUser);
  }
  
}
