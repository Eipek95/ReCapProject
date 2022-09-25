import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor( private formBuilder: FormBuilder) { }
  
  createBrandForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }
  createColorForm():FormGroup{
    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }
  createCarForm():FormGroup{
    return this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['',Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice:['', Validators.required],
      description: ['', Validators.required]
    })
  }
  createDemoCarForm():FormGroup{
    return this.formBuilder.group({
      description: ['', Validators.required]
    })
  
  }
  createClaimForm():FormGroup{
    return this.formBuilder.group({
      name: ['', Validators.required]
    })
  }
  createRegisterForm():FormGroup{
    return this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
      firstName:['', Validators.required],
      lastName: ['', Validators.required]
    })
  
  }

}
