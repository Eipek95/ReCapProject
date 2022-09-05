import { Color } from "./color";
import { ResponseModel } from "./responseModel";

export interface ColorRepsonseModel extends ResponseModel{
data: Color[];
}