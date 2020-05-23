import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  heading = 'MarlabsTest';
  loading: boolean;
  products: Array<any>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts(4).subscribe((data: Array<Product>) => {
      this.products = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

}
