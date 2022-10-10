import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CreditCard } from 'src/app/models/creditcard';
import { ConfirmOrderInputModel } from 'src/app/models/paymentModels/confirm-order-input-model';
import { ConfirmOrderOutputModel } from 'src/app/models/paymentModels/confirm-order-output-model';
import { CarimageService } from 'src/app/services/carimage.service';
import { CartService } from 'src/app/services/cart.service';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  @Input() confirmOrderInputModel: ConfirmOrderInputModel;

  @Output() confirmOrderOutputModel: EventEmitter<ConfirmOrderOutputModel> = new EventEmitter<ConfirmOrderOutputModel>();

  constructor(
    private dateTimeService: DateTimeService,
    private carImagesService: CarimageService,
    private spinner: NgxSpinnerService,
    private rentalService: RentalService,
    private creditCardService: CreditcardService,
    private toastrService: ToastrService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }
  rent() {
    this.spinner.show();
    this.rentalService.rent(this.confirmOrderInputModel.rentPaymentRequest).subscribe(response => {
      if (this.confirmOrderInputModel.isCreditCardSaving === true) {
        this.saveCreditCard().then((result) => {
          result === true
            ? this.toastrService.success("Kredi kartı başarıyla kaydedildi", "Kredi kartı kaydedildi")
            : this.toastrService.warning("Kredi kartı kaydedilemedi", "Kredi kartı kaydedilemedi");
        });
      }
      this.toastrService.success(response.message, "Ödeme başarılı")

      let confirmOrderOutputModel = {
        numberOfTotalRentedCar: this.confirmOrderInputModel.cartItems.length,
        totalRentalDays: this.calculateTotalRentalPeriod(this.confirmOrderInputModel.cartItems),
        totalAmount: this.calculateTotalAmount(this.confirmOrderInputModel.cartItems),
        rentalDate: this.dateTimeService.getFullDateTimeNow(),
        paymentId: response.data
      };

      this.confirmOrderOutputModel.emit(confirmOrderOutputModel);
      this.spinner.hide();
    },
      error => {
        this.toastrService.error(error.error.message, "Ödeme başarısız")
        this.spinner.hide();
      });
  }

  saveCreditCard(): Promise<boolean> {
    return new Promise<boolean>((methodResolve) => {
      let creditCard = new CreditCard;
      let rentPaymentRequest = this.confirmOrderInputModel.rentPaymentRequest;
      creditCard.cardNumber = rentPaymentRequest.cardNumber;
      creditCard.expireYear = rentPaymentRequest.expireYear;
      creditCard.expireMonth = rentPaymentRequest.expireMonth;
      creditCard.cvc = rentPaymentRequest.cvc;
      creditCard.cardHolderFullName = rentPaymentRequest.cardHolderFullName;

      let customerCreditCardModel = {
        creditCard: creditCard,
        customerId: rentPaymentRequest.customerId
      }
      this.creditCardService.saveCreditCard(customerCreditCardModel).subscribe(() => {
        methodResolve(true);
      }, () => {
        methodResolve(false);
      })
    })
  }

  getCreditCardLogoSource(cardNumber: string) {
    return this.creditCardService.getCreditCardLogoSource(cardNumber);
  }

  calculateTotalAmount(cartItems: CartItem[]): number {
    let totalAmount: number = 0;
    cartItems.forEach(cartItem => {
      let rentalPeriod = this.getRentalPeriod(cartItem.rentDate, cartItem.returnDate)
      let amount = cartItem.car.dailyPrice * rentalPeriod
      totalAmount += amount;
    });
    return totalAmount;
  }

  calculateTotalRentalPeriod(cartItems: CartItem[]): number {
    return this.cartService.calculateTotalRentalPeriod(cartItems);
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  showDate(date: Date) {
    return this.dateTimeService.showDate(date);
  }
}
