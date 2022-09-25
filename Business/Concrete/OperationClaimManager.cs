using Business.Abstract;
using Business.Constants;
using Core3.Entities.Concrete;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class OperationClaimManager : IOperationClaimService
    {
        IOperationClaimDal _operationClaimDal;

        public OperationClaimManager(IOperationClaimDal operationClaimDal)
        {
            _operationClaimDal = operationClaimDal;
        }

        public IResult AddClaims(OperationClaim operationClaim)
        {
            _operationClaimDal.Add(operationClaim);
            return new Result(true, Messages.AddClaimMessage);
        }

        public IResult DeleteClaims(OperationClaim operationClaim)
        {
            var result = _operationClaimDal.GetAll().Where(x => x.Id == operationClaim.Id).FirstOrDefault();
            if (result != null)
            {
                _operationClaimDal.Delete(result);
                return new Result(true, Messages.DeleteClaimMessage);
            }
            return new ErrorResult(Messages.ClaimNameInvalid);
        }

        public IDataResult<List<OperationClaim>> GetClaim()
        {
           return new SuccessDataResult<List<OperationClaim>>(_operationClaimDal.GetAll());
        }

        public IResult UpdateClaims(OperationClaim operationClaim)
        {
            _operationClaimDal.Update(operationClaim);
            return new Result(true, Messages.UpdateClaimMessage);
           
        }
    }
}
