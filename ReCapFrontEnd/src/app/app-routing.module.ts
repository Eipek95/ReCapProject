import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationclaimComponent } from './components/operationclaim/operationclaim.component';
import { LoginGuard } from './guards/login.guard';
import { LogincustomGuard } from './guards/logincustom.guard';
import { RoleGuard } from './guards/role.guard';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { AccountRegisterComponent } from './account/account-register/account-register.component';
import { AccountLayoutComponent } from './account/account-layout/account-layout.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminBrandManagerComponent } from './components/admin/admin-brand-manager/admin-brand-manager.component';
import { AdminCarManagerComponent } from './components/admin/admin-car-manager/admin-car-manager.component';
import { AdminColorManagerComponent } from './components/admin/admin-color-manager/admin-color-manager.component';
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

const routes: Routes = [
  //<app-route> çlıştığı yer
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'brand/:brandid', component: HomeComponent },
  { path: 'color/:colorid', component: HomeComponent },
  {
    path: '', component: HomeLayoutComponent, children: [
     { path: 'car-details/:carid', component: CarDetailsComponent },
      { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
      {
        path: 'admin', component: AdminLayoutComponent, children: [
          { path: 'brand/manager', component: AdminBrandManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
          { path: 'color/manager', component: AdminColorManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
          { path: 'car/manager', component: AdminCarManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
        ]
      }
    ]
  },
    { path: 'claimmanager', component: OperationclaimComponent,canActivate: [LogincustomGuard, RoleGuard], data: { expectedRole: 'admin' } },
    {
      path: 'account', component: AccountLayoutComponent, children: [
        { path: 'login', component: AccountLoginComponent, canActivate: [LogincustomGuard] },
        { path: 'register', component: AccountRegisterComponent, canActivate: [LogincustomGuard] }
      ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
