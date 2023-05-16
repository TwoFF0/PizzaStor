using System;
using System.ComponentModel.DataAnnotations;

namespace PizzaStore.DTOs.Users
{
    public class UserDto
    {
        public int Id { get; set; }

        [Range(0, 99)]
        public int Age { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public double Balance { get; set; }
    }
}
