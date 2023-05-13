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

            string[] photos =
            {
                "https://cdn.dodostatic.net/static/Img/Products/de603d5d277e4803af12f72101caf067_233x233.png",
                "https://cdn.dodostatic.net/static/Img/Products/f04f6e1cd2004bfa83389a3563076053_292x292.png",
                "https://cdn.dodostatic.net/static/Img/Products/85286afe65d6492f9f0cabdb41886e4f_366x366.png"
            };

            string[] otherPhotos =
            {
                "https://cdn.dodostatic.net/static/Img/Products/d224a75b54cd48008621053fb23f725c_292x292.jpeg"
            };

            string[] sizes =
            {
                "S",
                "M",
                "L"
            };

            var dict = new Dictionary<int, double>()
            {
                {0, 1},
                {1, 1.35},
                {2, 1.85}
            };

            var categories = new List<string>()
            {
                "Pizza",
                "Beverages",
                "Desserts",
                "Other"
            };

            var random = new Random();

            if (!context.Products.Any())
            {
                for (int i = 0; i < itemCount; i++)
                {
                    var listOfSizes = new List<ProductSize>();

                    var templateProduct = new Faker<Product>("en")
                       .RuleFor(x => x.Category, x => categories[x.Random.Int(0, 2)])
                       .RuleFor(x => x.Description, x => x.Commerce.ProductDescription())
                       .RuleFor(x => x.Name, x => x.Commerce.ProductName());

                    var smallWeight = random.Next(450, 550);
                    var smallPrice = random.Next(5, 12);

                    for (int j = 0; j < 3; j++)
                    {
                        var productSize = new Faker<ProductSize>("en")
                            .RuleFor(x => x.ImageUrl, x => photos[j])
                            .RuleFor(x => x.Size, x => sizes[j])
                            .RuleFor(x => x.Price, x => Math.Round(smallPrice * dict[j]) - 0.01)
                            .RuleFor(x => x.Weight, x => Convert.ToInt32(smallWeight * dict[j]).RoundOff()).Generate();

                        listOfSizes.Add(productSize);
                    }

                    var temp = templateProduct.Generate();
                    temp.ProductSizes = listOfSizes;

                    context.Products.Add(temp);
                    context.SaveChanges();
                }

                for (int i = 0; i < 10; i++)
                {
                    var listOfSizes = new List<ProductSize>();

                    var product = new Faker<Product>("en")
                        .RuleFor(x => x.Category, x => categories[3])
                        .RuleFor(x => x.Description, x => x.Commerce.ProductDescription())
                        .RuleFor(x => x.Name, x => x.Commerce.ProductName());

                    var Weight = random.Next(100, 200);
                    var Price = random.Next(5, 12);

                    var productSize = new Faker<ProductSize>("en")
                        .RuleFor(x => x.ImageUrl, x => otherPhotos[0])
                        .RuleFor(x => x.Price, x => Math.Round(Price * 1.3) - 0.01)
                        .RuleFor(x => x.Weight, x => Convert.ToInt32(Weight).RoundOff()).Generate();

                    listOfSizes.Add(productSize);

                    product.RuleFor(x => x.ProductSizes, x => listOfSizes);

                    context.Products.Add(product);

                    context.SaveChanges();
                }
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
                                    .RuleFor(x => x.Balance, f => Math.Round(f.Random.Double(5, 150), 2))
                                    .RuleFor(x => x.PasswordHash, f => passwordHash)
                                    .RuleFor(x => x.PasswordSalt, f => passSalt));
                }

                context.SaveChanges();
            }
        }
    }

}