using Business.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        IColorService _colorService;

        public ColorsController(IColorService colorService)
        {
            _colorService = colorService;
        }

        [HttpGet("getcolor")]
        public IActionResult GetColor()
        {
            var result = _colorService.GetColors();
            if (result.Success)
            {
                return Ok(result);//ok--->status 200 return successfull 200'DE Data ver mesajda verebilirdi ben data versin istedim
            }
            else
            {
                return BadRequest(result.Message);//kullanıcı bilgilendirmesi yapar.swagger dökümantasyonua bak.400 de data
            }
        }
    }
}
