import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { DenemeComponent } from './components/deneme/deneme.component';





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
    DenemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
