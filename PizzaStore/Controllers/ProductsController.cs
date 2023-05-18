using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PizzaStore.DTOs.Products;
using PizzaStore.Entities;
using PizzaStore.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace PizzaStore.Controllers
{
    public class ProductsController : BaseApiController
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
                yield return mapper.Map<ProductDto>(product);
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

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<ActionResult<int>> PostProduct(ProductDto productDto)
        {
            if (productDto is null)
            {
                return BadRequest("Product object is null!");
            }

            return Ok(await repository.PostProductAsync(mapper.Map<Product>(productDto)));
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> UpdateProduct(ProductDto productDto, int id)
        {
            if (productDto is null)
            {
                return BadRequest("Product object is null!");
            }

            return Ok(await repository.UpdateProductAsync(mapper.Map<Product>(productDto), id));
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
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
