import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/cardetaildto';
import { Carimage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetailDtos: CarDetailDto[] = [];
  carImage: Carimage[] = [];
  currentCar: CarDetailDto;
  filterText = '';
  dataLoaded = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetail();
    });
  }

  getImage(carImage: CarDetailDto) {
    console.log(carImage);
    return 'https://localhost:7199/' + carImage.carImages[0].imagePath;
  }

  getCarDetail() {
    this.carService.getCars().subscribe((response) => {
      this.carDetailDtos = response.data;
    });
  }
  setCurrentCar(carDetailDto: CarDetailDto) {
    this.currentCar = carDetailDto;
  }
}
