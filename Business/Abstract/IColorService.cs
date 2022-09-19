using Core3.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IColorService
    {
        IResult AddColor(Color color);
        IResult UpdateColor(Color color);
        IDataResult<List<Color>> GetColors();
    }
}
