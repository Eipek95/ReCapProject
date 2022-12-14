using Business.Abstract;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class ColorManager : IColorService
    {
        IColorDal _colorDal;

        public ColorManager(IColorDal colorDal)
        {
            _colorDal = colorDal;
        }

        public IResult AddColor(Color color)
        {
            _colorDal.Add(color);
            return new Result(true,"Renk Eklendi");
        }

        public IDataResult<List<Color>> GetColors()
        {
            return new SuccessDataResult<List<Color>>(_colorDal.GetAll());  
        }

        public IResult UpdateColor(Color color)
        {
            _colorDal.Update(color);
            return new Result(true,"Başarıyla Güncellendi");
        }
        public IResult DeleteColor(Color color)
        {
            _colorDal.Delete(color);
            return new Result(true, "Marka Başarıyla Silindi");
        }
    }
}
