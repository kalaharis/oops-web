import { TestBed, inject } from '@angular/core/testing';

import { RouteStateService } from './route-state.service';

describe('RouteStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteStateService]
    });
  });

  it('should be created', inject([RouteStateService], (service: RouteStateService) => {
    expect(service).toBeTruthy();
  }));
});
