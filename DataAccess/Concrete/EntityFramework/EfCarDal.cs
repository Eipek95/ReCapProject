using Core3.DataAccess.EntityFramework;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal : EfEntityRepositoryBase<Car, ReCapDBContext>, ICarDal
    {
        public List<CarDetailDto> GetCarDetails(Expression<Func<CarDetailDto, bool>> filter = null)
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from c in context.Cars
                             join b in context.Brands
                             on c.BrandId equals b.Id
                             join co in context.Colors
                             on c.ColorId equals co.Id
                             select new CarDetailDto
                             {
                                 Id = c.Id,
                                 BrandName = b.Name,
                                 ColorName = co.Name,
                                 Description=c.Description,
                                 ModelYear = c.ModelYear,
                                 DailyPrice= c.DailyPrice,
                                 CarImages = ((from ci in context.CarImages
                                               where (c.Id == ci.CarId)
                                               select new CarImage
                                               {
                                                   Id = ci.Id,
                                                   CarId = ci.CarId,
                                                   Date = ci.Date,
                                                   ImagePath = ci.ImagePath
                                               }).ToList()).Count == 0
                                                    ? new List<CarImage> { new CarImage { Id = -1, CarId = c.Id, Date = DateTime.Now, ImagePath = "/images/default.jpg" } }
                                                    : (from ci in context.CarImages
                                                       where (c.Id == ci.CarId)
                                                       select new CarImage
                                                       {
                                                           Id = ci.Id,
                                                           CarId = ci.CarId,
                                                           Date = ci.Date,
                                                           ImagePath = ci.ImagePath
                                                       }).ToList()
                             };
                return filter == null
                    ? result.ToList()
                    :result.Where(filter).ToList();
            }
        }

        public List<BrandDetailDto> GetCarByBrandIdDetails()
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from c in context.Cars
                             join b in context.Brands
                             on c.BrandId equals b.Id
                             select new BrandDetailDto
                             {
                                 carId = c.Id,
                                 id = c.BrandId,
                                 CarName = c.Description,
                                 CarModelYear = c.ModelYear,
                                 CarDailyPrice = c.DailyPrice
                             };
                return result.ToList();
            }
        }

        public List<ColorDetailDto> GetCarByColorIdDetails()
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from c in context.Cars
                             join x in context.Colors
                             on c.ColorId equals x.Id
                             select new ColorDetailDto
                             {
                                 id = c.Id,
                                 colorId = x.Id,
                                 CarName = c.Description,
                                 CarDailyPrice = c.DailyPrice,
                                 CarModelYear = c.ModelYear
                             };
                return result.ToList();
            }
        }

        public List<OwnerCarDetailDto> GetOwnerCarDetails(Expression<Func<OwnerCarDetailDto, bool>> filter = null)
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {

                var result = from c in context.Cars
                             join b in context.Brands
                                 on c.BrandId equals b.Id
                             join co in context.Colors
                                 on c.ColorId equals co.Id
                             select new OwnerCarDetailDto
                             {
                                 Id = c.Id,
                                 BrandId = c.BrandId,
                                 BrandName = b.Name,
                                 ColorId = c.ColorId,
                                 ColorName = co.Name,
                                 DailyPrice = c.DailyPrice,
                                 Description = c.Description,
                                 ModelYear = c.ModelYear,
                                 CarImages = ((from ci in context.CarImages
                                               where (c.Id == ci.CarId)
                                               select new CarImage
                                               {
                                                   Id = ci.Id,
                                                   CarId = ci.CarId,
                                                   Date = ci.Date,
                                                   ImagePath = ci.ImagePath
                                               }).ToList()).Count == 0
                                                    ? new List<CarImage> { new CarImage { Id = -1, CarId = c.Id, Date = DateTime.Now, ImagePath = "/images/default.jpg" } }
                                                    : (from ci in context.CarImages
                                                       where (c.Id == ci.CarId)
                                                       select new CarImage
                                                       {
                                                           Id = ci.Id,
                                                           CarId = ci.CarId,
                                                           Date = ci.Date,
                                                           ImagePath = ci.ImagePath
                                                       }).ToList()
                             };
                return filter == null
                ? result.ToList()
                : result.Where(filter).ToList();
            }
        }
    }
}
