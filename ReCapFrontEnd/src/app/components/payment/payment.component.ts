import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CreditCard } from 'src/app/models/creditcard';
import { Customer } from 'src/app/models/customer';
import { PaymentOutputModel } from 'src/app/models/paymentModels/payment-output-model';
import { Rental } from 'src/app/models/rental';
import { RentPaymentRequest } from 'src/app/models/rentpaymentrequest';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthcustomserviceService } from 'src/app/services/authcustomservice.service';
import { CartService } from 'src/app/services/cart.service';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paySavedCard: boolean = false;
  savedCreditCards: CreditCard[] = [];
  currentUser: UserForLogin;
  selectedSavedCreditCard: number = 0;
  paymentForm: FormGroup;
  isCreditCardSaving: boolean = false;
  @Input() cartItems: CartItem[];

  @Output() paymentOutputModel: EventEmitter<PaymentOutputModel> = new EventEmitter<PaymentOutputModel>();

  constructor(
    private customerService: CustomerService,
    private creditCardService: CreditcardService,
    private toastrService: ToastrService,
    private dateTimeService: DateTimeService,
    private formBuilder: FormBuilder,
    private authService: AuthcustomserviceService,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
    this.currentUser = this.authService.getUser()!;
    this.getCustomerId().then(customerId => {
      this.getSavedCreditCards(customerId).then((savedCreditCards) => {
        savedCreditCards.forEach(creditCard => {
          this.savedCreditCards.push(creditCard);
        });
        this.paySavedCard = this.savedCreditCards.length > 0 ? true : false
      });
    })
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderFullName: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      cardNumber: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      expireYear: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      expireMonth: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }
  confirmCreditCard() {
    if (this.paySavedCard) {
      let usingCard: CreditCard = this.savedCreditCards[this.selectedSavedCreditCard];
      this.paymentForm.setValue({ cardHolderFullName: usingCard.cardHolderFullName, cardNumber: usingCard.cardNumber, expireYear: usingCard.expireYear, expireMonth: usingCard.expireMonth, cvc: usingCard.cvc })
    }

    if (this.paymentForm.valid) {
      this.getCustomerId().then(customerId => {
        let rentRequest: RentPaymentRequest = Object.assign({}, this.paymentForm.value);
        rentRequest.customerId = customerId;
        rentRequest.amount = this.calculateTotalAmount();
        rentRequest.rentals = this.createRentals(customerId);

        let paymentOutputModel: PaymentOutputModel = {
          rentPaymentRequest: rentRequest,
          isCreditCardSaving: this.isCreditCardSaving
        };
        this.paymentOutputModel.emit(paymentOutputModel);
        this.paymentForm.reset();
      }, () => { })
    } else {
      this.toastrService.error("L??tfen kart bilgilerinizi eksiksiz doldurunuz", "Kart bilgileri eksik")
    }
  }
  createRentals(customerId: number): Rental[] {
    let rentals: Rental[] = [];
    this.cartItems.forEach(cartItem => {
      let rental: Rental = new Rental;
      rental.carId = cartItem.car.id;
      rental.customerId = customerId;
      rental.rentDate = cartItem.rentDate;
      rental.returnDate = cartItem.returnDate;
      rentals.push(rental);
    });
    return rentals;
  }

  calculateTotalAmount(): number {
    return this.cartService.calculateTotalAmount();
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  getSavedCreditCards(customerId: number): Promise<CreditCard[]> {
    return new Promise<CreditCard[]>((methodResolve) => {
      this.creditCardService.getSavedCreditCards(customerId).subscribe((successResult) => {
        methodResolve(successResult.data);
      }, () => {
        methodResolve([]);
      });
    })
  }

  resetSelectedSavedCreditCard() {
    this.selectedSavedCreditCard = 0;
  }

  deleteCreditCard(creditCard: CreditCard) {
    this.getCustomerId().then((customerId) => {
      let customerCreditCardModel = {
        creditCard: creditCard,
        customerId: customerId
      }
      this.creditCardService.deleteCreditCard(customerCreditCardModel).subscribe(() => {
        this.getSavedCreditCards(customerId).then(savedCreditCards => {
          this.savedCreditCards = savedCreditCards;
          if (this.savedCreditCards.length === 0) {
            this.paySavedCard = false;
          }
        })
        this.toastrService.success("Kay??tl?? kredi kart??n??z ba??ar??yla silindi", "Kredi kart?? silindi");
      }, () => {
        this.toastrService.error("Kay??tl?? kredi kart??n??z silinirken bir sorun olu??tu", "Kredi kart?? silinemedi");
      })
    })
  }

  getCustomerId(): Promise<number> {
    return new Promise<number>((methodResolve) => {
      this.customerService.getCustomerByUserId(this.currentUser.id).subscribe(successResult => {
        methodResolve(successResult.data.id);
      }, () => {  //If the user is not a customer, save it as a customer
        let addedCustomer = new Customer;
        addedCustomer.userId = this.currentUser.id;
        addedCustomer.companyName = "Test Company Name";
        this.customerService.addCustomer(addedCustomer).subscribe(successAddedResult => {
          methodResolve(successAddedResult.data);
        })
      })
    })
  }

  getCreditCardLogoSource(cardNumber: string) {
    return this.creditCardService.getCreditCardLogoSource(cardNumber);
  }

  increaseSelectedCreditCardIndex() {
    let savedCreditCardsCarousel = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < savedCreditCardsCarousel.length; i++) {
      if (savedCreditCardsCarousel[i].className.search("active") != -1) {
        let selectedCreditCardIndex = Number(savedCreditCardsCarousel[i].getAttribute("data-index"))
        if (selectedCreditCardIndex < this.savedCreditCards.length - 1 && selectedCreditCardIndex == this.selectedSavedCreditCard) { //Bu i??lemi yapmam??n sebebi, bir ??nceki sat??rda tespit edilen index de??erinin asl??nda t??klamadan hemen ??nceki index de??eri olmas??d??r. Bu metod carousel'de bir sonraki itemin indexini verece??i i??in tespit edilen index de??erini bir artt??rarak ger??ek index de??erine ula????yorum. ??kinci ko??ulu eklememin sebebi ise, sol ok tu??una bas??ld??????nda (decreaseSelectedCreditCardIndex metodu ??a????r??ld??????nda) kredi kart?? DE????????RKEN sa?? ok tu??una bas??l??rsa (bu metod ??a????r??l??rsa) do??ru index de??erini yakalamakt??r.
          selectedCreditCardIndex += 1;
          this.selectedSavedCreditCard = selectedCreditCardIndex;
        }
      }
    }
  }

  decreaseSelectedCreditCardIndex() {
    let savedCreditCardsCarousel = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < savedCreditCardsCarousel.length; i++) {
      if (savedCreditCardsCarousel[i].className.search("active") != -1) {
        let selectedCreditCardIndex = Number(savedCreditCardsCarousel[i].getAttribute("data-index"))
        if (selectedCreditCardIndex > 0 && selectedCreditCardIndex == this.selectedSavedCreditCard) { //Bu i??lemi yapmam??n sebebi, bir ??nceki sat??rda tespit edilen index de??erinin asl??nda t??klamadan hemen ??nceki index de??eri olmas??d??r. Bu metod carousel'de bir ??ncei itemin indexini verece??i i??in tespit edilen index de??erini bir azaltarak ger??ek index de??erine ula????yorum. ??kinci ko??ulu eklememin sebebi ise, sa?? ok tu??una bas??ld??????nda (increaseSelectedCreditCardIndex metodu ??a????r??ld??????nda) kredi kart?? DE????????RKEN sol ok tu??una bas??l??rsa (bu metod ??a????r??l??rsa) do??ru index de??erini yakalamakt??r.
          selectedCreditCardIndex -= 1;
          this.selectedSavedCreditCard = selectedCreditCardIndex;
        }
      }
    }
  }
}
