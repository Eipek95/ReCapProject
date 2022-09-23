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
import { CarTestComponent } from '../car-test/car-test.component';
import { CarUpdateComponent } from '../car-update/car-update.component';
@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.css']
})
export class CarManagerComponent implements OnInit {
  cars:CarDetailDto[]
  currentCar:Car
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
  showCarUpdateModal(car: Car) {
    const brandUpdateModal = this.dialog.open(CarTestComponent, {
      disableClose: true,
      width: "30%"
    });
    brandUpdateModal.componentInstance.currentCar = car;

    brandUpdateModal.afterClosed().subscribe(result => {
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
