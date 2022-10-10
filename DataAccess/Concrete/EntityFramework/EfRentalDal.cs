using Core3.DataAccess.EntityFramework;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfRentalDal : EfEntityRepositoryBase<Rental, ReCapDBContext>, IRentalDal
    {
        public List<RentalDetailDto> GetRentalDetails(Expression<Func<RentalDetailDto, bool>> filter = null)
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from r in context.Rentals
                             join c in context.Cars
                                 on r.CarId equals c.Id
                             join cu in context.Customers
                                 on r.CustomerId equals cu.Id
                             join u in context.Users
                                 on cu.UserId equals u.Id
                             join b in context.Brands
                                 on c.BrandId equals b.Id
                             join p in context.Payments
                                 on r.PaymentId equals p.Id
                             select new RentalDetailDto
                             {
                                 Id = r.Id,
                                 CarId = c.Id,
                                 ModelFullName = $"{b.Name} {c.Description}",
                                 CustomerId = cu.Id,
                                 CustomerFullName = $"{u.FirstName} {u.LastName}",
                                 ReturnDate = r.ReturnDate,
                                 DailyPrice = c.DailyPrice,
                                 RentDate = r.RentDate,
                                 PaymentId = r.PaymentId,
                                 PaymentDate = p.PaymentDate,
                                 DeliveryStatus = r.DeliveryStatus
                             };
                return filter == null
                    ? result.ToList()
                    : result.Where(filter).ToList();
            }

        }

    }
}
