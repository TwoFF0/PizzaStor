using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaStore.DTOs;
using PizzaStore.Entities;
using PizzaStore.Interfaces.Repositories;

namespace PizzaStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository repository;
        private readonly IMapper mapper;

        public ProductsController(IProductRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async IAsyncEnumerable<ProductDto> GetProducts()
        {
            await foreach (var product in repository.GetAllProductsAsync())
            {
                var productSizeDto = mapper.Map<IEnumerable<ProductSizeDto>>(product.ProductSizes);
                var productDto = mapper.Map<ProductDto>(product);
                productDto.ProductSize = productSizeDto;

                yield return productDto;
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetProductById(int id) => Ok(mapper.Map<ProductDto>(await repository.GetProductByIdAsync(id)));

        [HttpGet("{category}")]
        public async IAsyncEnumerable<ActionResult<ProductDto>> GetProductByCategory(string category)
        {
            await foreach (var product in repository.GetProductsByCategoryAsync(category))
            {
                yield return mapper.Map<ProductDto>(product);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> PostProduct(Product product)
        {
            if (product is null)
            {
                return BadRequest("Product object is null!");
            }

            return Ok(mapper.Map<ProductDto>(await repository.PostProductAsync(product)));
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteProduct(int id) => Ok(await repository.DeleteProductAsync(id));

        //[HttpGet("{id:int}/image")]
        //public async Task<IActionResult> GetProductPhoto(int id)
        //{
        //    var photo = await this.repository.GetProductPhotoAsync(id);

        //    if (photo is null)
        //    {
        //        return this.NotFound();
        //    }

        //    return this.File(photo, "image/png");
        //}

        //[HttpPost("{id:int}/image")]
        //public async Task<IActionResult> PostProductPhoto(int id, IFormFile image)
        //{
        //    if (image is null)
        //    {
        //        return this.BadRequest();
        //    }

        //    await using var ms = new MemoryStream();
        //    await image.CopyToAsync(ms);

        //    if (!await this.repository.PostProductPhotoAsync(id, ms))
        //    {
        //        return this.NotFound();
        //    }

        //    return this.NoContent();
        //}

        //[HttpDelete("{id}/photo")]
        //public async Task<IActionResult> DeletePhotoAsync(int id)
        //{
        //    if (!await this.repository.DeleteProductPhotoAsync(id))
        //    {
        //        return this.NotFound();
        //    }

        //    return this.NoContent();
        //}

    }
}
