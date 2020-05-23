import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: '[app-product-card]',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() adToCart: EventEmitter<Product> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addItemToCart() {
    this.adToCart.emit(this.product);
  }

  navigateToProdDetail() {
    this.router.navigate(['/product-detail', this.product.id]).then(()=> {
      window.scroll(0,0);
    });
  }

}
