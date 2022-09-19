import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  currentColor:Color
  colorUpdateForm:FormGroup
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private updateModal: MatDialogRef<ColorUpdateComponent>,
    private formService: FormService 
  ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
  }
  update() {
    if (this.colorUpdateForm.valid) {
      let newColor = Object.assign({}, this.colorUpdateForm.value);
      newColor.id = this.currentColor.id;

      if (newColor.name == this.currentColor.name) {
        this.toastrService.error("Renk adı eskisiyle aynı", "Güncelleme yapılmadı");
        return;
      }

      this.colorService.update(newColor).subscribe(() => {
        this.toastrService.success(this.currentColor.name + ", " + newColor.name + " şeklinde güncellendi", "Güncelleme başarılı");
        this.closeUpdateModal();
      })
    } 
    else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.colorUpdateForm.reset();
    }
  }
  closeUpdateModal() {
    this.updateModal.close();
  }
  createBrandUpdateForm() {
    this.colorUpdateForm = this.formService.createBrandForm();
  }
}
