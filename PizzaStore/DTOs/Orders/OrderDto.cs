using System;
using System.Collections.Generic;

namespace PizzaStore.DTOs.Orders
{
    public class OrderDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public double TotalPrice { get; set; }

        public DateTime OrderDate { get; set; }

        public IEnumerable<OrderDetailDto> OrderDetails { get; set; }
    }
}
