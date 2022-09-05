import {Car} from "./car";
import { ResponseModel } from "./responseModel";

export interface CarRepsonseModel extends ResponseModel{
data: Car[];
}