using Business.Abstract;
using Core3.Entities.Concrete;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationClaimController : ControllerBase
    {
        IOperationClaimService _operationClaimService;

        public OperationClaimController(IOperationClaimService operationClaimService)
        {
            _operationClaimService = operationClaimService;
        }
        [HttpGet("getclaims")]
        public IActionResult GetClaimsAll()
        {
            var result = _operationClaimService.GetClaim();
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }
        [HttpPost("addclaim")]
        public IActionResult AddClaim(OperationClaim operationClaim)
        {
            var result = _operationClaimService.AddClaims(operationClaim);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
        [HttpPost("updateclaim")]
        public IActionResult UpdateClaim(OperationClaim operationClaim)
        {
            var result = _operationClaimService.UpdateClaims(operationClaim);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
        [HttpPost("deleteclaim")]
        public IActionResult DeleteClaim(OperationClaim operationClaim)
        {
            var result = _operationClaimService.DeleteClaims(operationClaim);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
    }
}
