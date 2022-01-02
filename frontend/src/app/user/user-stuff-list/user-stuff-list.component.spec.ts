import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserStuffListComponent } from './user-stuff-list.component';

describe('UserStuffListComponent', () => {
  let component: UserStuffListComponent;
  let fixture: ComponentFixture<UserStuffListComponent>;

  beforeEach(() => {
    const stateServiceStub = () => ({
      mode$: { next: () => ({}) },
      part$: { subscribe: f => f({}) }
    });
    const stuffServiceStub = () => ({
      stuffUser$: { subscribe: f => f({}) },
      getStuffUser: userId => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({ userId: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserStuffListComponent],
      providers: [
        { provide: StateService, useFactory: stateServiceStub },
        { provide: StuffService, useFactory: stuffServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UserStuffListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`part has default value`, () => {
    expect(component.part).toEqual(0);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const stuffServiceStub: StuffService = fixture.debugElement.injector.get(
        StuffService
      );
      spyOn(stuffServiceStub, 'getStuffUser').and.callThrough();
      component.ngOnInit();
      expect(stuffServiceStub.getStuffUser).toHaveBeenCalled();
    });
  });
});
