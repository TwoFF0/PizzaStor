using System.ComponentModel.DataAnnotations;

namespace PizzaStore.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}