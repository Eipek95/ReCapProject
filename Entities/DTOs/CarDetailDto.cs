using Core3.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class CarDetailDto:IDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string BriandName { get; set; }
        public string ColorName { get; set; }
    }
}
