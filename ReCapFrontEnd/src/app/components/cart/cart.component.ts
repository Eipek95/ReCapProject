import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { ConfirmOrderOutputModel } from 'src/app/models/paymentModels/confirm-order-output-model';
import { PaymentOutputModel } from 'src/app/models/paymentModels/payment-output-model';
import { Result } from 'src/app/models/result';
import { UserForLogin } from 'src/app/models/userForLogin';
import { CarimageService } from 'src/app/services/carimage.service';
import { CartService } from 'src/app/services/cart.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  checkOutStep: number = 0;
  currentUser: UserForLogin;

  paymentOutputModel: PaymentOutputModel;
  confirmOrderOutputModel: ConfirmOrderOutputModel;
  constructor(
    private cartService: CartService,
    private toastrService: ToastrService,
    private carImagesService: CarimageService,
    public dateTimeService: DateTimeService
  ) { }

  ngOnInit(): void {
    this.resetCart();
    this.getCart();
  }
  goCheckOutStep(step: Number) {
    switch (step) {
      case 0: {
        this.paymentOutputModel = undefined!
        this.checkOutStep = 0;
        break;
      }
      case 1: {
        this.paymentOutputModel = undefined!
        this.checkOutStep = 1;
        break;
      }
      case 2: {
        this.checkOutStep = 2;
        break;
      }
    }
  }

  createConfirmOrderInputModel() {
    let confirmOrderInputModel = {
      cartItems: this.cartItems,
      isCreditCardSaving: this.paymentOutputModel.isCreditCardSaving,
      rentPaymentRequest: this.paymentOutputModel.rentPaymentRequest
    };

    return confirmOrderInputModel;
  }

  setPaymentOutputModel(paymentOutputModel: PaymentOutputModel) {
    this.paymentOutputModel = paymentOutputModel;
    this.checkOutStep = 2;
  }

  setConfirmOrderOutputModel(confirmOrderOutputModel: ConfirmOrderOutputModel) {
    this.confirmOrderOutputModel = confirmOrderOutputModel;
    this.finishPayment();
  }

  resetCart() {
    this.checkOutStep = 0;
    this.cartItems = [];
    this.paymentOutputModel = undefined!
    this.confirmOrderOutputModel = undefined!
  }

  finishPayment() {
    this.cartService.clearCart();
    this.checkOutStep = 0;
    this.cartItems = [];
    this.paymentOutputModel = undefined!
  }

  confirmCart() {
    this.checkOutStep = 1;
  }

  calculateTotalAmount(): number {
    return this.cartService.calculateTotalAmount();
  }

  calculateTotalRentalPeriod(): number {
    return this.cartService.calculateTotalRentalPeriod(this.cartItems);
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  showDate(date: Date) {
    return this.dateTimeService.showDate(date);
  }

  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  removeFromCart(car: Car) {
    let result: Result = this.cartService.removeFromCart(car);
    result.success ? this.toastrService.success(result.message, `${car.brandName} ${car.description}`) : this.toastrService.error(result.message, `${car.brandName} ${car.description}`);
  }

  getCart() {
    this.cartItems = this.cartService.listOfCar();
  }
}
