using Core3.DataAccess.EntityFramework;
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
    public class EfCustomerDal : EfEntityRepositoryBase<Customer, ReCapDBContext>, ICustomerDal
    {
        public List<CustomerDetailDto> GetCustomerDetails()
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from c in context.Customers
                             join u in context.Users
                             on c.Id equals u.Id
                             select new CustomerDetailDto
                             {
                                 Id = c.Id,
                                 CustomerName=u.FirstName,
                                 CustomerSurName=u.LastName,
                                 CustomerMail=u.Email,
                                 Company=c.CompanyName
                             };
                return result.ToList();
            }
        }
    }
}
