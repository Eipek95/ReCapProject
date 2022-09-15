using Core3.Utilities.Results;
using Entities.Concrete;
using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICustomerCreditCardService
    {
        IDataResult<List<CreditCard>> GetSavedCreditCardsByCustomerId(int customerId);
        IResult SaveCustomerCreditCard(CustomerCreditCardModel customerCreditCardModel);
        IResult DeleteCustomerCreditCard(CustomerCreditCardModel customerCreditCardModel);
    }
}
