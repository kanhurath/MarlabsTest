import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { throttleTime, map, startWith } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component'
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  loading = false;
  showCart = false;
  cartItems: Array<any>;
  cartItemCount = 0;
  grandTotal = 0;
  showrResponsiveMenu = true;
  showrResponsiveMenuCloseBtn = false;
  viewLoginModalRef: BsModalRef;
  viewSignupModalRef: BsModalRef;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private modalService: BsModalService) { }

  ngOnInit() {
    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => document.body.offsetWidth < 1024;

    // Create observable from window resize event throttled so only fires every 500ms
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(throttleTime(500), map(checkScreenSize));

    // Start off with the initial value use the isScreenSmall$ | async in the
    // view to get both the original value and the new value after resize.
    screenSizeChanged$.pipe(startWith(checkScreenSize())).subscribe((data) => {
      this.showrResponsiveMenu = !data;
    });

    // Get Item form cart
    this.getCartItems();

    this.productService.getCartUpdatedSub().subscribe((status) => {
      this.getCartItems();
    });
  }

  getCartItems() {
    this.cartItemCount = 0;
    this.grandTotal = 0;
    this.productService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.cartItems.forEach(item => {
        this.cartItemCount = this.cartItemCount + item.qty;
        this.grandTotal += item.total_price;
      })
    });
  }

  removeFromCart(item) {
    this.productService.removeItem(item).subscribe(data => {
      this.getCartItems();
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']).then(() => {
      this.showCart = false;
    });
  }

  toggleMenu() {
    this.showrResponsiveMenu = !this.showrResponsiveMenu;
    this.showrResponsiveMenuCloseBtn = !this.showrResponsiveMenuCloseBtn;
  }

  openLoginModal() {
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      initialState: {}
    };
    this.viewLoginModalRef = this.modalService.show(LoginComponent, config);
    this.viewLoginModalRef.setClass('modal-lg');
  }

  openSignupModal() {
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      initialState: {}
    };
    this.viewSignupModalRef = this.modalService.show(SignupComponent, config);
    this.viewSignupModalRef.setClass('modal-lg');
  }

}
