namespace PizzaStore.DTOs.Orders
{
    public class OrderDetailDto
    {
        public int Id { get; set; }

        public int Count { get; set; }

        public int ProductId { get; set; }

        public int ProductSizeId { get; set; }
    }
}
