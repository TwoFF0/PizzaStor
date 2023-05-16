using PizzaStore.Entities;
using System.Threading.Tasks;

namespace PizzaStore.Interfaces
{
    public interface ITokenService
    {
        public Task<string> CreateToken(User user);
    }
}