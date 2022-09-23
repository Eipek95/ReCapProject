import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/services/form.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerAddForm: FormGroup;
  constructor(
    private registerAddModal: MatDialogRef<RegisterComponent>,
    private formService:FormService,
    private registerService: RegisterService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createRegisterAddForm();
  }
  createRegisterAddForm() {
    this.registerAddForm = this.formService.createRegisterForm();
  }
  closeRegisterAddModal() {
    this.registerAddModal.close();
  }
  add() {
    let registerModel = Object.assign({}, this.registerAddForm.value);
    console.log(registerModel.firstName+registerModel.lastName+registerModel.email+" ----><"+registerModel.password)
  if (this.registerAddForm.valid) {
      
     
      this.registerService.add(registerModel).subscribe(() => {
        this.toastrService.success(registerModel.firstName+" "+registerModel.lastname, "başarıyla eklendi");
        this.closeRegisterAddModal();
      })
    } else {
      this.toastrService.error("Geçersiz Form", "Geçersiz form");
      this.registerAddForm.reset();
    }
  }
}
