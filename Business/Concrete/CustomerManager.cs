using Business.Abstract;
using Business.Constants;
using Core3.Business;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CustomerManager : ICustomerService
    {
        private readonly ICustomerDal _customerDal;
        private readonly IUserService _userService;

        public CustomerManager(ICustomerDal customerDal, IUserService userService)
        {
            _customerDal = customerDal;
            _userService = userService;
        }

        public IDataResult<int> Add(Customer customer)
        {
            var rulesResult = BusinessRules.Run(CheckIfUserIdValid(customer.UserId), CheckIfUserIdExist(customer.UserId));
            if (rulesResult != null)
            {
                return new ErrorDataResult<int>(-1, rulesResult.Message);
            }

            _customerDal.Add(customer);
            var result = _customerDal.Get(c => c.UserId == customer.UserId && c.CompanyName == customer.CompanyName);
            if (result != null)
            {
                return new SuccessDataResult<int>(result.Id, Messages.CustomerAdded);
            }

            return new ErrorDataResult<int>(-1, Messages.NotAddedCustomer);
        }

        public IResult Delete(int customerId)
        {
            var rulesResult = BusinessRules.Run(CheckIfCustomerIdExist(customerId));
            if (rulesResult != null)
            {
                return rulesResult;
            }

            var deletedCustomer = _customerDal.Get(c => c.Id == customerId);
            _customerDal.Delete(deletedCustomer);
            return new SuccessResult(Messages.CustomerDeleted);
        }

        public IDataResult<List<Customer>> GetAll()
        {
            return new SuccessDataResult<List<Customer>>(_customerDal.GetAll(),"Müşteriler Listelendi");
        }

        public IDataResult<Customer> GetCustomerById(int customerId)
        {
            var result = _customerDal.Get(c => c.Id == customerId);
            if (result != null)
            {
                return new SuccessDataResult<Customer>(result, Messages.CustomerListed);
            }

            return new ErrorDataResult<Customer>(null, "Müşteri Bulunamadı");
        }

        public IDataResult<Customer> GetCustomerByUserId(int userId)
        {
            var result = _customerDal.Get(c => c.UserId == userId);
            if (result != null)
            {
                return new SuccessDataResult<Customer>(result, Messages.CustomerListed);
            }

            return new ErrorDataResult<Customer>(null,"Müşteri Bulunamadı");
        }

        public IDataResult<List<CustomerDetailDto>> GetCustomersDetails()
        {
            return new SuccessDataResult<List<CustomerDetailDto>>(_customerDal.GetCustomerDetails(), Messages.CustomerListed);
        }

        public IResult Update(Customer customer)
        {
            throw new NotImplementedException();
        }
        private IResult CheckIfUserIdValid(int userId)
        {
            var result = _userService.GetUserById(userId);
            if (!result.Success)
            {
                return new ErrorResult(Messages.UserNotFound);
            }

            return new SuccessResult();
        }
        private IResult CheckIfUserIdExist(int userId)
        {
            var result = _customerDal.GetAll(c => c.UserId == userId).Any();
            if (result)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }
        private IResult CheckIfCustomerIdExist(int customerId)
        {
            var result = _customerDal.GetAll(c => c.Id == customerId).Any();
            if (!result)
            {
                return new ErrorResult(Messages.UserNotFound);
            }
            return new SuccessResult();
        }
    }
}
