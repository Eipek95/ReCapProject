using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core3.Aspects.Autofac.Validation;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Entities.Model;
using FluentValidation.Validators;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CreditCardManager : ICreditCardService
    {
        private readonly ICreditCardDal _creditCardDal;


        public CreditCardManager(ICreditCardDal creditCardDal)
        {
            _creditCardDal = creditCardDal;

        }

        public IDataResult<CreditCard> Get(string cardNumber, string expireYear, string expireMonth, string cvc, string cardHolderFullName)
        {
            var creditCard = GetCreditCardByCardInfo(cardNumber, expireYear, expireMonth, cvc, cardHolderFullName);
            if (creditCard != null)
            {
                return new SuccessDataResult<CreditCard>(creditCard);
            }
            else
            {
                CreditCard creditCard1 = new CreditCard() { CardNumber = cardNumber, ExpireYear = expireYear, ExpireMonth = expireMonth, Cvc = cvc, CardHolderFullName = cardHolderFullName, Balance = 250000 };
                var result = AddCreditCard(creditCard1);
                if (result.Success)
                {
                    return new SuccessDataResult<CreditCard>(creditCard1);
                }
                else
                {
                    return new ErrorDataResult<CreditCard>(null, Messages.CreditCardNotValid);
                }
            }
        }

        public IDataResult<CreditCard> GetById(int creditCardId)
        {
            var creditCard = _creditCardDal.Get(c => c.id == creditCardId);
            if (creditCard != null)
            {
                return new SuccessDataResult<CreditCard>(creditCard, Messages.CreditCardListed);
            }

            return new ErrorDataResult<CreditCard>(null, Messages.CreditCardNotFound);
        }

        public IResult Update(CreditCard creditCard)
        {
            _creditCardDal.Update(creditCard);
            return new SuccessResult();
        }
        [ValidationAspect(typeof(CreditCardValidator))]
        public IResult Validate(CreditCard creditCard)
        {
            var validateResult = GetCreditCardByCardInfo(creditCard.CardNumber, creditCard.ExpireYear, creditCard.ExpireMonth, creditCard.Cvc, creditCard.CardHolderFullName);
            if (validateResult != null)
            {
                return new SuccessResult();
            }

            return new ErrorResult(Messages.CreditCardNotValid);
        }
        private CreditCard GetCreditCardByCardInfo(string cardNumber, string expireYear, string expireMonth, string cvc, string cardHolderFullName)
        {
            return _creditCardDal.Get(c => c.CardNumber == cardNumber &&
                                           c.ExpireYear == expireYear &&
                                           c.ExpireMonth == expireMonth &&
                                           c.Cvc == cvc &&
                                           c.CardHolderFullName == cardHolderFullName.ToUpperInvariant()); // Convert Turkish characters into standard characters.
        }
        //if credit card not in database
        [ValidationAspect(typeof(CreditCardValidator))]
        private IResult AddCreditCard(CreditCard card)
        {

            if (Convert.ToInt32(card.ExpireMonth) <= 12 && Convert.ToInt32(card.ExpireMonth) >= 1)
            {
                _creditCardDal.Add(card);
                var result = _creditCardDal.Get(cc =>
             cc.CardNumber == card.CardNumber &&
             cc.ExpireYear == card.ExpireYear &&
             cc.ExpireMonth == card.ExpireMonth &&
             cc.Cvc == card.Cvc &&
             cc.CardHolderFullName == card.CardHolderFullName.ToUpperInvariant() &&
             cc.Balance == card.Balance
             );
                if (result != null)
                {
                    return new SuccessDataResult<CreditCard>(card, Messages.CustomerCreditCardSaved);
                }
            }
            return new ErrorDataResult<int>(-1, "Kredi Kartı eklenirken bir sorun oldu");
        }
    }
}
