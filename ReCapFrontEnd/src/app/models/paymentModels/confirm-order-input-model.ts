import { CartItem } from "../cartItem";
import { PaymentOutputModel } from "./payment-output-model";


export interface ConfirmOrderInputModel extends PaymentOutputModel {
    cartItems: CartItem[]
}