import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from '../_services/state.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    const stateServiceStub = () => ({
      mode$: { subscribe: f => f({}) },
      part$: { subscribe: f => f({}) }
    });
    const authServiceStub = () => ({
      isAuth$: { subscribe: f => f({}) },
      logout: () => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: StateService, useFactory: stateServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogout', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(authServiceStub, 'logout').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onLogout();
      expect(authServiceStub.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('onBackToParts', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onBackToParts();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
