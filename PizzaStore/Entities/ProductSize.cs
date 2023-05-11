using System.ComponentModel.DataAnnotations;

namespace PizzaStore.Entities
{
    public class ProductSize
    {
        public int Id { get; set; }

        public string Size { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int Weight { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public virtual Product Product { get; set; }

        public int ProductId { get; set; }
    }
}
