import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StateService } from '../../_services/state.service';
import { UserService } from '../../_services/user.service';
import { ModifyUserComponent } from './modify-user.component';

describe('ModifyUserComponent', () => {
  let component: ModifyUserComponent;
  let fixture: ComponentFixture<ModifyUserComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const stateServiceStub = () => ({
      part$: { subscribe: f => f({}) },
      mode$: { next: () => ({}) }
    });
    const userServiceStub = () => ({
      getUserById: id => ({ then: () => ({}) }),
      modifyUser: (_id, user1) => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ModifyUserComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: StateService, useFactory: stateServiceStub },
        { provide: UserService, useFactory: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ModifyUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(userServiceStub, 'getUserById').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(userServiceStub.getUserById).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(userServiceStub, 'modifyUser').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(userServiceStub.modifyUser).toHaveBeenCalled();
    });
  });
});
