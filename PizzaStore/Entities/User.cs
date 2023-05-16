using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace PizzaStore.Entities
{
    public class User : IdentityUser<int>
    {
        public int Age { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public double Balance { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastActive { get; set; }

        public virtual IEnumerable<Order> Orders { get; set; }

        public virtual IEnumerable<AppUserRole> UserRoles { get; set; }
    }
}
