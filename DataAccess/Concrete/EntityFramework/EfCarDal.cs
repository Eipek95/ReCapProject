﻿using Core3.DataAccess.EntityFramework;
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
    }
}
