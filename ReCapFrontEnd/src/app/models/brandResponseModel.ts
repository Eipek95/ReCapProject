import { Brand } from "./brand";
import { ResponseModel } from "./responseModel";

export interface BrandRepsonseModel extends ResponseModel{
data: Brand[];
}