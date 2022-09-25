using Core3.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class ClaimDetailDto: IDto
    {
        public int Id { get; set; }
        public int claimId { get; set; }
        public string claimName { get; set; }
        public int userId { get; set; }
        public string userFirstName { get; set; }
        public string userLastName { get; set; }
    }
}
