using Core3.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICarService
    {
        IResult AddCar(Car car);
        IResult UpdateCar(Car car);
        IResult DeleteCar(Car car);
        IDataResult<List<CarDetailDto>> GetAll();
        IDataResult<List<Car>> GetCarAll(int carId);
        IDataResult<List<Car>> GetCarsByBrandId(int id);
        IDataResult<List<Car>> GetCarsByColorId(int id);
        IDataResult<CarDetailDto> GetCarDetails(int carId);
        IDataResult<OwnerCarDetailDto> GetCarDetailsByCarIdOwner(int carId);
        IDataResult<List<OwnerCarDetailDto>> GetCarDetailsByBrandOwner(int brandId);
        IDataResult<List<OwnerCarDetailDto>> GetCarDetailsByColorOwner(int colorId);
        IDataResult<List<OwnerCarDetailDto>> GetCarsByFilterWithDetails(int brandId,int colorId);
        IDataResult<List<BrandDetailDto>> GetCarByBrandIdDetail();
        IDataResult<List<BrandDetailDto>> GetCarByBrandIdDetails(int id);
        IDataResult<List<ColorDetailDto>> GetCarByColorIdDetails(int colorId);
        //List<Car> GetCars();
        //List<Car> GetABI(int carId);
        //List<Car> OrderPriceCarList(string searchWord);
    }
}
