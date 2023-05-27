import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantItemUpdateComponent } from './restaurant-item-update.component';

describe('RestaurantItemUpdateComponent', () => {
  let component: RestaurantItemUpdateComponent;
  let fixture: ComponentFixture<RestaurantItemUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantItemUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
