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
        public List<CarDetailDto> GetCarDetails()
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from c in context.Cars
                             join x in context.Colors
                             on c.ColorId equals x.Id
                             join b in context.Brands
                             on c.BrandId equals b.Id
                           select new CarDetailDto
                           {
                               Id = c.Id,
                               ColorName = x.Name,
                               BriandName = b.Name,
                               Description = c.Description
                           };
                return result.ToList();
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
                                 carId =c.Id,
                                 id=c.BrandId,
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
                                 id=c.Id,
                                 colorId=x.Id,
                                 CarName=c.Description,
                                 CarDailyPrice=c.DailyPrice,
                                 CarModelYear=c.ModelYear
                             };
                return result.ToList();
            }
        }
    }
}
