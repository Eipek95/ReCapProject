import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { MatDialog } from '@angular/material/dialog';
import { BrandUpdateComponent } from '../brand-update/brand-update.component';
import { BrandAddComponent } from '../brand-add/brand-add.component';
@Component({
  selector: 'app-brand-manager',
  templateUrl: './brand-manager.component.html',
  styleUrls: ['./brand-manager.component.css']
})
export class BrandManagerComponent implements OnInit {
brands:Brand[]
  constructor(
    private brandService:BrandService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }
  showBrandUpdateModal(brand: Brand) {
    const brandUpdateModal = this.dialog.open(BrandUpdateComponent, {
      disableClose: true,
      width: "30%"
    });
    brandUpdateModal.componentInstance.currentBrand = brand;

    brandUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  showBrandAddModal() {
    const brandAddModal = this.dialog.open(BrandAddComponent, {
      disableClose: true,
      width: "25%"
    });

    brandAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
