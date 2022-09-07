import { Component, OnInit } from '@angular/core';
import { Cbrand } from 'src/app/models/cbrand';
import { CbrandService } from 'src/app/services/cbrand.service';

@Component({
  selector: 'app-cbrand',
  templateUrl: './cbrand.component.html',
  styleUrls: ['./cbrand.component.css']
})
export class CbrandComponent implements OnInit {

  cbrands:Cbrand[]=[];
  constructor(private cbrandService:CbrandService) { }

  ngOnInit(): void {
    this.getCbrand();
  }

  getCbrand(){
    this.cbrandService.getCbrands().subscribe((response) => {
      this.cbrands = response.data;
    });
  }
}
