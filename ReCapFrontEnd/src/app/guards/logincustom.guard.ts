import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthcustomserviceService } from '../services/authcustomservice.service';

@Injectable({
  providedIn: 'root'
})
export class LogincustomGuard implements CanActivate {

  constructor(
    private authService: AuthcustomserviceService,
    private toastrService: ToastrService,
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      if (route.routeConfig?.path === "login" || route.routeConfig?.path === "register") {
        this.router.navigate([""]);
        this.toastrService.warning("Sisteme zaten giriş yapılmış", "Giriş yapılmış");
        return false;
      } else {
        return true;
      }
    } else {
      if (route.routeConfig?.path === "login" || route.routeConfig?.path === "register") {
        return true;
      } else {
        this.authService.logOut();
        this.router.navigate(["account/login"]);
        this.toastrService.error("Sisteme giriş yapmalısınız", "Giriş yapmalısınz");
        return false;
      }
      return true;
  }
}
}
