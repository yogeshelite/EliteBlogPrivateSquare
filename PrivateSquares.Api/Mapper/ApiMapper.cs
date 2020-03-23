
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Models;
using WebApi.Persistance.Data;

namespace WebApiNopCommerce.Mapping
{
    public class ApiMapperProfile : AutoMapper.Profile
    {
        public ApiMapperProfile()
        {
            CreateMap<Register, RegisterationDTO>();
            CreateMap<Profile, ProfileDTO>()
                .ForMember(f => f.User, opt => opt.MapFrom(src => src.Register))
                .ForMember(f => f.Addresses, opt => opt.MapFrom(src => src.Addresses));

            CreateMap<ProfileDTO, ProfileListDTO>();




        }

    }
}