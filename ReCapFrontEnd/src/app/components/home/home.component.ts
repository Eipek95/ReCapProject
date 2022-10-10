import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];

  filterBrandId: number = 1;
  filterColorId: number = 1;
  filterCarModelName: string = "";

  maxRandomCarLength: number = 5;
  randomCars: Car[] = [];

  routerLink: string = "";
  constructor(
    private carService: CarService,
    private carImagesService: CarimageService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandid']) {
        this.routerLink = 'brandid';
        this.getCarsByBrand(params['brandid']);
      } else if (params['colorid']) {
        this.routerLink = 'colorid';
        this.getCarsByColor(params['colorid']);
      } else {
        this.routerLink = '';
        this.getCars();
      }
      this.getBrands();
      this.getColors();
    });
  }
  getCars() {
    this.carService.getMyCars().subscribe((response) => {
      this.cars = response.data;
      this.getRandomCars(this.cars, this.maxRandomCarLength);
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarDetailByBrandIdOwner(brandId).subscribe((response) => {
      this.cars = response.data;
      this.getRandomCars(this.cars, this.maxRandomCarLength);
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarDetailByColorIdOwner(colorId).subscribe((response) => {
      this.cars = response.data;
      this.getRandomCars(this.cars, this.maxRandomCarLength);
    });
  }
  getRandomCars(carList: Car[], number: number) {
    let tempCarList: Car[] = [];
    carList.forEach(car => {
      tempCarList.push(car);
    });

    this.randomCars = [];
    if (number > tempCarList.length) {
      number = tempCarList.length;
    }
    for (let i = 0; i < number; i++) {
      let randomNumber = this.getRandomNumber(tempCarList.length);
      let randomCar = tempCarList[randomNumber]
      if (randomCar.carImages[0].imagePath != "/images/default.jpg") {
        this.randomCars.push(randomCar)
      }
      tempCarList.splice(randomNumber, 1);
    }
  }

  private getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  getCarsByFilter(brandId: number, colorId: number) {
    this.carService.getCarsByFilter(brandId, colorId).subscribe(response => {
      this.cars = response.data;
    })
  }

  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
}
