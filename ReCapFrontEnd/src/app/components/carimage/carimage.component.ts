import { Component, OnInit } from '@angular/core';
import { Carimage } from 'src/app/models/carimage';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {

  carimages:Carimage[];
  constructor(private carImageService:CarimageService) { }

  ngOnInit(): void {
    this.getCarImage();
  }
getCarImage(){
  this.carImageService.getCarsImage().subscribe((response) => {
    this.carimages = response.data;
  });
}

}
