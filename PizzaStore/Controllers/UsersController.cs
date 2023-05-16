using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaStore.DTOs.Users;
using PizzaStore.Entities;

namespace PizzaStore.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;

        public UsersController(UserManager<User> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpGet("all")]
        public async IAsyncEnumerable<UserDto> GetUsers()
        {
            await foreach (var user in this.userManager.Users.AsAsyncEnumerable())
            {
                yield return mapper.Map<UserDto>(user);
            }
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetUser([FromQuery] int id)
                     => mapper.Map<UserDto>(await userManager.FindByIdAsync(id.ToString()));

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDto>> GetUser(string username) 
            => mapper.Map<UserDto>(await userManager.FindByNameAsync(username));

        [HttpPut]
        public async Task<ActionResult<bool>> UpdateUser(UserDto userDto)
        {
            if (userDto is null)
            {
                return BadRequest("User is null");
            }

            var dbUser = await userManager.FindByIdAsync($"{userDto.Id}");

            dbUser.Age = userDto.Age;
            dbUser.UserName = userDto.UserName;
            dbUser.FirstName = userDto.FirstName;
            dbUser.LastName = userDto.LastName;
            dbUser.City = userDto.City;
            dbUser.Country = userDto.Country;
            dbUser.Balance = userDto.Balance;

            var result = await this.userManager.UpdateAsync(dbUser);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return true;
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            var user = await this.userManager.FindByIdAsync($"{id}");

            if (user == null) return BadRequest("User not found");

            var result = await this.userManager.DeleteAsync(user);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return true;
        }
    }
}