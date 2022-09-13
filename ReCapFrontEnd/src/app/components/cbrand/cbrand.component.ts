import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cbrand } from 'src/app/models/cbrand';
import { CbrandService } from 'src/app/services/cbrand.service';

@Component({
  selector: 'app-cbrand',
  templateUrl: './cbrand.component.html',
  styleUrls: ['./cbrand.component.css'],
})
export class CbrandComponent implements OnInit {
  cbrands: Cbrand[] = [];
  filterText="";
  constructor(
    private cbrandService: CbrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params)=>{
    if(params["id"]){
      this.getCarsByBrand(params["id"])
    }
    else{
      this.getCbrand()
    }
   })
  }

  getCbrand() {
    this.cbrandService.getCbrands().subscribe((response) => {
      this.cbrands = response.data;
    });
  }
  getCarsByBrand(id: number) {
    this.cbrandService.getCarsByBrand(id).subscribe((response) => {
      this.cbrands = response.data;
    });
  }
}
