using Core3.Entities.Concrete;
using Core3.Utilities.Results;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IOperationClaimService
    {
        IDataResult<List<OperationClaim>> GetClaim();
        IResult AddClaims(OperationClaim operationClaim);
        IResult UpdateClaims(OperationClaim operationClaim);
        IResult DeleteClaims(OperationClaim operationClaim);
    }
}
