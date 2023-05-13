using System.ComponentModel.DataAnnotations;

namespace PizzaStore.DTOs.Users
{
    public class AccountDto
    {
        public string UserName { get; set; }

        public string Token { get; set; }
    }
}