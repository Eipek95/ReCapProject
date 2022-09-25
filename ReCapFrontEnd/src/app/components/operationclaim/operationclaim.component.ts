import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationclaim';
import { OperationclaimService } from 'src/app/services/operationclaim.service';
import { OperationclaimaddComponent } from '../operationclaimadd/operationclaimadd.component';
import { OperationclaimupdateComponent } from '../operationclaimupdate/operationclaimupdate.component';

@Component({
  selector: 'app-operationclaim',
  templateUrl: './operationclaim.component.html',
  styleUrls: ['./operationclaim.component.css'],
})
export class OperationclaimComponent implements OnInit {
  claims: OperationClaim[] = [];
  constructor(
    private claimService: OperationclaimService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getClaimDetail();
  }
  getClaimDetail() {
    this.claimService.getClaims().subscribe((response) => {
      console.log('---' + response.data);
      this.claims = response.data;
    });
  }
  showClaimAddModal() {
    const claimAddModal = this.dialog.open(OperationclaimaddComponent, {
      disableClose: true,
      width: '25%',
    });

    claimAddModal.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  showClaimUpdateModal(claim: OperationClaim) {
    const claimUpdateModal = this.dialog.open(OperationclaimupdateComponent, {
      disableClose: true,
      width: '30%',
    });
    claimUpdateModal.componentInstance.currentClaim = claim;

    claimUpdateModal.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  deleteClaim(claim: OperationClaim) {
    this.claimService.delete(claim).subscribe(() => {
    
      this.toastrService.success(claim.name + ' silindi', 'Silme başarılı');
      this.ngOnInit();
    });
  }
}
