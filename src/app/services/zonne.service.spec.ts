import { TestBed } from '@angular/core/testing';

import { ZonneService } from './zonne.service';

describe('ZonneService', () => {
  let service: ZonneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
