import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  heading = 'Product List';
  loading: boolean;
  products: Array<any>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

}
