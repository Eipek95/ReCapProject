using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.InMermory
{
    public class InMemoryCarDal : ICarDal
    {
        List<Car> _cars;

        public InMemoryCarDal()
        {
            _cars = new List<Car>()
            {
                new Car(){Id=1,BrandId=1,ColorId=1,ModelYear=2022,DailyPrice=20000,Description="Otomatik"},
                new Car(){Id=2,BrandId=1,ColorId=1,ModelYear=2012,DailyPrice=15000,Description="Düz"},
                new Car(){Id=3,BrandId=1,ColorId=1,ModelYear=2012,DailyPrice=75000,Description="otomatik"},
            };
        }

        public void Add(Car car)
        {
            _cars.Add(car);
        }

        public void Delete(Car car)
        {
            Car carToDelete = _cars.SingleOrDefault(x => x.Id == car.Id);
            _cars.Remove(carToDelete); 
        }

        public List<Car> GeGetById(int carID)
        {
            return _cars.Where(x => x.Id == carID).ToList();
        }

        public List<Car> GetCars()
        {
            return _cars;
        }

        public void Update(Car car)
        {
            Car carToDelete = _cars.SingleOrDefault(_x => _x.Id == car.Id);
            carToDelete.BrandId = car.BrandId;
            carToDelete.ColorId = car.ColorId;
            carToDelete.ModelYear = car.ModelYear;
            carToDelete.DailyPrice = car.DailyPrice;
            carToDelete.Description = car.Description;
        }


        public bool ListInContent(Car car)//liste gelen paramtreyi içeriyor mu
        {
            var result = _cars.Any(x=>x.Id==car.Id);
            return result;
        }

        public Car FindInContent(Car car)
        {
            var content=_cars.Find(x=>x.Id==car.Id);
            if (content != null)
                return content;
            else
                return null;
        }


        //findAll()-->liste dönderir.koşulu sağlarsa liste dönderir.where olarakta kullanılabilir


        public List<Car> OrderPriceCarList(string searchWord)//istenilen kelimeyi içeren verileri fiyata göre sırala
        {
            var result = _cars.Where(x => x.Description.Contains(searchWord)).OrderBy(x => x.DailyPrice);
            return result.ToList();
        }

        public List<Car> GetAll(Expression<Func<Car, bool>> filter = null)
        {
            throw new NotImplementedException();
        }

        public Car Get(Expression<Func<Car, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public List<CarDetailDto> GetCarDetails()
        {
            throw new NotImplementedException();
        }

        public List<BrandDetailDto> GetCarByBrandIdDetails()
        {
            throw new NotImplementedException();
        }

        public List<ColorDetailDto> GetCarByColorIdDetails()
        {
            throw new NotImplementedException();
        }

        public List<CarDetailDto> GetCarDetails(Expression<Func<CarDetailDto, bool>> filter = null)
        {
            throw new NotImplementedException();
        }

        public List<OwnerCarDetailDto> GetOwnerCarDetails(Expression<Func<OwnerCarDetailDto, bool>> filter = null)
        {
            throw new NotImplementedException();
        }
    }
}
