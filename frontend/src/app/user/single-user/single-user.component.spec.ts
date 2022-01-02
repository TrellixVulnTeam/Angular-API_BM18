import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { SingleUserComponent } from './single-user.component';

describe('SingleUserComponent', () => {
  let component: SingleUserComponent;
  let fixture: ComponentFixture<SingleUserComponent>;

  beforeEach(() => {
    const stateServiceStub = () => ({
      mode$: { next: () => ({}) },
      part$: { subscribe: f => f({}) }
    });
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    const userServiceStub = () => ({
      getUserById: userId => ({ then: () => ({}) })
    });
    const authServiceStub = () => ({ userId: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SingleUserComponent],
      providers: [
        { provide: StateService, useFactory: stateServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SingleUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getUserById').and.callThrough();
      component.ngOnInit();
      expect(userServiceStub.getUserById).toHaveBeenCalled();
    });
  });

  describe('onModify', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onModify();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
