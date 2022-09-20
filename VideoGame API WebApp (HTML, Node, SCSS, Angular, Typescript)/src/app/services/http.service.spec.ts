import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';

import { environment } from 'src/environments/environment';


describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
