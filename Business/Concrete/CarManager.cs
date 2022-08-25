using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core3.Aspects.Autofac.Validation;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
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
        public IDataResult<List<Car>> GetAll()
        {
            if (_carDal.GetAll().Count==0)
            {
                return new ErrorDataResult<List<Car>>(message:"Görüntülencek Araç yok");
            }
            
            return new SuccessDataResult<List<Car>>(_carDal.GetAll(),Messages.CarsListed);
        }

        public IDataResult<List<CarDetailDto>> GetCarDetails()
        {
            return new SuccessDataResult<List<CarDetailDto>>(_carDal.GetCarDetails());
        }

        public IDataResult<List<Car>> GetCarsByBrandId(int id)
        {
            return new SuccessDataResult<List<Car>>(_carDal.GetAll().Where(x=>x.BrandId==id).ToList());
        }

        public IDataResult<List<Car>> GetCarsByColorId(int id)
        {
            return new SuccessDataResult<List<Car>>(_carDal.GetAll().Where(x => x.ColorId == id).ToList());
        }
    }
}
