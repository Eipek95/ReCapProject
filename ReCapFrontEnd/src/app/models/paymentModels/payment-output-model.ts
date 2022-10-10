import { RentPaymentRequest } from "../rentpaymentrequest";

export interface PaymentOutputModel {
    rentPaymentRequest: RentPaymentRequest;
    isCreditCardSaving: boolean;
}