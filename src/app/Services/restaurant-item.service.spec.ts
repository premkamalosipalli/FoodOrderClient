import { TestBed } from '@angular/core/testing';

import { RestaurantItemService } from './restaurant-item.service';

describe('RestaurantItemService', () => {
  let service: RestaurantItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
