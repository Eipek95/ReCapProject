using Core3.DataAccess.EntityFramework;
using Core3.Entities.Concrete;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserOperationClaimDal : EfEntityRepositoryBase<UserOperationClaim, ReCapDBContext>, IUserOperationClaimDal
    {
        public List<ClaimDetailDto> GetClaimDetails()
        {
            using (ReCapDBContext context = new ReCapDBContext())
            {
                var result = from uo in context.UserOperationClaims
                             join x in context.Users
                             on uo.UserId equals x.Id
                             join o in context.OperationClaims
                             on uo.OperationClaimId equals o.Id
                             select new ClaimDetailDto
                             {
                                 Id = uo.Id,
                                 userId = x.Id,
                                 userFirstName = x.FirstName,
                                 userLastName = x.LastName,
                                 claimId=o.Id,
                                 claimName=o.Name
                             };
                return result.ToList();
            }
        }
    }
}

