using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PizzaStore.DTOs.Orders;
using PizzaStore.Entities;
using PizzaStore.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PizzaStore.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderRepository orderRepository;
        private readonly IMapper mapper;

        public OrdersController(IOrderRepository orderRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.mapper = mapper;
        }

        [HttpGet("{username}")]
        public async IAsyncEnumerable<OrderDto> GetOrders(string username)
        {
            await foreach (var item in orderRepository.GetOrdersAsync(username))
            {
                yield return mapper.Map<OrderDto>(item);
            }
        }

        [HttpGet]
        public async Task<ActionResult<OrderDto>> GetOrder([FromQuery] int id)
        {
            return mapper.Map<OrderDto>(await orderRepository.GetOrderByIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostOrder(OrderDto orderDto)
        {
            return await orderRepository.PostOrderAsync(mapper.Map<Order>(orderDto));
        }
    }
}
