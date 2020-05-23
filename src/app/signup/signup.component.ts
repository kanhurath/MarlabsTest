import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  showPassword = false;
  returnUrl: string;
  error = '';
  viewLoginModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      mbnumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }

  openLoginModal() {
    this.bsModalRef.hide();
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

  onSubmit() {
    this.submitted = true;
    // alert(JSON.stringify(this.loginForm.value));

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.signup(this.f.mbnumber.value,this.f.name.value,this.f.username.value, this.f.password.value).pipe(first()).subscribe(data => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }
}







