import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/cardetaildto';
import { Carimage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  carDetails: CarDetailDto;
  carImage: Carimage[];
  constructor(
    private carService: CarService,
    private carImageService: CarimageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetailsByCarId(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      }
    })
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarsByImageId(carId).subscribe(response=>{
      this.carImage=response.data
    })
  }
  getImage(carImage:Carimage){
    return "https://localhost:7199/" + carImage.imagePath;
  }

  getActiveString(carImage:Carimage){
    if(carImage===this.carImage[0]){
      return "active"
    }else{
      return ""
    }
  }
}
