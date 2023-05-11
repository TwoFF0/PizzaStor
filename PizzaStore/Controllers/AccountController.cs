﻿using System;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using PizzaStore.Data;
using PizzaStore.DTOs;
using PizzaStore.Entities;
using PizzaStore.Interfaces;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace PizzaStore.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext dataContext, ITokenService tokenService)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
        {
            if (registerDto is null)
                throw new ArgumentNullException(nameof(registerDto));

            if (await UserExist(registerDto.UserName))
                return BadRequest("This username is taken");

            using var hmac = new HMACSHA512();

            var user = new User()
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();

            return new AccountDto()
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user is null)
                return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            if (user.PasswordHash.Where((t, i) => t != computedHash[i]).Any())
                return Unauthorized("Invalid password");

            var token = _tokenService.CreateToken(user);

            return new AccountDto()
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExist(string userName) => await _dataContext.Users.AnyAsync(x => x.UserName == userName.ToLower());
    }
}
