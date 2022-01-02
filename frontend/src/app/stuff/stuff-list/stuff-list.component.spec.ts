import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { Router } from '@angular/router';
import { StuffListComponent } from './stuff-list.component';

describe('StuffListComponent', () => {
  let component: StuffListComponent;
  let fixture: ComponentFixture<StuffListComponent>;

  beforeEach(() => {
    const stateServiceStub = () => ({
      mode$: { next: () => ({}) },
      part$: { subscribe: f => f({}) }
    });
    const stuffServiceStub = () => ({
      stuff$: { subscribe: f => f({}) },
      getStuff: () => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StuffListComponent],
      providers: [
        { provide: StateService, useFactory: stateServiceStub },
        { provide: StuffService, useFactory: stuffServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(StuffListComponent);
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
      spyOn(stuffServiceStub, 'getStuff').and.callThrough();
      component.ngOnInit();
      expect(stuffServiceStub.getStuff).toHaveBeenCalled();
    });
  });
});
