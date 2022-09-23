import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-car-test',
  templateUrl: './car-test.component.html',
  styleUrls: ['./car-test.component.css']
})
export class CarTestComponent implements OnInit {
  currentCar:Car
  currentBrand:Brand
  carUpdateForm:FormGroup
  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private updateModal: MatDialogRef<BrandService>,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
  }
  update() {
    if (this.carUpdateForm.valid) {
      let newBrand = Object.assign({}, this.carUpdateForm.value);
      newBrand.id = this.currentBrand.id;

      if (newBrand.name == this.currentBrand.name) {
        this.toastrService.error("Marka adı eskisiyle aynı", "Güncelleme yapılmadı");
        return;
      }

      this.brandService.update(newBrand).subscribe(() => {
        this.toastrService.success(this.currentBrand.name + ", " + newBrand.name + " şeklinde güncellendi", "Güncelleme başarılı");
        this.closeUpdateModal();
      })
    } 
    else {
      this.toastrService.error("Marka adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.carUpdateForm.reset();
    }
  }
  closeUpdateModal() {
    this.updateModal.close();
  }

  createBrandUpdateForm() {
    this.carUpdateForm = this.formService.createDemoCarForm();
  }
}
