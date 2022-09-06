using Core3.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class BrandDetailDto:IDto
    {
        public int carId { get; set; }
        public int brandId { get; set; }
        public string CarName { get; set; }
        public int CarModelYear { get; set; }
        public decimal CarDailyPrice { get; set; }
        public string? CarDescription { get; set; }
    }
}
