using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Constants
{
    public static class Messages
    {

        public static string CarAdded = "Car's been added !";
        public static string CarNameInvalid = "Car Name is invalid !";
        public static string CarDeleted = "Car's been deleted !";
        public static string CarsListed = "Cars've been listed !";
        public static string CarUpdated = "Car's been updated !";

        public static string UsersListed = "Users've been listed";
        public static string UserAdded = "User's been added";
        public static string UserDeleted = "User's been deleted";
        public static string UserUpdated = "User's been updated";

        public static string CustomerUpdated = "Customer's been updated";
        public static string CustomerAdded = "Customer's been added";
        public static string CustomerDeleted = "Customer's been deleted";
        public static string CustomerListed = "Customers've been listed";

        public static string RentalAdded = "Rental's been added";
        public static string RentalDeleted = "Rental's been deleted";
        public static string RentalUpdated = "Rental's been updated";
        public static string RentalListed = "Rentals've been listed";
        public static string RentalIsNotAdded = "Car cannot rental because of it is not returned";
        public static string RentalIsNotFount = "Car is not found";



        public static string ImageAdded = "Fotoğraf Eklendi!";
        public static string ImageDeleted = "Fotoğraf Silindi!";
        public static string ImageUpdated = "Fotoğraf Güncellendi!";
        public static string ImageGetAll = "Fotoğraflar Listelendi!";
        public static string ImageNotFound = "Fotoğraf Bulunamadı!";
        public static string ImageError = "Fotoğraf Eklenemedi!";
        public static string ImageGetById = "Fotoğraf ID Bilgisine Göre Getirildi!";



        public static string MaintenanceTime = "Sistem Bakımda!";
        public static string ErrorMessage = "Hata!";
        public static string AuthorizationDenied = "Yetkiniz Yok!";
        public static string UserRegistered = "Kayıt Başarılı!";
        public static string UserNotFound = "Kullanıcı Bulunamadı!";
        public static string SuccessfulLogin = "Giriş Başarılı!";
        public static string PasswordError = "Hatalı Şifre!";
        public static string AccessTokenCreated = "Access Token Created!";
        public static string GetClaimMessage = "Claims Listed!";
        public static string AddClaimMessage = "Claims been added!";
        public static string UpdateClaimMessage = "Claims been updated!";
        public static string DeleteClaimMessage = "Claims been deleted!";
        public static string ClaimNameInvalid = "Claim Name is invalid !";
        public static string GetByMail = "Claims Listed with Mail!";


        public static string UserAlreadyExists = "Kullanıcı Zaten Mevcut";
        public static string CreditCardNotValid = "Kredi Kartı Geçersiz";
        public static string CreditCardListed = "Kredi Kartı Listelendi";
        public static string CreditCardNotFound = "Kredi Kartı Bulunamadı";

        public static string StringMustConsistOfNumbersOnly = "String, sadece sayilardan olusmalidir";
        public static string InsufficientCardBalance = "Kart bakiyesi yetersiz";
        public static string PaymentSuccessful = "Odeme basariyla tamamlandi";
        public static string CustomersCreditCardsListed = "Müsterinin kredi kartlari listelendi";
        public static string CustomerCreditCardAlreadySaved = "Kredi karti zaten kaydedilmis";
        public static string CustomerCreditCardSaved = "Müsteri kredi karti basariyla kaydedildi";
        public static string CustomerCreditCardFailedToSave = "Müsteri kredi karti kaydedilemedi";
        public static string CustomerCreditCardDeleted = "Musteri kredi karti basariyla silindi";
        public static string CustomerCreditCardNotDeleted = "Musteri kredi karti silinemedi";
        public static string CustomerCreditCardNotFound = "Müsteri kredi karti bulunamadi";
        public static string CarImageAdded = "Resimler Başarıyla Eklendi";
        public static string CarImageIdNotExist = "Araç Bulunamadı";
        public static string ErrorUpdatingImage = "Araç Resimleri Güncellenemedi";
        public static string CarImageUpdated = "Araç Resimleri Güncellendi";
        public static string ErrorDeletingImage = "Araç Resimleri Silinemedi";
        public static string NoPictureOfTheCar = "Araca Ait Resim Yok";
        public static string CarImageDeleted = "Araca Ait Resimler Silindi";
        public static string RentalCarNotAvailable = "Kiralanacak Araç Müsait Değil";
        public static string ReservationBetweenSelectedDatesExist = "Seçilen tarihler arasında rezarvasyon var";
        public static string CarCanBeRentedBetweenSelectedDates= "Seçilen Tarihler Arasında Araç Kiralanabilir";
        public static string RentalsListed="Kiralıklar Listelendi";
        public static string DeliveryStatusCanNotBeNull= "Teslimat Durumu Boş Olamaz";
        public static string DeliveryStatusMustBeFalse= "Teslimat Durumu Yanlış Olmalıdır";
        public static string DeliveryStatusMustBeNull = "Teslimat Durumu Boş Olmalıdır";
        public static string CarAlreadyRentedByTheReservationDate= "Araba Zaten Rezervasyon Tarihinde Kiralanmış";
        public static string RentDateMustBeGreaterThanReturnDate= "Kiralama Tarihi İade Tarihinden Daha Büyük Olmalı";
        public static string LeastOneCustomerIdDoesNotMatch= "En Az Bir Müşteri Kimliği Eşleşmiyor";
        public static string InsufficientFindexScore= "Yetersiz Findex Score";
        public static string TotalAmountNotMatch= "Toplam Tutar Eşleşmiyor";
        public static string RentalSuccessful="Kiralama Başarılı";
        public static string RentalNotExist= "Kiralama Yok";
        public static string UserEmailNotAvailable= "Kullanıcı E-postası Kullanılamaz";
        public static string NotAddedCustomer="Kullanıcı Eklenemedi";
        public static string PasswordChanged="Şifre Değişti";
    }
}
