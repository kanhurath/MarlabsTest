import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: Array<any>;
  cartItemCount = 0;
  grandTotal = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
     // Get Item form cart
     this.productService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.cartItems.forEach(item => {
        this.cartItemCount = this.cartItemCount + item.qty;
        this.grandTotal = this.grandTotal + (item.price * item.qty);
      })
    });
  }

}
