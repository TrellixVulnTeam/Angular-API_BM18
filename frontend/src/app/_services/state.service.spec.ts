import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StateService] });
    service = TestBed.inject(StateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`part has default value`, () => {
    expect(service.part).toEqual(0);
  });
});
