import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserClaim } from 'src/app/models/userclaim';
import { UserclaimService } from 'src/app/services/userclaim.service';

@Component({
  selector: 'app-userclaim',
  templateUrl: './userclaim.component.html',
  styleUrls: ['./userclaim.component.css']
})
export class UserclaimComponent implements OnInit {
  userClaim:UserClaim[]=[]
  constructor(private userClaimService:UserclaimService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getClaimDetail()
  }
  getClaimDetail(){
    this.userClaimService.getClaimDetail().subscribe((response) => {
      this.userClaim = response.data;
    });
  }
  deneme(){
this.toastrService.success("Başarılı","Sonuç")  }
}
