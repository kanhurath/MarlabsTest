import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  loading = false;
  showrResponsiveMenu = false;
  viewLoginModalRef: BsModalRef;
  viewSignupModalRef: BsModalRef;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: BsModalService) { }

  ngOnInit() {
    // ngOnInit
  }

  toggleMenu() {
    this.showrResponsiveMenu = !this.showrResponsiveMenu;
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
