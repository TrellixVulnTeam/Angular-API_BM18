import { TestBed } from '@angular/core/testing';
import { StuffListComponent} from './../../app/stuff/stuff-list/stuff-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Thing } from '../_models/thing.model';
import { StuffService } from './stuff.service';

describe('StuffService', () => {
  let service: StuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StuffService]
    });
    service = TestBed.inject(StuffService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

 /* describe('getStuff', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'emitStuff').and.callThrough();
      service.getStuff().subscribe(res => {
        expect(res).toEqual();
      });
      expect(service.emitStuff).toHaveBeenCalled();
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush();
      httpTestingController.verify();
    });
  });*/
});
