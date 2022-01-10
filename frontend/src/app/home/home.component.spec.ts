import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  //Déclaration
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  //Initialisation
  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({
      isAuth$: { next: () => ({}) },
      userId: {},
      token: {}
    });
    const stateServiceStub = () => ({ part$: { next: () => ({}) }, part: {} });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: StateService, useFactory: stateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  //Vérification composant
  it('Home - 1 - Charger la page d\'accueil', () => {
    expect(component).toBeTruthy();
  });

  //Vérification variable
  it('Home - 2 - Vérification du chemin de l\'icone Polytech Tours', () => {
    expect(component.icone).toEqual('/assets/_image/icone/5.png');
  });

  //Vérification variable
  it('Home - 3 - Vérification de la variable title', () => {
    expect(component.title).toEqual('PolyCommerce');
  });

  //Vérification d'une balise HTML
  it('Home - 4 - Vérification de la balise h1 du bandeau de la page d\'accueil', () => {
   fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent)
      .toContain('Site interne de Polytech Tours');
  });


  //Vérification d'une balise HTML
  it('Home - 5 - Vérification de la balise h2 de la page d\'accueil de Polytech Tours', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent)
      .toContain('Polytech Tours');
  });
});
