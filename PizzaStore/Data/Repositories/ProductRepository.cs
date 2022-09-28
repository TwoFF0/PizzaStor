using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Entities;
using PizzaStore.Interfaces.Repositories;

namespace PizzaStore.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext context;

        public ProductRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Product> GetProductByIdAsync(int id) => await this.context.Products.FindAsync(id);


        public async IAsyncEnumerable<Product> GetProductsByCategoryAsync(string category)
        {
            var products = await this.context.Products.Where(x => x.Category == category).ToListAsync();

            foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetAllProductsAsync()
        {
            await foreach (var product in this.context.Products)
            {
                yield return product;
            }
        }

        public async Task<Product> PostProductAsync(Product product)
        {
            var toReturn = await this.context.AddAsync(product);
            await this.context.SaveChangesAsync();

            return toReturn.Entity;
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await this.context.Products.FindAsync(id);

            if (product is null) return false;

            this.context.Products.Remove(product);
            return true;

        }

        public async Task<byte[]> GetProductPhotoAsync(int id)
        {
            var product = await context.Products.FindAsync(id);

            return product?.Image;
        }

        public async Task<bool> PostProductPhotoAsync(int id, Stream stream)
        {
            if (stream is null)
            {
                throw new ArgumentNullException(nameof(stream));
            }

            var product = await context.Products.FindAsync(id);

            using var memStream = (MemoryStream) stream;
            var img = new byte[memStream.Length];
            Array.Copy(memStream.ToArray(), 0, img, 0, memStream.Length);

            if (product is not null)
            {
                product.Image = img;
                await this.context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteProductPhotoAsync(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product is null)
            {
                return false;
            }

            product.Image = null;
            await this.context.SaveChangesAsync();

            return true;
        }
    }
}
