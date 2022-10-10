import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService, //sisteme authentice mi
    private toastrService: ToastrService,//bilgi vermek için
    private router: Router//auth değilse login sayfasına git
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isAuthenticated()){
        return true;
        }
        else{
          this.router.navigate(["account/login"])//sistemde auth değilse login sayfasına gönder
          this.toastrService.info("Sisteme giriş yapmalısınız")
          return false;
        }
  }
  
}
