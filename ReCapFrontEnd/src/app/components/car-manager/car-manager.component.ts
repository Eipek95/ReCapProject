import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/cardetaildto';
import { CarService } from 'src/app/services/car.service';
import { CarAddComponent } from '../car-add/car-add.component';
import { CarUpdateComponent } from '../car-update/car-update.component';
@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.css']
})
export class CarManagerComponent implements OnInit {
  cars:CarDetailDto[]
  constructor(
    private carService:CarService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.carService.getCarDetail().subscribe(response => {
      this.cars = response.data;
    })
  }
  showCarUpdateModal(car: CarDetailDto) {
    const carUpdateModal = this.dialog.open(CarUpdateComponent, {
      disableClose: true,
      width: "30%"
    });
   // carUpdateModal.componentInstance.currentCar = car;

    carUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  showCarAddModal() {
    const carAddModal = this.dialog.open(CarAddComponent, {
      disableClose: true,
      width: "25%"
    });

    carAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
}
}
