using System.ComponentModel.DataAnnotations;

namespace PizzaStore.DTOs
{
    public class AccountDto
    {
        public string UserName { get; set; }

        public string Token { get; set; }
    }
}