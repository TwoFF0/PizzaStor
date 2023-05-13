using AutoMapper;
using PizzaStore.DTOs.Orders;
using PizzaStore.DTOs.Products;
using PizzaStore.DTOs.Users;
using PizzaStore.Entities;

namespace PizzaStore.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<ProductSize, ProductSizeDto>();
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.ProductSize, opt => opt.MapFrom(src => src.ProductSizes));

            CreateMap<OrderDetail, OrderDetailDto>().ReverseMap();
            CreateMap<Order, OrderDto>()
             .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails)).ReverseMap();
        }
    }
}
