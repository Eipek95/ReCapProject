import { Carimage } from "./carimage";

export interface CarDetailDto{
    id:number;
    carName:string;
    briandName:string;
    colorName:string;
    dailyPrice:number;
    description:string;
    carImages:Carimage[];
}

