import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantItemDetailsComponent } from './restaurant-item-details.component';

describe('RestaurantItemDetailsComponent', () => {
  let component: RestaurantItemDetailsComponent;
  let fixture: ComponentFixture<RestaurantItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
