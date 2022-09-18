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
}
