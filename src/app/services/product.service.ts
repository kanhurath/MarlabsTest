import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from '../models/product';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cartUpdatedSub =  new Subject();

  constructor(private http: HttpClient) { }

  getProducts(limit?: number) {
    if(limit) {
      return this.http.get<Array<Product>>("../../assets/data/products.json").pipe(
        map(posts => posts.slice(0, limit)),
        tap(products => console.log(products) )
      );
    } else {
      return this.http.get<Array<any>>("../../assets/data/products.json");
    }
  }

  getProduct(id: number) {
    return this.http.get<Array<Product>>("../../assets/data/products.json").pipe(
      map(products => products.filter(p => p.id === id)[0]),
      tap(product => console.log(product))
    ).toPromise();
  }

  getRelatedProducts(id: number, limit: number) {
      return this.http.get<Array<Product>>("../../assets/data/products.json").pipe(
        map(products => products.filter(p => p.id !== id)),
        map(products => products.slice(0, limit)),
        tap(products => console.log(products))
      );
  }

  getCartUpdatedSub() {
    return this.cartUpdatedSub.asObservable();
  }

  addToCart(product: Product) {
    console.log(product);
    let cartItems = [];
    if(localStorage.getItem('cartItems')) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems'));
      const index = cartItems.findIndex(item => item.id == product.id);
      console.log(cartItems);
      console.log(index);
      if(index === -1) {
        cartItems = [{...product, qty: 1, total_price: product.price}, ...JSON.parse(localStorage.getItem('cartItems'))];
      } else {
        cartItems[index]['qty'] = cartItems[index]['qty'] + 1;
        cartItems[index]['total_price'] = cartItems[index]['qty'] * product.price;
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      cartItems = [{...product, qty: 1, total_price: product.price}];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    this.cartUpdatedSub.next(true);
    console.log(localStorage.getItem('cartItems'));
    return of({'msg' : 'Product addedd to cart successfully!'});
  }

  getCartItems() {
    if(localStorage.getItem('cartItems')) {
      return of(JSON.parse(localStorage.getItem('cartItems')));
    }
    return of([]);
  }

  removeItem(product: Product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const updatedCartItems = cartItems.filter(p => p.id !== product.id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    this.cartUpdatedSub.next(true);
    return of({'msg' : 'Product removed from cart successfully!'});
  }

}
