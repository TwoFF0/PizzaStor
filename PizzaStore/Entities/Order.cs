using System;
using System.Collections.Generic;

namespace PizzaStore.Entities
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public double TotalPrice { get; set; }

        public DateTime OrderDate { get; set; }

        public virtual User User { get; set; }

        public virtual IEnumerable<OrderDetail> OrderDetails { get; set; }
    }
}
