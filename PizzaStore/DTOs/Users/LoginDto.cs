using System.ComponentModel.DataAnnotations;

namespace PizzaStore.DTOs.Users
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 6)]
        public string Password { get; set; }
    }
}