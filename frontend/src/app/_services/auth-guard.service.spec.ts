import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { StateService } from './state.service';
import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  let service: AuthGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({ isAuth$: { subscribe: f => f({}) } });
    const stateServiceStub = () => ({ part$: { subscribe: f => f({}) } });
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: StateService, useFactory: stateServiceStub }
      ]
    });
    service = TestBed.inject(AuthGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
      const routerStub: Router = TestBed.inject(Router);
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      spyOn(routerStub, 'navigate').and.callThrough();
      service.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
