using Core3.DataAccess;
using Core3.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public  interface ICarDal:IEntityRepository<Car>
    {
        List<BrandDetailDto> GetCarByBrandIdDetails();
        List<ColorDetailDto> GetCarByColorIdDetails();
        List<CarDetailDto> GetCarDetails(Expression<Func<CarDetailDto, bool>> filter = null);

    }
}
