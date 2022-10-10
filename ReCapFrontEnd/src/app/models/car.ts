import { Carimage } from "./carimage";

export interface Car {
  id: number,
  brandId:number,
  brandName:string,
  colorId:number,
  colorName:string;
  minFindexScore: number;
  modelYear:number,
  dailyPrice:number,
  description: string
  carImages: Carimage[];
}

