using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core3.Aspects.Autofac.Validation;
using Core3.Entities;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class RentalManager : IRentalService
    {
        IRentalDal _rentalDal;

        public RentalManager(IRentalDal rentalDal)
        {
            _rentalDal = rentalDal;
        }

        public IResult AddRental(Rental rental)
        {
            var checkCar = _rentalDal.isCarContent(rental.CarId);
            var result = _rentalDal.Get
                (x => x.CarId == rental.CarId
                && (x.ReturnDate == null || x.ReturnDate > rental.ReturnDate)
                );
            if (checkCar)
            {
                if (result == null)
                {
                    _rentalDal.Add(rental);
                    return new SuccessResult(Messages.RentalAdded);
                }
                else
                    return new ErrorResult(Messages.RentalIsNotAdded);
            }
            else
            {
                return new ErrorResult(Messages.RentalIsNotFount);
            }
        }

        public IDataResult<List<RentalDetailDto>> GetRentalDetail()
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDal.GetRentalDetails());
        }
    }
}
