using Core3.DataAccess;
using Core3.Entities.Concrete;
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
    public interface IUserOperationClaimDal: IEntityRepository<UserOperationClaim>
    {
        List<ClaimDetailDto> GetClaimDetails();
    }
}
