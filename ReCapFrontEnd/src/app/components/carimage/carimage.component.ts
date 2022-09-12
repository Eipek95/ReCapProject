import { Component, OnInit } from '@angular/core';
import { Carimage } from 'src/app/models/carimage';
import { CarimageService } from 'src/app/services/carimage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css'],
})
export class CarimageComponent implements OnInit {
  carimages: Carimage[];
  constructor(private carImageService: CarimageService,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["carId"]){
        this.getCarImageById(params["carId"])
      }
      else{
        this.getCarImage()
      }
     })
  }
getCarImage(){
  this.carImageService.getCarsImage().subscribe((response) => {
    this.carimages = response.data;
  });
}
getImage(carImage:Carimage){
  return "https://localhost:7199/" + carImage.imagePath;
}

getActiveString(carImage:Carimage){
  if(carImage==this.carimages[0]){
    return "active"
  }else{
    return ""
  }
}
getCarImageById(carId:number){
  this.carImageService.getCarsByImageId(carId).subscribe((response) => {
    this.carimages = response.data;
  });
}
}
