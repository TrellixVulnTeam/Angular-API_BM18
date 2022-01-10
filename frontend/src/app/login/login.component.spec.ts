import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';
import { LoginComponent } from './login.component';

//Test module de conexion
describe('LoginComponent', () => {
  
  //Déclaration
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  //Initialisation
  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({
      login: (email, password) => ({ then: () => ({ catch: () => ({}) }) })
    });
    const stateServiceStub = () => ({ mode$: { next: () => ({}) } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: StateService, useFactory: stateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  //Test module
  it('Login - 1 - Vérification de la création du composant login', () => {
    expect(component).toBeTruthy();
  });

  //Test module
  it('Login - 2 - Vérification du chargement du module', () => {
    expect(component.loading).toEqual(false);
  });

  //Test fonction d'initialisation
  describe('Login - 3 - Vérification de la fonction ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  //Test fonction de connexion
  describe('Login - 4 - Vérification de la fonction onLogin', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'login').and.callThrough();
      component.onLogin();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.login).toHaveBeenCalled();
    });
  });
});
