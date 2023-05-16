using Microsoft.AspNetCore.Identity;

namespace PizzaStore.Entities
{
    public class AppUserRole : IdentityUserRole<int>
    {
        public virtual AppRole AppRole { get; set; }

        public virtual User User { get; set; }
    }
}
