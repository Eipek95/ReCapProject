using Core3.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public  class CustomerDetailDto:IDto
    {
        public int Id { get; set; }
        public string CustomerName{ get; set; }
        public string CustomerSurName{ get; set; }
        public string CustomerMail{ get; set; }
        public string Company{ get; set; }
    }
}
