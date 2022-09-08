import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarcolorComponent } from './components/carcolor/carcolor.component';
import { CbrandComponent } from './components/cbrand/cbrand.component';


const routes: Routes = [//<app-route> çlıştığı yer
{path:"",component:CarComponent},
{ path: "cars", component: CbrandComponent },
{ path: 'cars/brand/:id', component: CbrandComponent },
{ path: 'cars/color/:colorId', component: CarcolorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
