import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
    const promise = new Promise((resolve, reject) => {
      return this.http.get<[any]>('../../assets/data/products.json')
        .toPromise()
        .then((products: Product[]) => {
          const product = products.filter(p => p.id == id);
          if (product && product.length) {
            resolve(product[0]);  // Success
          } else {
            reject('Product Not Found'); // Error
          }
        }, err => {
          reject(err); // Error
        });
    });
    return promise;
  }

}
