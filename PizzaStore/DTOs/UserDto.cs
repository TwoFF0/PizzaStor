using System;

namespace PizzaStore.DTOs
{
    public class UserDto
    {
            public int Id { get; set; }

            public int Age { get; set; }

            public string UserName { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }

            public string City { get; set; }

            public string Country { get; set; }

            public DateTime CreatedAt { get; set; }
    }
}
