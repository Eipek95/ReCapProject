import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/cardetaildto';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup
  currentCar:CarDetailDto
  car:Car
  currentId:number
  constructor(
    private carService:CarService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activetedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      this.getCar(params["carId"]);
     this.currentId=params["carId"]
    })
    this.createCarUpdateForm();
  }
  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }
  getCar(carId:number){
    this.carService.getCar(carId).subscribe(response=>{
      this.car = response.data;
      this.carUpdateForm.controls["brandId"].setValue(this.car.brandId);
      this.carUpdateForm.controls["colorId"].setValue(this.car.colorId);
      this.carUpdateForm.controls["modelYear"].setValue(this.car.modelYear);
      this.carUpdateForm.controls["dailyPrice"].setValue(this.car.dailyPrice);
      this.carUpdateForm.controls["description"].setValue(this.car.description);
    })
  }
  update(){
    let carModel: Car = Object.assign({}, this.carUpdateForm.value);
    if (this.carUpdateForm.valid) {
      carModel.id=this.currentId
      console.log(carModel.id)
      this.carService.update(carModel).subscribe((response) => {
        this.toastrService.success(response.message);
      }, (responseError) => {
        if(responseError.error.Errors != null){
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i]);
            }
          }
        }
        else{
          this.toastrService.error(responseError.error.message,"Error");
        }
      });
    } else {
      this.toastrService.error("Required field missing","Error");
    }
  }
}