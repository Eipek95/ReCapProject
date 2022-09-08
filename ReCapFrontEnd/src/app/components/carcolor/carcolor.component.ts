import { Component, OnInit } from '@angular/core';
import { Carcolor } from 'src/app/models/carcolor';
import { CarcolorService } from 'src/app/services/carcolor.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-carcolor',
  templateUrl: './carcolor.component.html',
  styleUrls: ['./carcolor.component.css']
})
export class CarcolorComponent implements OnInit {
carcolor:Carcolor[];
  constructor(private carcolorService:CarcolorService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
        this.getCarsByColor(params["colorId"])
     })
  }
  getCarsByColor(colorId: number) {
    this.carcolorService.getCarsByColor(colorId).subscribe((response) => {
      this.carcolor = response.data;
    });
  }
}
