using Business.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerCreditCardControllers : ControllerBase
    {
        ICustomerCreditCardService _customerCreditCardService;

        public CustomerCreditCardControllers(ICustomerCreditCardService customerCreditCardService)
        {
            _customerCreditCardService = customerCreditCardService;
        }
        [HttpGet("getsavedcreditcardsbycustomerid")]
        public IActionResult GetSavedCreditCardsByCustomerId(int customerId)
        {
            var result = _customerCreditCardService.GetSavedCreditCardsByCustomerId(customerId);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Message);//kullanıcı bilgilendirmesi yapar.swagger dökümantasyonua bak.400 de data
            }
        }
    }
}
