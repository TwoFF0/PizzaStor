using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaStore.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<User> userManager;

        public AdminController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("get-users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await userManager.Users
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.AppRole)
                .OrderBy(x => x.UserName)
                .Select(x => new
                {
                    id = x.Id,
                    userName = x.UserName,
                    roles = x.UserRoles.Select(x => x.AppRole.Name).ToList()
                }).ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-role/{username}")]
        public async Task<ActionResult> EditUserRole(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(',');

            var user = await userManager.FindByNameAsync(username);

            if (user is null) return BadRequest();

            var userRoles = await userManager.GetRolesAsync(user);

            var result = await userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)  return BadRequest(result.Errors); 

            result = await userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(await userManager.GetRolesAsync(user));
        }
    }
}
