import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  currentBrand: Brand;
  brandUpdateForm:FormGroup
  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private updateModal: MatDialogRef<BrandUpdateComponent>,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let newBrand = Object.assign({}, this.brandUpdateForm.value);
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
      this.brandUpdateForm.reset();
    }
  }
  closeUpdateModal() {
    this.updateModal.close();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formService.createBrandForm();
  }
}
