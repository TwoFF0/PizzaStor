using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [Required]
        public double Price { get; set; }

        [Required]
        public string Recipe { get; set; }

        public byte[] Image { get; set; }
    }
}
