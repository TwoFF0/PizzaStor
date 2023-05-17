using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using PizzaStore.Entities;

namespace PizzaStore.Interfaces.Repositories
{
    public interface IProductRepository
    {
        public Task<Product> GetProductByIdAsync(int id);

        public IAsyncEnumerable<Product> GetProductsByCategoryAsync(string category);

        public IAsyncEnumerable<Product> GetAllProductsAsync();

        public Task<int> PostProductAsync(Product product);

        public Task<bool> DeleteProductAsync(int id);

        //public Task<byte[]> GetProductPhotoAsync(int id);

        //public Task<bool> PostProductPhotoAsync(int id, Stream stream);

        //public Task<bool> DeleteProductPhotoAsync(int id);

    }
}