import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private colorAddModal: MatDialogRef<ColorAddComponent>,
    private formService:FormService
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }
  createColorAddForm() {
    this.colorAddForm = this.formService.createBrandForm();
  }

  closeColorAddModal() {
    this.colorAddModal.close();
  }
  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(() => {
        this.toastrService.success(colorModel.name, "Renk başarıyla eklendi");
        this.closeColorAddModal();
      })
    } else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Geçersiz form");
      this.colorAddForm.reset();
    }
  }
}
