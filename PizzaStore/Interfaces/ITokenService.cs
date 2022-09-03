using PizzaStore.Entities;

namespace PizzaStore.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(User user);
    }
}