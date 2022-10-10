using Business.Abstract;
using Business.Constants;
using Core3.Business;
using Core3.Entities.Concrete;
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
    public class UserManager : IUserService
    {
        IUserDal _userDal;

        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }

        public IResult Add(User user)
        {
            var rulesResult = BusinessRules.Run(CheckIfEmailExist(user.Email));
            if (rulesResult != null)
            {
                return rulesResult;
            }

            _userDal.Add(user);
            return new SuccessResult(Messages.UserAdded);
        }

        public IResult Delete(int userId)
        {
            var rulesResult = BusinessRules.Run(CheckIfUserIdExist(userId));
            if (rulesResult != null)
            {
                return rulesResult;
            }

            var deletedUser = _userDal.Get(u => u.Id == userId);
            _userDal.Delete(deletedUser);
            return new SuccessResult(Messages.UserDeleted);
        }

        public IDataResult<List<User>> GetAll()
        {
            return new SuccessDataResult<List<User>>(_userDal.GetAll(), Messages.UsersListed);
        }

        public IDataResult<List<UserDto>> GetAllDto()   
        {
            return new SuccessDataResult<List<UserDto>>(_userDal.GetUsersDtos(), Messages.UsersListed);
        }

        public IDataResult<List<OperationClaim>> GetClaims(User user)
        {
            var rulesResult = BusinessRules.Run(CheckIfUserIdExist(user.Id));
            if (rulesResult != null)
            {
                return new ErrorDataResult<List<OperationClaim>>(rulesResult.Message);
            }

            return new SuccessDataResult<List<OperationClaim>>(_userDal.GetClaims(user));
        }

        public IDataResult<User> GetUserById(int userId)
        {
            var user = _userDal.Get(u => u.Id == userId);
            if (user != null)
            {
                return new SuccessDataResult<User>(user, Messages.UsersListed);
            }

            return new ErrorDataResult<User>(Messages.UserNotFound);
        }

        public IDataResult<User> GetUserByMail(string email)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.Email == email));
        }

        public IDataResult<UserDto> GetUserDtoById(int userId)
        {
            return new SuccessDataResult<UserDto>(_userDal.GetUsersDtos(u => u.Id == userId).SingleOrDefault(), Messages.UsersListed);
        }

        public IDataResult<UserDto> GetUserDtoByMail(string email)
        {
            return new SuccessDataResult<UserDto>(_userDal.GetUsersDtos(u => u.Email == email).SingleOrDefault(), Messages.UsersListed);
        }

        public IResult Update(User user)
        {
            var rulesResult = BusinessRules.Run(CheckIfUserIdExist(user.Id)
                , CheckIfEmailAvailable(user.Email));
            if (rulesResult != null)
            {
                return rulesResult;
            }

            _userDal.Update(user);
            return new SuccessResult(Messages.UserUpdated);
        }

        public IResult UpdateByDto(UserDto userDto)
        {
            var rulesResult = BusinessRules.Run(CheckIfUserIdExist(userDto.Id)
                , CheckIfEmailAvailable(userDto.Email));
            if (rulesResult != null)
            {
                return rulesResult;
            }

            var updatedUser = _userDal.Get(u => u.Id == userDto.Id && u.Email == userDto.Email);
            if (updatedUser == null)
            {
                return new ErrorResult(Messages.UserNotFound);
            }

            updatedUser.FirstName = userDto.FirstName;
            updatedUser.LastName = userDto.LastName;
            _userDal.Update(updatedUser);
            return new SuccessResult(Messages.UserUpdated);
        }

        //methods
        private IResult CheckIfEmailExist(string userEmail)
        {
            var result = BaseCheckIfEmailExist(userEmail);
            if (result)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }
        private bool BaseCheckIfEmailExist(string userEmail)
        {
            return _userDal.GetAll(u => u.Email == userEmail).Any();
        }
        private IResult CheckIfUserIdExist(int userId)
        {
            var result = _userDal.GetAll(u => u.Id == userId).Any();
            if (!result)
            {
                return new ErrorResult(Messages.UserNotFound);
            }
            return new SuccessResult();
        }
        private IResult CheckIfEmailAvailable(string userEmail)
        {
            var result = BaseCheckIfEmailExist(userEmail);
            if (!result)
            {
                return new ErrorResult(Messages.UserEmailNotAvailable);
            }
            return new SuccessResult();
        }
    }
}
