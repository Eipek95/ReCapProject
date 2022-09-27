using Business.Abstract;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserOperationClaimManager : IUserOperationClaimService
    {
        IUserOperationClaimDal _userOperationClaimDal;

        public UserOperationClaimManager(IUserOperationClaimDal userOperationClaimDal)
        {
            _userOperationClaimDal = userOperationClaimDal;
        }

        public IDataResult<List<ClaimDetailDto>> GetAllDetail()
        {
            return new SuccessDataResult<List<ClaimDetailDto>>(_userOperationClaimDal.GetClaimDetails(),"Başarıyla Listelendi");
        }

        public IDataResult<List<ClaimDetailDto>> GetDetailByUserId(int userId)
        {
            return new SuccessDataResult<List<ClaimDetailDto>>(_userOperationClaimDal.GetClaimDetails().Where(x => x.userId == userId).ToList(), "Başarıyla Listelendi");
        }
    }
}
