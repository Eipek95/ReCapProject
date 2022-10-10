import { Component, Input, OnInit } from '@angular/core';
import { ConfirmOrderOutputModel } from 'src/app/models/paymentModels/confirm-order-output-model';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit {
  @Input() confirmOrderOutputModel: ConfirmOrderOutputModel;
  constructor() { }

  ngOnInit(): void {
  }

}
