import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CbrandComponent } from './components/cbrand/cbrand.component';


const routes: Routes = [//<app-route> çlıştığı yer
{ path: 'cars/brand/:id', component: CbrandComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
