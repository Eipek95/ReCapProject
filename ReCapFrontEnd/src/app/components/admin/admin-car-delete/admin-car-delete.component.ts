import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-admin-car-delete',
  templateUrl: './admin-car-delete.component.html',
  styleUrls: ['./admin-car-delete.component.css']
})
export class AdminCarDeleteComponent implements OnInit {
  deletedCar: Car;
  constructor(
    private carDeleteModal: MatDialogRef<AdminCarDeleteComponent>,
    private carImagesService: CarimageService,
    private carService: CarService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }
  delete(car: Car) {
    this.carService.delete(car).subscribe(response => {
      this.toastrService.success(car.brandName + " " + car.description + " aracı silindi", "Silme işlemi başarılı");
      this.closeCarDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız");
    })
  }

  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  closeCarDeleteModal() {
    this.carDeleteModal.close();
  }
}
