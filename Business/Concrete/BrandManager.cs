using Business.Abstract;
using Core3.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class BrandManager : IBrandService
    {
        IBrandDal _brandDal;
        public BrandManager(IBrandDal brandDal)
        {
            _brandDal = brandDal;
        }

        public IResult Add(Brand brand)
        {
            _brandDal.Add(brand);
            return new Result(true,"Marka Başarıyla Eklendi");
        }

        public IDataResult<List<Brand>> GetBrandById(int brandId)
        {
            return new SuccessDataResult<List<Brand>>(_brandDal.GetAll().Where(x=>x.Id==brandId).ToList());
        }

        public IDataResult<List<Brand>> GetBrands()
        {
            return new SuccessDataResult<List<Brand>>(_brandDal.GetAll().ToList());
        }

        public IResult Update(Brand brand)
        {
            _brandDal.Update(brand);
            return new Result(true, "Marka Başarıyla Güncellendi");
        }
        public IResult Delete(Brand brand)
        {
            _brandDal.Delete(brand);
            return new Result(true, "Marka Başarıyla Silindi");
        }
    }
}
