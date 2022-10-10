import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule,MatDialogRef  } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { NgxMaskModule } from 'ngx-mask';
import {ToastrModule} from "ngx-toastr";
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { CaeDetailPipe } from './pipes/cae-detail.pipe';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OperationclaimComponent } from './components/operationclaim/operationclaim.component';
import { OperationclaimaddComponent } from './components/operationclaimadd/operationclaimadd.component';
import { OperationclaimupdateComponent } from './components/operationclaimupdate/operationclaimupdate.component';
import { UserclaimComponent } from './components/userclaim/userclaim.component';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { AccountRegisterComponent } from './account/account-register/account-register.component';
import { AccountLayoutComponent } from './account/account-layout/account-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminBrandAddComponent } from './components/admin/admin-brand-add/admin-brand-add.component';
import { AdminBrandDeleteComponent } from './components/admin/admin-brand-delete/admin-brand-delete.component';
import { AdminBrandManagerComponent } from './components/admin/admin-brand-manager/admin-brand-manager.component';
import { AdminBrandUpdateComponent } from './components/admin/admin-brand-update/admin-brand-update.component';
import { AdminCarAddComponent } from './components/admin/admin-car-add/admin-car-add.component';
import { AdminCarDeleteComponent } from './components/admin/admin-car-delete/admin-car-delete.component';
import { AdminCarUpdateComponent } from './components/admin/admin-car-update/admin-car-update.component';
import { AdminCarManagerComponent } from './components/admin/admin-car-manager/admin-car-manager.component';
import { AdminColorAddComponent } from './components/admin/admin-color-add/admin-color-add.component';
import { AdminColorDeleteComponent } from './components/admin/admin-color-delete/admin-color-delete.component';
import { AdminColorUpdateeComponent } from './components/admin/admin-color-updatee/admin-color-updatee.component';
import { AdminColorManagerComponent } from './components/admin/admin-color-manager/admin-color-manager.component';
import { HomeComponent } from './components/home/home.component';
import { FilterCarModelPipePipe } from './pipes/filter-car-model-pipe.pipe';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessfulComponent } from './components/payment-successful/payment-successful.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { FooterComponent } from './components/footer/footer.component';
import { RentalComponent } from './components/rental/rental.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    FilterPipePipe,
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    CaeDetailPipe,
    OperationclaimComponent,
    OperationclaimaddComponent,
    OperationclaimupdateComponent,
    UserclaimComponent,
    AccountLoginComponent,
    AccountRegisterComponent,
    AccountLayoutComponent,
    ProfileComponent,
    AdminLayoutComponent,
    AdminBrandAddComponent,
    AdminBrandDeleteComponent,
    AdminBrandManagerComponent,
    AdminBrandUpdateComponent,
    AdminCarAddComponent,
    AdminCarDeleteComponent,
    AdminCarUpdateComponent,
    AdminCarManagerComponent,
    AdminColorAddComponent,
    AdminColorDeleteComponent,
    AdminColorUpdateeComponent,
    AdminColorManagerComponent,
    HomeComponent,
    FilterCarModelPipePipe,
    HomeLayoutComponent,
    CarDetailsComponent,
    CartComponent,
    ConfirmOrderComponent,
    PaymentComponent,
    PaymentSuccessfulComponent,
    CartSummaryComponent,
    FooterComponent,
    RentalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true,},
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService,
    {
      provide: 
      MatDialogRef ,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
