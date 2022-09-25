import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/services/form.service';
import { OperationclaimService } from 'src/app/services/operationclaim.service';
@Component({
  selector: 'app-operationclaimadd',
  templateUrl: './operationclaimadd.component.html',
  styleUrls: ['./operationclaimadd.component.css']
})
export class OperationclaimaddComponent implements OnInit {
  claimAddForm: FormGroup;
  constructor(
    private claimService: OperationclaimService,
    private toastrService: ToastrService,
    private claimAddModal: MatDialogRef<OperationclaimaddComponent>,
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.createClaimAddForm();
  }
  createClaimAddForm() {
    this.claimAddForm = this.formService.createBrandForm();
  }

  closeColorAddModal() {
    this.claimAddModal.close();
  }
  add() {
    if (this.claimAddForm.valid) {
      let claimModel = Object.assign({}, this.claimAddForm.value);
      this.claimService.add(claimModel).subscribe(() => {
        this.toastrService.success(claimModel.name, "Rol başarıyla eklendi");
        this.closeColorAddModal();
      })
    } else {
      this.toastrService.error("Rol adı 2-50 karakter arasında olmalıdır", "Geçersiz form");
      this.claimAddForm.reset();
    }
  }
}
