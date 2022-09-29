import { Carimage } from "./carimage";

export interface CarDetailDto{
    id:number;
    carName:string;
    brandName:string;
    colorName:string;
    dailyPrice:number;
    description:string;
    carImages:Carimage[];
}

