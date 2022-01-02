import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StuffService } from '../../_services/stuff.service';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder } from '@angular/forms';
import { SingleThingComponent } from './single-thing.component';

describe('SingleThingComponent', () => {
  let component: SingleThingComponent;
  let fixture: ComponentFixture<SingleThingComponent>;

  beforeEach(() => {
    const stateServiceStub = () => ({
      mode$: { next: () => ({}) },
      part$: { subscribe: f => f({}) }
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const stuffServiceStub = () => ({
      getThingById: id => ({ then: () => ({}) }),
      modifyReservation: (_id, thing1) => ({ then: () => ({}) }),
      deleteThing: _id => ({ then: () => ({}) })
    });
    const authServiceStub = () => ({ userId: {} });
    const formBuilderStub = () => ({ group: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SingleThingComponent],
      providers: [
        { provide: StateService, useFactory: stateServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: StuffService, useFactory: stuffServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub }
      ]
    });
    fixture = TestBed.createComponent(SingleThingComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const stuffServiceStub: StuffService = fixture.debugElement.injector.get(
        StuffService
      );
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(stuffServiceStub, 'getThingById').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(stuffServiceStub.getThingById).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('onReserv', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const stuffServiceStub: StuffService = fixture.debugElement.injector.get(
        StuffService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(stuffServiceStub, 'modifyReservation').and.callThrough();
      component.onReserv();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(stuffServiceStub.modifyReservation).toHaveBeenCalled();
    });
  });

  describe('onGoBack', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onGoBack();
      expect(routerStub.navigate).toHaveBeenCalled();
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

  describe('onDelete', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const stuffServiceStub: StuffService = fixture.debugElement.injector.get(
        StuffService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(stuffServiceStub, 'deleteThing').and.callThrough();
      component.onDelete();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(stuffServiceStub.deleteThing).toHaveBeenCalled();
    });
  });

  describe('clickMethod', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onDelete').and.callThrough();
      component.clickMethod();
      expect(component.onDelete).toHaveBeenCalled();
    });
  });
});
