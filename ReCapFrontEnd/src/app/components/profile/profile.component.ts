import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { AuthcustomserviceService } from 'src/app/services/authcustomservice.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  isLoggedIn: Observable<boolean>;
  currentUser: UserForLogin;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthcustomserviceService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createUpdateProfileForm();
    this.createChangePasswordForm();
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.currentUser = this.authService.getUser()!;
    })
  }
  createUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }
  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      newPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmNewPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmNewPassword')
    })
  }
  updateProfile() {
    if (this.updateProfileForm.valid) {
      let user: User = Object.assign({}, this.updateProfileForm.value);
      user.email = this.currentUser.email;
      user.id = String(this.currentUser.id);
      this.userService.updateProfile(user).subscribe(() => {
        this.logOutAndGoLoginPage();
        this.toastrService.success("L??tfen tekrar giri?? yap??n??z", "Profiliniz ba??ar??yla g??ncellendi");
      })
    } else {
      this.toastrService.error("Girilen bilgilerden en az birisi hatal??", "Hatal?? bilgiler")
    }
  }
  changePassword() {
    if (this.changePasswordForm.valid) {
      let changePasswordModel = Object.assign({}, this.changePasswordForm.value);
      delete changePasswordModel["confirmNewPassword"]
      changePasswordModel.email = this.currentUser.email;
      this.authService.changePassword(changePasswordModel).subscribe(() => {
        this.logOutAndGoLoginPage();
        this.toastrService.success("L??tfen tekrar giri?? yap??n??z", "??ifreniz ba??ar??yla g??ncellendi");
      });
    } else {
      this.toastrService.error("Girilen ??ifrelerden en az birisi ge??ersiz", "Hatal?? bilgiler")
    }
  }
  logOutAndGoLoginPage() {
    this.authService.logOut();
    this.router.navigate(["account/login"])
  }
}
