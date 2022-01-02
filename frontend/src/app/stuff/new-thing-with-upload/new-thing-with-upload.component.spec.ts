import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { NewThingWithUploadComponent } from './new-thing-with-upload.component';

describe('NewThingWithUploadComponent', () => {
  let component: NewThingWithUploadComponent;
  let fixture: ComponentFixture<NewThingWithUploadComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const stateServiceStub = () => ({ mode$: { next: () => ({}) } });
    const stuffServiceStub = () => ({
      createNewThingWithFile: (thing, value) => ({ then: () => ({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({ userId: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewThingWithUploadComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: StateService, useFactory: stateServiceStub },
        { provide: StuffService, useFactory: stuffServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NewThingWithUploadComponent);
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
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const stuffServiceStub: StuffService = fixture.debugElement.injector.get(
        StuffService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(stuffServiceStub, 'createNewThingWithFile').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(stuffServiceStub.createNewThingWithFile).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
