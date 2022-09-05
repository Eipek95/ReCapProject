import { Customer } from "./customer";
import { ResponseModel } from "./responseModel";

export interface CustomerRepsonseModel extends ResponseModel{
data: Customer[];
}