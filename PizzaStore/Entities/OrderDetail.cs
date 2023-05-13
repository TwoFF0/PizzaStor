using System.ComponentModel.DataAnnotations;

namespace PizzaStore.Entities
{
    public class OrderDetail
    {
        public int Id { get; set; }

        public int Count { get; set; }

        public int ProductId { get; set; }

        public int ProductSizeId { get; set; }

        public int OrderId { get; set; }

        public virtual Order Order { get; set; }

        public virtual Product Product { get; set; }

        public virtual ProductSize ProductSize { get; set; }
    }
}
