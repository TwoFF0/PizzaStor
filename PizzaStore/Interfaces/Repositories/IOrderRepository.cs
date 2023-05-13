using PizzaStore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PizzaStore.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        public IAsyncEnumerable<Order> GetOrdersAsync(string username);

        public Task<Order> GetOrderByIdAsync(int id);

        public Task<int> PostOrderAsync(Order order);
    }
}
