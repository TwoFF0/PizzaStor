using Microsoft.EntityFrameworkCore;
using PizzaStore.Entities;
using PizzaStore.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaStore.Data.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async IAsyncEnumerable<Order> GetOrdersAsync(string username)
        {
            await foreach (var item in _context.Orders
                .Include(x => x.User)
                .Include(x => x.OrderDetails)
                .Where(x => x.User.UserName == username)
                .AsAsyncEnumerable())
            {
                yield return item;
            }
        }

        public async Task<Order> GetOrderByIdAsync(int id) => await _context.Orders.FindAsync(id);

        public async Task<int> PostOrderAsync(Order order)
        {
            var posted = await _context.Orders.AddAsync(order);

            await _context.SaveChangesAsync();

            return posted.Entity.Id;
        }
    }
}
