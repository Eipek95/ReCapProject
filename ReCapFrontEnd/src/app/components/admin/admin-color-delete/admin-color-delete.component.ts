import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-admin-color-delete',
  templateUrl: './admin-color-delete.component.html',
  styleUrls: ['./admin-color-delete.component.css']
})
export class AdminColorDeleteComponent implements OnInit {
  deletedColor: Color;
  constructor(
    private deleteColorModal: MatDialogRef<AdminColorDeleteComponent>,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }
  delete(color: Color) {
    this.colorService.delete(color).subscribe(response => {
      this.toastrService.success(color.name + " rengi silindi", "Silme işlemi başarılı")
      this.closeColorDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız")
    })
  }

  closeColorDeleteModal() {
    this.deleteColorModal.close();
  }
}
