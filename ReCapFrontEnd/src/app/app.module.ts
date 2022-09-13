import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

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

import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';





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
    BrandFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
