import { Carimage } from "./carimage";

export interface Car {
  id: number,
  brandId:number,
  brandName:string,
  colorId:number,
  colorName:string;
  modelYear:number,
  dailyPrice:number,
  description: string
  carImages: Carimage[];
}

