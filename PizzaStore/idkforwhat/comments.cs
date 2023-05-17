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



//using Microsoft.AspNetCore.Http;
//using System;

//Response.Cookies.Append("key", "value", new CookieOptions()
//{
//    Expires = DateTime.UtcNow.AddDays(7),
//    HttpOnly = false
//});

//Response.Cookies.Append("sessionId", HttpContext.Session.Id, new CookieOptions()
//{
//    Expires = DateTime.UtcNow.AddDays(7),
//    HttpOnly = false
//});


//using AutoMapper.Execution;

//private cart = new BehaviorSubject({
//    orderId: this.orderId,
//    itemCount: this.itemCount,
//  });

//cartValue$ = this.cart.asObservable();

//get orderId(): string {
//    const id = this.storage.getItem('order-id');
//return id ? id : '';
//  }

//  set orderId(id: string) {
//    this.storage.addItem('order-id', id);
//    this.cart.next({ orderId: id, itemCount: this.itemCount });
//}

//get itemCount(): number {
//    const itemCount = this.storage.getItem('item-count');

//return itemCount ? parseInt(itemCount) : 0;
//  }

//  set itemCount(amount: number) {
//    this.storage.addItem('item-count', amount.toString());
//    this.cart.next({ orderId: this.orderId, itemCount: amount });
//}

//incrementItemCount(amount: number) {
//    this.itemCount = this.itemCount + amount;
//}

//decrementItemCount(amount: number) {
//    this.itemCount = this.itemCount - amount;
//}

//clearCart() {
//    this.storage.deleteItem('item-count');
//    this.cart.next({ orderId: '', itemCount: 0 });
//}








////using Microsoft.AspNetCore.Http;

////var cookies = HttpContext.Request.Cookies;
////var coo = HttpContext.Session.Keys;
////var c = HttpContext;

////HttpContext.si

////HttpContext.Response.Cookies.Append("sessionId", $"{user.UserName}:{token}", new CookieOptions()
////{
////    //HttpOnly = true,
////    Expires = DateTimeOffset.Now + TimeSpan.FromSeconds(600),
////    //IsEssential = true,
////    //SameSite = SameSiteMode.None
//});






//using PizzaStore.Entities;

//addToCart(prodcutId: number, productSizeId: number) {
//    if (!this.plainOrder)
//    {
//        this.toastr.info('Please Log in before making an order :)');
//        this.toModalAuthenticate();

//        return;
//    }

//    this.storage.addItem(
//      'cart',
//      this.storage.getItem('cart') +
//        prodcutId.toString() +
//        '.' +
//        productSizeId +
//        '|'
//    );

//    this.count++;
//    this.plainOrder = this.storage.getItem('cart')!;
//}









//  < ng - container * ngIf = "product.category == 'Other'; else productWeight" >
//        < p * ngIf = "product.productSize.size" class= "text-muted d-inline" >
//          { { product.productSize.size } }
//size,
//        </p>
//        <p class= "text-muted d-inline" >{ { product.productSize.weight } }
//g.</ p >
//      </ ng - container >
//      < ng - template #productWeight>
//        < p * ngIf = "product.productSize.size" class= "text-muted d-inline" >
//          { { product.productSize.size } }
//size,
//        </p>
//        <p class= "text-muted d-inline" >
//          Traditional dough, {{ product.productSize.weight }} g.
//        </ p >
//      </ ng - template >















//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Injectable } from '@angular/core';
//import { AuthenticateModalComponent } from 'src/app/features/auth/authenticate-modal.component';
//import { ToastrService } from 'ngx-toastr';
//import { OrderItem } from '../models/OrderItem';
//import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

//@Injectable({
//providedIn: 'root',
//})
//export class CartService
//{
//    constructor(
//    private modalService: NgbModal,
//    private toastr: ToastrService,
//    private storage: LocalStorageService
//  ) {}

//  orderItems: OrderItem[] = [];
//  plainOrder: string;

//  addToCart(itemToAdd: OrderItem)
//    {
//        if (!this.storage.getItem('user'))
//        {
//            this.toastr.info('Please Log in before making an order :)');
//            this.toModalAuthenticate();

//            return;
//        }

//        if (
//          this.orderItems.find(
//            (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
//          ) || this.storage.getItem('cart')?.startsWith(itemToAdd.name + '.' + itemToAdd.size + '.' + itemToAdd.count)
//        )
//        {
//            let item = this.orderItems.find(
//              (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
//            )!;



//            item.count++;
//        }
//        else
//        {
//            this.orderItems.push(itemToAdd);
//        }
//    }

//    setOrderItems(plainCart: string)
//    {

//    }

//    toModalAuthenticate()
//    {
//        this.modalService.open(AuthenticateModalComponent, {
//        centered: true,
//      size: 'm',
//    });
//    }
//}







































//let orderItemIndex = this.storage
//       .getItem('cart')
//       ?.indexOf(
//         itemToAdd.id + '.' + itemToAdd.size + '.' + itemToAdd.count
//       )!;

//let foundedOrderItem = this.storage.getItem('cart')?.substring(orderItemIndex).split('|')[0]!;
//let splittedOrderItem = foundedOrderItem.split('.');
//let countOfOrderItem = splittedOrderItem[2];

//let indexOfCount = orderItemIndex + splittedOrderItem[0].length + splittedOrderItem[1].length;
//let countLength = countOfOrderItem.length;






























//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Injectable } from '@angular/core';
//import { AuthenticateModalComponent } from 'src/app/features/auth/authenticate-modal.component';
//import { ToastrService } from 'ngx-toastr';
//import { OrderItem } from '../models/OrderItem';
//import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
//import { Product } from '../models/Product';
//import { ProductService } from './product.service';

//@Injectable({
//providedIn: 'root',
//})
//export class CartService
//{
//    constructor(
//    private modalService: NgbModal,
//    private toastr: ToastrService,
//    private productService: ProductService,
//    private storage: LocalStorageService,
//  ) {}

//  products: Product[];
//  orderItems: OrderItem[] = [];
//  plainOrder: string;

//  addToCart(itemToAdd: OrderItem)
//    {
//        if (!this.storage.getItem('user'))
//        {
//            this.toastr.info('Please Log in before making an order :)');
//            this.toModalAuthenticate();

//            return;
//        }

//        if (this.storage.getItem('cart') == null)
//        {
//            this.storage.addItem('cart', '');
//        }

//        if (itemToAdd.size == null)
//        {
//            itemToAdd.size = 'WS';
//        }

//        if (
//          this.orderItems.find(
//            (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
//          )
//        )
//        {
//            let item = this.orderItems.find(
//              (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
//            )!;

//            item.count++;
//            if (
//              this.storage
//                .getItem('cart')!
//                .includes(itemToAdd.id + '.' + itemToAdd.size)
//            )
//            {
//                let oldOrders = this.storage.getItem('cart')!;

//                let count =
//                  +oldOrders
//                    .substring(oldOrders.indexOf(itemToAdd.id + '.' + itemToAdd.size))
//                    .split('|')[0]
//                    .split('.')[2];

//                let countPlusOne = count + 1;

//                let newOrders = oldOrders.replace(
//                  itemToAdd.id + '.' + itemToAdd.size + '.' + count,
//                  itemToAdd.id + '.' + itemToAdd.size + '.' + countPlusOne
//                );

//                this.storage.addItem('cart', newOrders);
//            }
//        }
//        else
//        {
//            this.orderItems.push(itemToAdd);

//            this.storage.addItem(
//              'cart',
//              this.storage.getItem('cart')! +
//                itemToAdd.id +
//                '.' +
//                itemToAdd.size +
//                '.' +
//                itemToAdd.count +
//                '|'
//            );
//        }
//    }

//    fillOrderItems(itemToAdd: OrderItem)
//    {
//        if (
//         this.orderItems.find(
//           (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
//         )
//       )
//        {
//            let item = this.orderItems.find(
//              (x) => x.name == itemToAdd.name && x.size == itemToAdd.size
//            )!;

//            item.count++;
//        }
//        else
//        {
//            this.orderItems.push(itemToAdd);
//        }
//    }

//    async setOrderItems(plainCart: string)
//    {
//        await this.getProducts();
//        let plainItems = plainCart.split('|');

//        for (let i = 0; i < plainItems.length - 1; i++)
//        {
//            let y = plainItems[i];
//            let foundedProduct = this.products.find(x => x.id == +plainItems[i].split('.')[0])!;
//            let foundedSize = foundedProduct.productSize.find(x => x.size == plainItems[i].split('.')[1])!;
//            this.addToCart(
//              {
//            id: foundedProduct.id,
//          name: foundedProduct.name,
//          size: foundedSize.size,
//          price: foundedSize.price,
//          weight: foundedSize.weight,
//          imageUrl: foundedSize.imageUrl,
//          count: +plainItems[i].split('.')[2]
//        } as OrderItem
//        )
//  }

//}

//async getProducts()
//{
//    this.products = await this.productService.getProducts();
//}

//toModalAuthenticate() {
//    this.modalService.open(AuthenticateModalComponent, {
//    centered: true,
//      size: 'm',
//    });
//}
//}