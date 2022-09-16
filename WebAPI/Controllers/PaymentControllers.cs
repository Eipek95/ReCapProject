using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentControllers : ControllerBase
    {
        IPaymentService _paymentService;

        public PaymentControllers(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        [HttpGet("pay")]
        public IActionResult Pay(CreditCard payment,int customerId,int amount)
        {
            var result = _paymentService.Pay(payment,customerId,amount);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }
    }
}
