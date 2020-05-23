import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './_services';
import { Component } from '@angular/core';

export class MockAuthenticationService {

}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MockHeaderComponent,
        MockFooterComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

/**
 * Create Mock Components
 */
@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent { }

@Component({
  selector: 'app-footer',
  template: ''
})
class MockFooterComponent { }
