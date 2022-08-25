using Core3.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IRentalService
    {
        
        IResult AddRental(Rental rental);
        IDataResult<List<RentalDetailDto>> GetRentalDetail();
    }
}
