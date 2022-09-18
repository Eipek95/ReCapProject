import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandManagerComponent } from './components/brand-manager/brand-manager.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CarcolorComponent } from './components/carcolor/carcolor.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarimageComponent } from './components/carimage/carimage.component';
import { CbrandComponent } from './components/cbrand/cbrand.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';


const routes: Routes = [
  //<app-route> çlıştığı yer
  { path: '', component: CarComponent },
  { path: 'cars', component: CbrandComponent },
  { path: 'cars/brand/:id', component: CbrandComponent },
  { path: 'cars/color/:colorId', component: CarcolorComponent },
  { path: 'cardetail/:carId', component: CardetailComponent },
  { path: 'coloradd', component: ColorAddComponent },
  { path: 'caradd', component: CarAddComponent },
  { path: 'brandmanager', component: BrandManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
