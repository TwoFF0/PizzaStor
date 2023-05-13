using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Entities;
using PizzaStore.Interfaces.Repositories;

namespace PizzaStore.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;

        public UserRepository(DataContext context)
        {
            this.context = context;
        }

        public async IAsyncEnumerable<User> GetUsersAsync()
        {
            await foreach (var user in this.context.Users)
            {
                yield return user;
            }
        }

        [Authorize]
        public async Task<User> GetUserByIdAsync(int id) => await this.context.Users.FindAsync(id);

        public async Task<User> GetUserByUserNameAsync(string username) =>
            await this.context.Users.SingleOrDefaultAsync(x => x.UserName == username);

        public async Task<User> PostUserAsync(User user)
        {
            user.CreatedAt = DateTime.UtcNow;

            var toReturn = await this.context.Users.AddAsync(user);
            await this.context.SaveChangesAsync();

            return toReturn.Entity;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await this.GetUserByIdAsync(id);

            if (user is null)
            {
                return false;
            }

            context.Users.Remove(user);
            return true;
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            if (user is null)
            {
                return false;
            }

            var dbUser = await context.Users.FindAsync(user.Id);

            if (dbUser is null)
            {
                return false;
            }

            dbUser.Age = user.Age;
            dbUser.UserName = user.UserName;
            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.City = user.City;
            dbUser.Country = user.Country;
            dbUser.Balance = user.Balance;

            await this.context.SaveChangesAsync();

            return true;
        }
    }
}
