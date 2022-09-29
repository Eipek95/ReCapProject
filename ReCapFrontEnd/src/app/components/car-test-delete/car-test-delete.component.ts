import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-car-test-delete',
  templateUrl: './car-test-delete.component.html',
  styleUrls: ['./car-test-delete.component.css'],
})
export class CarTestDeleteComponent implements OnInit {
  deletedCar: Car;
  constructor(
    private carDeleteModal: MatDialogRef<CarTestDeleteComponent>,
    private carImagesService: CarimageService,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}
  delete(car: Car) {
    this.carService.delete(car).subscribe(
      (response) => {
        this.toastrService.success(
          car.brandName + ' ' + car.description + ' aracı silindi',
          'Silme işlemi başarılı'
        );
        this.closeCarDeleteModal();
      },
      (errorResponse) => {
        this.toastrService.error(
          errorResponse.error.message,
          'Silme işlemi başarısız'
        );
      }
    );
  }
  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  closeCarDeleteModal() {
    this.carDeleteModal.close();
  }
}

