import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { CarTestDeleteComponent } from '../car-test-delete/car-test-delete.component';
import { CarTestUpdateComponent } from '../car-test-update/car-test-update.component';
import { CarTestComponent } from '../car-test/car-test.component';

@Component({
  selector: 'app-car-test-manager',
  templateUrl: './car-test-manager.component.html',
  styleUrls: ['./car-test-manager.component.css']
})
export class CarTestManagerComponent implements OnInit {
  cars: Car[];
  constructor(
    private carService: CarService,
    private carImagesService: CarimageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCars();
  }
  getImagePath(imagePath: string) {
    let newPath=this.carImagesService.getImagePath(imagePath);
    console.log(newPath)
    return this.carImagesService.getImagePath(imagePath);
  }

  getCars() {
    this.carService.getMyCars().subscribe(response => {
      this.cars = response.data;
    })
  }
  showCarAddModal() {
    const carAddModal = this.dialog.open(CarTestComponent, {
      disableClose: true,
      width: "40%",
    });

    carAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  showCarUpdateModal(car: Car) {
    const carUpdateModal = this.dialog.open(CarTestUpdateComponent, {
      disableClose: true,
      width: "40%"
    });
    carUpdateModal.componentInstance.currentCar = car;

    carUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  showCarDeleteModal(car: Car) {
    const carDeleteModal = this.dialog.open(CarTestDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    carDeleteModal.componentInstance.deletedCar = car;

    carDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
