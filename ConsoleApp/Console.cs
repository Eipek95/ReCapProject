using Business.Concrete;
using DataAccess.Concrete.InMermory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    public class Console
    {
        CarManager carManager = new CarManager(new InMemoryCarDal());

    }
}
