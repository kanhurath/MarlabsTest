import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  product: any;
  loadingProduct: boolean;

  relatedProducts: Array<any>;
  loadingRelatedProducts: boolean;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fetchProduct();
      this.fetchRelatedProducts();
    })
  }

  ngOnInit(): void {
    // ngOnInit Code
  }

  fetchProduct() {
    this.loadingProduct = true;
    this.productService.getProduct(this.id).then((data: Product) => {
      this.product = data;
      this.loadingProduct = false;
    }, error => {
      console.log(error);
      this.loadingProduct = false;
    });
  }

  fetchRelatedProducts() {
    this.loadingRelatedProducts = true;
    this.productService.getRelatedProducts(this.id, 3).subscribe((data: Product[]) => {
      this.relatedProducts = data;
      this.loadingRelatedProducts = false;
    }, error => {
      console.log(error);
      this.loadingRelatedProducts = false;
    });
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

}
