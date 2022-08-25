using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class RentalValidator : AbstractValidator<Rental>
    {
        public RentalValidator()
        {
            RuleFor(x => x.ReturnDate).Must(IsTheReturnDateEmpty);
        }

        private bool IsTheReturnDateEmpty(DateTime? arg)
        {
            if (arg == null)
                return true;
            else
                return false;
        }
    }
}
