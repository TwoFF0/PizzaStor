using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Entities;
using PizzaStore.Extensions;

namespace PizzaStore.Data
{
    public class DataContext : IdentityDbContext<User, AppRole, int, 
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ConfigureUser();
            modelBuilder.ConfigureOrder();
            modelBuilder.ConfigureOrderDetail();
            modelBuilder.ConfigureProduct();
            modelBuilder.ConfigureProductSize();
        }
    }
}
