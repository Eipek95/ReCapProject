using Business.Abstract;
using Business.Constants;
using Core3.Business;
using Core3.Utilities.Helpers;
using Core3.Utilities.Helpers.MyFileHelper;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CarImageManager : ICarImageService
    {
        ICarImageDal _carImageDal;


        public CarImageManager(ICarImageDal carImageDal)
        {
            _carImageDal = carImageDal;
        }
        public IResult Add(IFormFile file, int carId)
        {
            var result = BusinessRules.Run(CheckCarImageCount(carId));
            if (result!=null)
            {
                return result;
            }
            var imageResult = Core3.Utilities.Helpers.MyFileHelper.FileHelper.Upload(file);
            if (!imageResult.Success)
            {
                return new ErrorResult(imageResult.Message);
            }

            CarImage carImage = new CarImage
            {
                ImagePath = imageResult.Message,
                CarId = carId,
                Date = DateTime.Now
            };
            _carImageDal.Add(carImage);
            return new SuccessResult(Messages.CarImageAdded);
     
        }
        public IResult Update(CarImage carImage, IFormFile file)
        {
            IResult rulesResult = BusinessRules.Run(CheckIfCarImageIdExist(carImage.Id),
                CheckCarImageCount(carImage.CarId));

            if (rulesResult != null)
            {
                return rulesResult;
            }
            var updatedImage = _carImageDal.Get(c => c.Id == carImage.Id);
            var result = Core3.Utilities.Helpers.MyFileHelper.FileHelper.Update(file, updatedImage.ImagePath);
            carImage.ImagePath = result.Message;
            carImage.Date = DateTime.Now;
            _carImageDal.Update(carImage);
            return new SuccessResult(Messages.CarImageUpdated);
        }
        public IResult Delete(CarImage carImage)
        {
            IResult rulesResult = BusinessRules.Run(CheckCarImageCount(carImage.Id));
            if (rulesResult != null)
            {
                return rulesResult;
            }
            var deleteImage = _carImageDal.Get(x => x.Id == carImage.Id);
            var result = Core3.Utilities.Helpers.MyFileHelper.FileHelper.Delete(deleteImage.ImagePath);
            if (!result.Success)
            {
                return new ErrorResult(Messages.ErrorDeletingImage);
            }
            _carImageDal.Delete(deleteImage);
            return new SuccessResult(Messages.ImageDeleted);
        }

        //public IResult Add(CarImageAddDto carImageAddDto, IFormFile formFile)
        //{
        //    var result = BusinessRules.Run(
        //        CheckCarImageCount(carImageAddDto.CarId));
        //    if (result != null)
        //    {
        //        return result;
        //    }
        //    var imageResult = FileHelper.Add(formFile);
        //    if (!imageResult.Success)
        //    {
        //        return new ErrorResult(Messages.ErrorMessage);
        //    }

        //    var carImage = new CarImage
        //    {
        //        ImagePath = imageResult.Message,
        //        Date = DateTime.Now,
        //        CarId = carImageAddDto.CarId
        //    };

        //    _carImageDal.Add(carImage);

        //    return new SuccessResult(Messages.ImageAdded);
        //}

        //public IResult Delete(CarImageDeleteDto carImageDeleteDto)
        //{
        //    var delete = _carImageDal.Get(c => c.Id == carImageDeleteDto.CarImageId);
        //    if (delete == null)
        //    {
        //        return new ErrorResult(Messages.ImageNotFound);
        //    }
        //    Core3.Utilities.Helpers.FileHelper.Delete(delete.ImagePath);
        //    _carImageDal.Delete(delete);
        //    return new SuccessResult(Messages.ImageDeleted);
        //}

        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll());
        }

        public IDataResult<List<CarImage>> GetByCarId(int carId)
        {
            var result = _carImageDal.GetAll(c => c.CarId == carId);
            if (result.Count > 0)
            {
                return new SuccessDataResult<List<CarImage>>(result);
            }
            List<CarImage> images = new List<CarImage>();
            images.Add(new CarImage() { CarId = 0, Id = 0, ImagePath = "/images/defaultt.jpg" });
            return new SuccessDataResult<List<CarImage>>(images);
        }

        public IDataResult<CarImage> GetById(int id)
        {
            return new SuccessDataResult<CarImage>(_carImageDal.Get(c => c.Id == id));
        }

        //public IResult Update(CarImage carImage, IFormFile formFile)
        //{
        //    var isImage = _carImageDal.Get(c => c.Id == carImage.Id);
        //    if (isImage == null)
        //    {
        //        return new ErrorResult(Messages.ImageNotFound);
        //    }

        //    var updated = Core3.Utilities.Helpers.FileHelper.Update(isImage.ImagePath, formFile);
        //    if (!updated.Success)
        //    {
        //        return new ErrorResult(Messages.ImageError);
        //    }

        //    carImage.ImagePath = (updated.Message);
        //    _carImageDal.Update(carImage);
        //    return new SuccessResult(Messages.ImageUpdated);
        //}

        public IResult CheckCarImageCount(int carId)
        {
            var result = _carImageDal.GetAll(c => c.CarId == carId);
            if (result.Count > 5)
            {
                return new ErrorResult(Messages.ErrorMessage);
            }
            return new SuccessResult();
        }
        private IResult CheckIfCarImageIdExist(int imageId)
        {
            var result = _carImageDal.GetAll(c => c.Id == imageId).Any();
            if (!result)
            {
                return new ErrorResult(Messages.CarImageIdNotExist);
            }
            return new SuccessResult();
        }

        public IResult DeleteAllImagesOfCarByCarId(int carId)
        {
            var deletedImages = _carImageDal.GetAll(c => c.CarId == carId);
            if (deletedImages == null)
            {
                return new ErrorResult(Messages.NoPictureOfTheCar);
            }
            foreach (var deletedImage in deletedImages)
            {
                _carImageDal.Delete(deletedImage);
                Core3.Utilities.Helpers.MyFileHelper.FileHelper.Delete(deletedImage.ImagePath);
            }
            return new SuccessResult(Messages.CarImageDeleted);
        }
    }
}
