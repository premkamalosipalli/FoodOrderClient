import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRestaurantItemsComponent } from './list-restaurant-items.component';

describe('ListRestaurantItemsComponent', () => {
  let component: ListRestaurantItemsComponent;
  let fixture: ComponentFixture<ListRestaurantItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRestaurantItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRestaurantItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
