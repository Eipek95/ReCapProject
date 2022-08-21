using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using DataAccess.Concrete.InMermory;
using Entities.Concrete;

//CarTest();

//ColorTest();
//BrandTest();

CarManager carManager = new CarManager(new EfCarDal());
foreach (var carDetails in carManager.GetCarDetails())
{
    Console.WriteLine("Açıklama: "+carDetails.Description+" Renk: "+carDetails.ColorName+" Marka: "+carDetails.BriandName);
}
static void CarTest()
{
    CarManager carManager = new CarManager(new EfCarDal());
    Console.WriteLine("id----BrandId----ColorId----DailyPrice----ModelYear----Description");
    foreach (var cars in carManager.GetAll())
    {
        Console.WriteLine("{0}----{1}----{2}----{3}----{4}----{5}",
            cars.Id, cars.BrandId, cars.ColorId, cars.DailyPrice, cars.ModelYear, cars.Description);
    }



    Console.WriteLine("Get_Cars_By_Brand_Id=1");
    foreach (var carBrand in carManager.GetCarsByBrandId(1))
    {
        Console.WriteLine(carBrand.DailyPrice + " " + carBrand.Description + " " + carBrand.ModelYear);
    }
    Console.WriteLine("Get_Cars_By_Color_Id=1");
    foreach (var carBrand in carManager.GetCarsByColorId(1))
    {
        Console.WriteLine(carBrand.DailyPrice + " " + carBrand.Description + " " + carBrand.ModelYear);
    }
}

static void ColorTest()
{
    ColorManager colorManager = new ColorManager(new EfColorDal());
    foreach (var colors in colorManager.GetColors())
    {
        Console.WriteLine(colors.Id);
    }
}

static void BrandTest()
{
    BrandManager brandManager = new BrandManager(new EfBrandDal());
    foreach (var brands in brandManager.GetBrands())
    {
        Console.WriteLine(brands.Id);
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


