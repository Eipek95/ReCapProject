import { Rental } from "./rental";
import { ResponseModel } from "./responseModel";

export interface RentalRepsonseModel extends ResponseModel{
    data: Rental[];
    }