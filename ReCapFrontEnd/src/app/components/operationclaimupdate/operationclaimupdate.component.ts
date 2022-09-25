import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationclaim';
import { FormService } from 'src/app/services/form.service';
import { OperationclaimService } from 'src/app/services/operationclaim.service';

@Component({
  selector: 'app-operationclaimupdate',
  templateUrl: './operationclaimupdate.component.html',
  styleUrls: ['./operationclaimupdate.component.css']
})
export class OperationclaimupdateComponent implements OnInit {
currentClaim:OperationClaim
claimUpdateForm:FormGroup
  constructor(
    private claimService: OperationclaimService,
    private toastrService: ToastrService,
    private updateModal: MatDialogRef<OperationclaimupdateComponent>,
    private formService: FormService 
  ) { }

  ngOnInit(): void {
    this.createClaimUpdateForm();
  }
  update() {
    if (this.claimUpdateForm.valid) {
      let newClaim = Object.assign({}, this.claimUpdateForm.value);
      newClaim.id = this.currentClaim.id;

      if (newClaim.name == this.currentClaim.name) {
        this.toastrService.error("Rol adı eskisiyle aynı", "Güncelleme yapılmadı");
        return;
      }

      this.claimService.update(newClaim).subscribe(() => {
        this.toastrService.success(
          this.currentClaim.name + ", " + newClaim.name + " şeklinde güncellendi", "Güncelleme başarılı");
        this.closeUpdateModal();
      })
    } 
    else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.claimUpdateForm.reset();
    }
  }
  closeUpdateModal() {
    this.updateModal.close();
  }
  createClaimUpdateForm() {
    this.claimUpdateForm = this.formService.createClaimForm();
  }
}
