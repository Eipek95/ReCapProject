import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FormService } from 'src/app/services/form.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  currentColorId: number;
  currentBrandId: number;
  colors: Color[];
  brands: Brand[];
  constructor(
    private carAddModal: MatDialogRef<CarAddComponent>,
    private formService:FormService,
    private carService: CarService,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }
  createCarAddForm() {
    this.carAddForm = this.formService.createCarForm();
  }

  closeBrandAddModal() {
    this.carAddModal.close();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  
  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.colorId=this.currentColorId
      carModel.brandId=this.currentBrandId
      this.carService.add(carModel).subscribe(() => {
        this.toastrService.success(carModel.name, "Araba başarıyla eklendi");
        this.closeBrandAddModal();
      })
    } else {
      this.toastrService.error("Araba adı 2-50 karakter arasında olmalıdır", "Geçersiz form");
      this.carAddForm.reset();
    }
  }
}
