﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Data;
using PizzaStore.DTOs;
using PizzaStore.Entities;
using PizzaStore.Interfaces.Repositories;

namespace PizzaStore.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async IAsyncEnumerable<UserDto> GetUsers()
        {
            await foreach (var user in this.userRepository.GetUsersAsync())
            {
                yield return mapper.Map<UserDto>(user);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDto>> GetUser(int id) => mapper.Map<UserDto>(await userRepository.GetUserByIdAsync(id));

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDto>> GetUser(string username) => mapper.Map<UserDto>(await userRepository.GetUserByUserNameAsync(username));

        [HttpPost]
        public async Task<ActionResult<UserDto>> PostUser(User user)
        {
            if (user is null)
            {
                return BadRequest("Empty user");
            }

            return mapper.Map<UserDto>(await this.userRepository.PostUserAsync(user));
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            return await this.userRepository.DeleteUserAsync(id);
        }
    }
}