using Microsoft.EntityFrameworkCore;
using PizzaStore.Entities;

namespace PizzaStore.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void ConfigureProduct(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Category).IsRequired();
                entity.Property(x => x.Name).IsRequired();
                entity.Property(x => x.Description).IsRequired();

                entity.HasMany(x => x.ProductSizes)
                      .WithOne(x => x.Product)
                      .HasForeignKey(x => x.ProductId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

        public static void ConfigureProductSize(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductSize>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Price).IsRequired();
                entity.Property(x => x.Weight).IsRequired();
                entity.Property(x => x.ImageUrl).IsRequired();
                entity.Property(x => x.ProductId).IsRequired();

                entity.HasOne(x => x.Product)
                      .WithMany(x => x.ProductSizes)
                      .HasForeignKey(x => x.ProductId);
            });
        }

        public static void ConfigureUser(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.UserName).IsRequired().HasMaxLength(20);
                entity.Property(x => x.PasswordHash).IsRequired();
                entity.Property(x => x.PasswordSalt).IsRequired();
                entity.Property(x => x.CreatedAt).IsRequired();

                entity.HasMany(x => x.Orders)
                      .WithOne(x => x.User)
                      .HasForeignKey(x => x.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

        public static void ConfigureOrder(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.OrderDate).IsRequired();
                entity.Property(x => x.UserId).IsRequired();
                entity.Property(x => x.TotalPrice).IsRequired();

                entity.HasMany(x => x.OrderDetails)
                      .WithOne(x => x.Order)
                      .HasForeignKey(x => x.OrderId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.User)
                      .WithMany(x => x.Orders)
                      .HasForeignKey(x => x.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }

        public static void ConfigureOrderDetail(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Count).IsRequired();
                entity.Property(x => x.ProductId).IsRequired();
                entity.Property(x => x.OrderId).IsRequired();
                entity.Property(x => x.ProductSizeId).IsRequired();

                entity.HasOne(x => x.Order)
                      .WithMany(x => x.OrderDetails)
                      .HasForeignKey(x => x.OrderId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(x => x.Product)
                      .WithMany()
                      .HasForeignKey(x => x.ProductId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(x => x.ProductSize)
                      .WithMany()
                      .HasForeignKey(x => x.ProductSizeId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
