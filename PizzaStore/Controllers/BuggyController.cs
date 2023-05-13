using Microsoft.AspNetCore.Mvc;
using PizzaStore.Data;
using Microsoft.AspNetCore.Authorization;

namespace PizzaStore.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext dataContext;

        public BuggyController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "some secret";
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var user = this.dataContext.Users.Find(-1);

            var error = user.ToString();

            return error;
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var user = this.dataContext.Users.Find(-1);

            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("You are requesting not existing data.");
        }
    }
}