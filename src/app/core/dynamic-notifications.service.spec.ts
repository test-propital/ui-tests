import { TestBed } from '@angular/core/testing';

import { DynamicNotificationsService } from './dynamic-notifications.service';

describe('DynamicNotificationsService', () => {
  let service: DynamicNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
