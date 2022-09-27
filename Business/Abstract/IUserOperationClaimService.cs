using Core3.Utilities.Results;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserOperationClaimService
    {
        IDataResult<List<ClaimDetailDto>> GetAllDetail();
        IDataResult<List<ClaimDetailDto>> GetDetailByUserId(int userId);
    }
}
