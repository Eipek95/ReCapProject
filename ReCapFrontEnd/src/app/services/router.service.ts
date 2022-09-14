import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  CarDetailsByBrandIdPath = "cars/brand/";
  CarDetailsByColorIdPath="cars/color/";
  HomePagePath = ""
  constructor(private router:Router) { }

  homePage(){
    this.router.navigate([this.HomePagePath])
  }

  carDetailsPageByBrandId(id: number) {
    if (id > 0) this.router.navigate([this.CarDetailsByBrandIdPath + id])
  }

  carDetailsPageByColorId(colorId: number) {
    if (colorId > 0) this.router.navigate([this.CarDetailsByColorIdPath + colorId])
  }
}
