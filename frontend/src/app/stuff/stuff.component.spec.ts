import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from '../_services/state.service';
import { AuthService } from '../_services/auth.service';
import { StuffComponent } from './stuff.component';

describe('StuffComponent', () => {
  let component: StuffComponent;
  let fixture: ComponentFixture<StuffComponent>;

  beforeEach(() => {
    const stateServiceStub = () => ({});
    const authServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StuffComponent],
      providers: [
        { provide: StateService, useFactory: stateServiceStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(StuffComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
