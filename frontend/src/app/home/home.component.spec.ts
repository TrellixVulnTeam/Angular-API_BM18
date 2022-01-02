import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('icone has default value', () => {
    expect(component.icone).toEqual('/assets/_image/icone/5.png');
  });

  it('title has default value', () => {
    expect(component.title).toEqual('PolyCommerce');
  });
});
