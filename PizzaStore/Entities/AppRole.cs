using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace PizzaStore.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public virtual IEnumerable<AppUserRole> UserRoles { get; set; }
    }
}
