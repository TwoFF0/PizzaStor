using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using Bogus;
using PizzaStore.Data;
using PizzaStore.Entities;

namespace PizzaStore.Extensions
{
    /// <summary>
    /// Generates random data.
    /// </summary>
    public static class SeedData
    {
        public static void GenerateSeedData(DataContext context, int itemCount)
        {
            if (context is null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (itemCount <= 0)
            {
                throw new ArgumentOutOfRangeException($"{itemCount} cannot be less or equal zero");
            }

            string[] urls =
            {
                "https://cdn.dodostatic.net/static/Img/Products/0396966407204134944ac9f7c580a666_292x292.png"
            };

            using var webClient = new WebClient();
            var photo = webClient.DownloadData(urls[0]);

            if (!context.Products.Any())
            {
                context.Products.AddRange(new Faker<Product>("en")
                    .RuleFor(x => x.Category, x => x.Commerce.Categories(1).First())
                    .RuleFor(x => x.Description, x => x.Commerce.ProductDescription())
                    .RuleFor(x => x.Name, x => x.Commerce.ProductName())
                    .RuleFor(x => x.Price, x => Math.Round(x.Random.Double()))
                    .RuleFor(x => x.Recipe, x => x.Lorem.Sentence(15))
                    .RuleFor(x => x.Image, x => photo)
                    .Generate(itemCount));

                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                for (int i = 0; i < itemCount; i++)
                {
                    using var hmac = new HMACSHA512();
                    var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                    var passSalt = hmac.Key;

                    context.Users.Add(new Faker<User>("en")
                        .RuleFor(x => x.Age, f => f.Random.Number(14, 99))
                        .RuleFor(x => x.UserName, f => f.Person.UserName.ToLower())
                        .RuleFor(x => x.City, f => f.Address.City())
                        .RuleFor(x => x.Country, f => f.Address.Country())
                        .RuleFor(x => x.FirstName, f => f.Name.FirstName())
                        .RuleFor(x => x.LastName, f => f.Name.LastName())
                        .RuleFor(x => x.CreatedAt, f => f.Date.Past(5))
                        .RuleFor(x => x.LastActive, f => f.Date.Past(5))
                        .RuleFor(x => x.PasswordHash, f => passwordHash)
                        .RuleFor(x => x.PasswordSalt, f => passSalt));
                }

                context.SaveChanges();
            }
        }
    }

}
