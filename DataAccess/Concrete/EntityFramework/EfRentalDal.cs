using Core3.DataAccess.EntityFramework;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfRentalDal : EfEntityRepositoryBase<Rental, ReCapDBContext>, IRentalDal
    {
        public List<RentalDetailDto> GetRentalDetails()
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from r in context.Rentals
                             join c in context.Cars
                             on r.CarId equals c.Id
                             join u in context.Customers
                             on r.CustomerId equals u.Id
                             select new RentalDetailDto
                             {
                                 id = r.Id,
                                 CarName = context.Brands.Where(x => x.Id == c.BrandId).Select(x => x.Name).First(),
                                 CustomerName = context.Users.Where(x => x.Id == u.UserId).Select(x => x.FirstName).First(),
                                 CustomerSurname = context.Users.Where(x => x.Id == u.UserId).Select(x => x.LastName).First(),
                                 RentalDate = r.RentDate,
                                 ReturnDate = r.ReturnDate
                             };
                return result.ToList();
            }
        }


        public bool isCarContent(int carId)
        {
            int _carId=0;
            using (ReCapDBContext c = new ReCapDBContext())
            {
                _carId = c.Cars.Where(x => x.Id == carId).Select(x => x.Id).SingleOrDefault();
            }
            if (_carId > 0)
                return true;
            else
                return false;
        }
    }
}
