using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core3.Aspects.Autofac.Caching;
using Core3.Aspects.Autofac.Validation;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CarManager : ICarService
    {
        ICarDal _carDal;

        public CarManager(ICarDal carDal)
        {
            _carDal = carDal;
        }

        [ValidationAspect(typeof(CarValidator))]
      //  [SecuredOperation("admin,car.add")]
        public IResult AddCar(Car car)
        {
            _carDal.Add(car);
            return new Result(true,Messages.CarAdded);
        }
        public IResult UpdateCar(Car car)
        {
            var result = _carDal.GetAll().Where(x => x.Id == car.Id).FirstOrDefault();
            if (result!=null)
            {
                result.BrandId = car.BrandId;
                result.ColorId = car.ColorId;
                result.DailyPrice = car.DailyPrice;
                result.Description = car.Description;
                result.ModelYear = car.ModelYear;
                _carDal.Update(result);
                return new Result(true, Messages.CarUpdated);
            }
            else
            {
                return new ErrorResult(Messages.CarNameInvalid);
            }
        }

        public IResult DeleteCar(Car car)
        {
            var result = _carDal.GetAll().Where(x => x.Id == car.Id).FirstOrDefault();
            if (result != null)
            {
                _carDal.Delete(result);
                return new Result(true, Messages.CarDeleted);
            }
            return new ErrorResult(Messages.CarNameInvalid);
        }
        //[CacheAspect]
        public IDataResult<List<CarDetailDto>> GetAll()
        {
            if (_carDal.GetAll().Count==0)
            {
                return new ErrorDataResult<List<CarDetailDto>>(message:"Görüntülencek Araç yok");
            }
            
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails(),Messages.CarsListed);
        }

        public IDataResult<List<Car>> GetCarsByBrandId(int id)
        {
            return new SuccessDataResult<List<Car>>(_carDal.GetAll().Where(x=>x.BrandId==id).ToList());
        }

        public IDataResult<List<Car>> GetCarsByColorId(int id)
        {
            return new SuccessDataResult<List<Car>>(_carDal.GetAll().Where(x => x.ColorId == id).ToList());
        }

        public IDataResult<List<BrandDetailDto>> GetCarByBrandIdDetails(int id)
        {
            return new SuccessDataResult<List<BrandDetailDto>>(_carDal.GetCarByBrandIdDetails().Where(x=>x.id==id).ToList());
        }
        public IDataResult<List<BrandDetailDto>> GetCarByBrandIdDetail()
        {
            return new SuccessDataResult<List<BrandDetailDto>>(_carDal.GetCarByBrandIdDetails().ToList());
        }

        public IDataResult<List<ColorDetailDto>> GetCarByColorIdDetails(int colorId)
        {
            return new SuccessDataResult<List<ColorDetailDto>>(_carDal.GetCarByColorIdDetails().Where(x=>x.colorId==colorId).ToList());
        }

        public IDataResult<CarDetailDto> GetCarDetails(int carId)
        {
            return new SuccessDataResult<CarDetailDto>(_carDal.GetCarDetails(c => c.Id == carId).SingleOrDefault());
        }

        public IDataResult<List<Car>> GetCarAll(int carId)
        {
            if (_carDal.GetAll().Count == 0)
            {
                return new ErrorDataResult<List<Car>>(message: "Görüntülencek Araç yok");
            }

            return new SuccessDataResult<List<Car>>(_carDal.GetAll().Where(x=>x.Id==carId).ToList(),Messages.CarsListed);
        }
    }
}
