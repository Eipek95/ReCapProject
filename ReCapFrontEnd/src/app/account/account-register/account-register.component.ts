import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthcustomserviceService } from 'src/app/services/authcustomservice.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css','../account-layout/account-layout.component.css']
})
export class AccountRegisterComponent implements OnInit {
  registerForn:FormGroup
  showErrorMessages:boolean=true
  rememberMe:boolean=false
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthcustomserviceService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForn = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }
  register() {
    if (this.registerForn.valid) {
      let newUser = Object.assign({}, this.registerForn.value);
      delete newUser["confirmPassword"]
      this.authService.register(newUser).subscribe(successResponse => {
        this.localStorageService.add("token", successResponse.data.token);
        if (this.rememberMe) {
          this.saveEmail(newUser.email);
        }
        this.authService.isLoggedIn = true;
        this.router.navigate([""]);
        this.toastrService.success("İşlem başarılı", "Giriş yapıldı");
      })
    } else {
      this.toastrService.error("Bilgilerinizden bazıları doğrulanamadı", "Formunuz hatalı");
    }
  }

  saveEmail(email: string) {
    this.localStorageService.add("remember", email);
  }
}
