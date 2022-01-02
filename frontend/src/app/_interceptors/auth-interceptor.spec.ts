import { TestBed } from '@angular/core/testing';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    const authServiceStub = () => ({ token: {} });
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(AuthInterceptor);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept', () => {
    it('makes expected calls', () => {
      const httpHandlerStub: HttpHandler = <any>{};
      const httpRequestStub: HttpRequest<any> = <any>{};
      spyOn(httpHandlerStub, 'handle').and.callThrough();
      spyOn(httpRequestStub, 'clone').and.callThrough();
      service.intercept(httpRequestStub, httpHandlerStub);
      expect(httpHandlerStub.handle).toHaveBeenCalled();
      expect(httpRequestStub.clone).toHaveBeenCalled();
    });
  });
});
