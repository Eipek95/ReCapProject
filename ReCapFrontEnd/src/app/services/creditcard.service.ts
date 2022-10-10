import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditcard';
import { ListResponseModel } from '../models/listResponseModel';
import { CustomerCreditCardModel } from '../models/paymentModels/customerCreditCardModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {
private apiUrl="https://localhost:7199/api/CreditCards/"
  constructor(private httpClient:HttpClient) { }


  getSavedCreditCards(customerId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'getcreditcardsbycustomerid'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerId);
  }
  saveCreditCard(customerCreditCardModel: CustomerCreditCardModel) {
    let newPath = this.apiUrl + 'savecreditcard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerCreditCardModel);
  }
  deleteCreditCard(customerCreditCardModel: CustomerCreditCardModel) {
    let newPath = this.apiUrl + 'deletecreditcard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerCreditCardModel);
  }
  getCreditCardLogoSource(cardNumber: string) {
    if (cardNumber == null) {
      return '';
    } else {
      let startNum = cardNumber.charAt(0)
      if (startNum == '4') {
        return '/assets/images/visa.png'
      } else if (startNum == '5') {
        return '/assets/images/master-card.png'
      } else {
        return '';
      }
    }
}
}

