using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using DataAccess.Concrete.InMermory;
using Entities.Concrete;

//CarTest();

//ColorTest();
//BrandTest();

//ResultGetCarDetailsTest();

//ResultGetCustomerTest();

//RentalAddTest();



//GetRentalDetail();
static void CarTest()
{
   
}

static void ColorTest()
{
    ColorManager colorManager = new ColorManager(new EfColorDal());
    foreach (var colors in colorManager.GetColors().Data)
    {
        Console.WriteLine(colors.Id);
    }
}

static void BrandTest()
{
    BrandManager brandManager = new BrandManager(new EfBrandDal());
    foreach (var brands in brandManager.GetBrands().Data)
    {
        Console.WriteLine(brands.Id);
    }
}

static void ResultGetCarDetailsTest()
{
  
}

static void ResultGetCustomerTest()
{
    
}

static void RentalAddTest()
{


    static void GetRentalDetail()
    {

    }
}


#region oldCodes
//foreach (var car in carManager.GetCars())
//{
//    Console.WriteLine(car.Description);
//}

//foreach (var car in carManager.GetABI(1))
//{
//    Console.WriteLine(car.ModelYear);
//}

//Car car1 = new Car() { Id = 3, BrandId = 1, ColorId = 2, DailyPrice = 50000, Description = "Yarı Otomatik", ModelYear = 2023 };
//carManager.Add(car1);

//foreach (var car in carManager.GetCars())
//{
//    Console.WriteLine(car.Description);
//}



//Console.WriteLine("______");
//foreach (var item in carManager.OrderPriceCarList("z"))
//{
//    Console.WriteLine(item.Description + " " + item.DailyPrice);
//}


//var result = from c in carManager.GetCars()
//             where c.DailyPrice > 20000
//             orderby c.DailyPrice descending
//             select c;

//foreach (var item in result)
//{
//    Console.WriteLine(item.DailyPrice);
//}


//Console.WriteLine("CarDTO_______");
//var result2 = from p in carManager.GetCars()
//              where p.ModelYear > 2000
//              select new CarDto { Id = p.Id, Description = p.Description, ModelYear = p.ModelYear };
//foreach (var item in result2)
//{
//    Console.WriteLine(item.Id+" "+item.ModelYear+" "+item.Description);
//}

//class CarDto
//{
//    public int Id { get; set; }
//    public int ModelYear { get; set; }
//    public string Description { get; set; }

//}
#endregion
//CustomerManager customerManager = new CustomerManager(new EfCustomerDal());
//customerManager.AddCustomer(new Customer
//{
//    UserId = 1,
//    CompanyName = "Software Center"
//});

//UserManager userManager = new UserManager(new EfUserDal());
//userManager.AddUser(
//    new User
//    {
//        FirstName="Emre",
//        LastName="İpek",
//        Email="deneme@gmail.com",
//        Password="123456"
//    });


