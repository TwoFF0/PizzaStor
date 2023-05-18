using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PizzaStore.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string Category { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsDeleted { get; set; }

        public virtual IEnumerable<ProductSize> ProductSizes { get; set; }
    }
}
