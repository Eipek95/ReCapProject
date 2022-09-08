using Core3.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class ColorDetailDto:IDto
    {
        public int id { get; set; }
        public int colorId { get; set; }
        public string CarName { get; set; }
        public int CarModelYear { get; set; }
        public decimal CarDailyPrice { get; set; }
    }
}
