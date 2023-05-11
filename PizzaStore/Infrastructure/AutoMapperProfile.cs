using AutoMapper;
using PizzaStore.DTOs;
using PizzaStore.Entities;
using System.Collections.Generic;

namespace PizzaStore.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Product, ProductDto>();
            CreateMap<ProductSize, ProductSizeDto>();
        }
    }
}
