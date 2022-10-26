using System.ComponentModel.DataAnnotations;

namespace PizzaStore.Entities
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public ProductSize ProductSize { get; set; }

    }
}
