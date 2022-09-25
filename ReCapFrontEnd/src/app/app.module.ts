import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule,MatDialogRef  } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CbrandComponent } from './components/cbrand/cbrand.component';
import { CarcolorComponent } from './components/carcolor/carcolor.component';
import { CarimageComponent } from './components/carimage/carimage.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';


import {ToastrModule} from "ngx-toastr";
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { BrandSelectOptionFilterComponent } from './components/brand-select-option-filter/brand-select-option-filter.component';
import { ColorSelectOptionFilterComponent } from './components/color-select-option-filter/color-select-option-filter.component';
import { CaeDetailPipe } from './pipes/cae-detail.pipe';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandManagerComponent } from './components/brand-manager/brand-manager.component';
import { ColorManagerComponent } from './components/color-manager/color-manager.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarManagerComponent } from './components/car-manager/car-manager.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarTestComponent } from './components/car-test/car-test.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { OperationclaimComponent } from './components/operationclaim/operationclaim.component';
import { OperationclaimaddComponent } from './components/operationclaimadd/operationclaimadd.component';
import { OperationclaimupdateComponent } from './components/operationclaimupdate/operationclaimupdate.component';





@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CbrandComponent,
    CarcolorComponent,
    CarimageComponent,
    CardetailComponent,
    FilterPipePipe,
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    BrandSelectOptionFilterComponent,
    ColorSelectOptionFilterComponent,
    CaeDetailPipe,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandUpdateComponent,
    BrandManagerComponent,
    ColorManagerComponent,
    ColorUpdateComponent,
    CarManagerComponent,
    CarUpdateComponent,
    CarTestComponent,
    LoginComponent,
    RegisterComponent,
    OperationclaimComponent,
    OperationclaimaddComponent,
    OperationclaimupdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true,},
    {
      provide: 
      MatDialogRef ,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
