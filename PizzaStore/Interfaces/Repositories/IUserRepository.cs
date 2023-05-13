using System.Collections.Generic;
using System.Threading.Tasks;
using PizzaStore.Entities;

namespace PizzaStore.Interfaces.Repositories
{
    public interface IUserRepository
    {
        public IAsyncEnumerable<User> GetUsersAsync();

        public Task<User> GetUserByIdAsync(int id);

        public Task<User> GetUserByUserNameAsync(string username);

        public Task<User> PostUserAsync(User user);

        public Task<bool> UpdateUserAsync(User user);

        public Task<bool> DeleteUserAsync(int id);
    }
}
