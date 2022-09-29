using Core3.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICarImageService
    {
        IResult Add(IFormFile file, int carId);
        IResult Update(CarImage carImage, IFormFile file);
        IResult Delete(CarImage carImage);
        IResult DeleteAllImagesOfCarByCarId(int carId);
        //IResult Add(CarImageAddDto carImageAddDto, IFormFile formFile);
        //IResult Update(CarImage carImage, IFormFile formFile);
        //IResult Delete(CarImageDeleteDto carImageId);
        IDataResult<List<CarImage>> GetAll();
        IDataResult<CarImage> GetById(int id);
        IDataResult<List<CarImage>> GetByCarId(int carId);
    }
}
