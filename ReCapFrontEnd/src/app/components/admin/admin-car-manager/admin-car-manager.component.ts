import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { AdminCarAddComponent } from '../admin-car-add/admin-car-add.component';
import { AdminCarDeleteComponent } from '../admin-car-delete/admin-car-delete.component';
import { AdminCarUpdateComponent } from '../admin-car-update/admin-car-update.component';

@Component({
  selector: 'app-admin-car-manager',
  templateUrl: './admin-car-manager.component.html',
  styleUrls: ['./admin-car-manager.component.css']
})
export class AdminCarManagerComponent implements OnInit {
  cars: Car[];
  constructor(
    private carService: CarService,
    private carImagesService: CarimageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.carService.getMyCars().subscribe(response => {
      this.cars = response.data;
    })
  }
  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }
  showCarUpdateModal(car: Car) {
    const carUpdateModal = this.dialog.open(AdminCarUpdateComponent, {
      disableClose: true,
      width: "40%"
    });
    carUpdateModal.componentInstance.currentCar = car;

    carUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCarDeleteModal(car: Car) {
    const carDeleteModal = this.dialog.open(AdminCarDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    carDeleteModal.componentInstance.deletedCar = car;

    carDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCarAddModal() {
    const carAddModal = this.dialog.open(AdminCarAddComponent, {
      disableClose: true,
      width: "40%",
    });

    carAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
