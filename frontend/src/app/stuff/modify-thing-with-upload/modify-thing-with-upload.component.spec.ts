import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ModifyThingWithUploadComponent } from './modify-thing-with-upload.component';

describe('ModifyThingWithUploadComponent', () => {
  let component: ModifyThingWithUploadComponent;
  let fixture: ComponentFixture<ModifyThingWithUploadComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const stateServiceStub = () => ({ mode$: { next: () => ({}) } });
    const stuffServiceStub = () => ({
      getThingById: id => ({ then: () => ({}) }),
      modifyThingWithFile: (_id, thing1, value) => ({ then: () => ({}) })
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({ userId: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ModifyThingWithUploadComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: StateService, useFactory: stateServiceStub },
        { provide: StuffService, useFactory: stuffServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ModifyThingWithUploadComponent);
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
      const stuffServiceStub: StuffService = fixture.debugElement.injector.get(
        StuffService
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(stuffServiceStub, 'getThingById').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(stuffServiceStub.getThingById).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const stuffServiceStub: StuffService = fixture.debugElement.injector.get(
        StuffService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(stuffServiceStub, 'modifyThingWithFile').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(stuffServiceStub.modifyThingWithFile).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
