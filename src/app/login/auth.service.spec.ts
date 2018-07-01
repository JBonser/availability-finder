import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [AuthService]
    });
  });

  it('should be created', async(inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  })));
});
