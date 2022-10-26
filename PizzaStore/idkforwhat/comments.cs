//namespace PizzaStore.idkforwhat
//{
//    public class comments
//    {
//    }
//}


////for (int j = 0; j < 3; j++)
////{
////    var productSize = new Faker<ProductSize>("en")
////        .RuleFor(x => x.ImageUrl, x => photos[j])
////        .RuleFor(x => x.Size, x => sizes[j])
////        .RuleFor(x => x.Price, x => Math.Round(smallPrice * dict[j]) - 0.01)
////        .RuleFor(x => x.Weight, x => Convert.ToInt32(smallWeight * dict[j]).RoundOff());

////    context.Products.Add(product.RuleFor(x => x.ProductSize, x => productSize));
////}



//var product = new Faker<Product>("en")
//    .RuleFor(x => x.Category, x => categories[x.Random.Int(0, 3)])
//    .RuleFor(x => x.Description, x => x.Commerce.ProductDescription())
//    .RuleFor(x => x.Name, x => x.Commerce.ProductName());

//for (int j = 0; j < 3; j++)
//{
//    var productSize = new Faker<ProductSize>("en")
//        .RuleFor(x => x.ImageUrl, x => photos[j])
//        .RuleFor(x => x.Size, x => sizes[j])
//        .RuleFor(x => x.Price, x => Math.Round(smallPrice * dict[j]) - 0.01)
//        .RuleFor(x => x.Weight, x => Convert.ToInt32(smallWeight * dict[j]).RoundOff());

//    if (j == 0)
//    {
//        context.Products.Add(product.RuleFor(x => x.ProductSize, x => productSize));
//    }
//    else
//    {
//        var generatedProduct = context.Products.Find(3 * i + 1);
//        generatedProduct.ProductSize = productSize;
//        context.Products.Add(generatedProduct);
//    }

//    context.SaveChanges();
//}


// ToCart() {
//     this.passEntry.emit(this.selectedProduct);
//     this.activeModal.dismiss();
// }

// modalRef.componentInstance.passEntry.subscribe(
//      (receivedEntryToCart: Product) => {
//     console.log(receivedEntryToCart);
// }
//     );



/* import { Product } from './../_models/Product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: Product[] = [];

  constructor() {}

  add(product: Product) {
    this.cartProducts.push(product);
  }

  remove(product: Product) {
    var indx = this.cartProducts.indexOf(product);

    if (indx !== -1) {
      this.cartProducts.splice(indx, 1);
    }
  }

  clear() {
    this.cartProducts = [];
  }
} */

