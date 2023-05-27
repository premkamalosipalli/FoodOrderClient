import { Component, OnInit } from '@angular/core';
import { RestaurantItem } from '../entities/RestaurantItem';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RestaurantItemService } from '../Services/restaurant-item.service';
import { Restaurant } from '../entities/Restaurant';

@Component({
  selector: 'app-list-restaurant-items',
  templateUrl: './list-restaurant-items.component.html',
  styleUrls: ['./list-restaurant-items.component.css']
})
export class ListRestaurantItemsComponent implements OnInit {

  restaurantId:number;
  restaurantItems : RestaurantItem[];
  restaurant:Restaurant[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantItemService: RestaurantItemService
  ) { }

  ngOnInit(): void {

    this.restaurantId = this.route.snapshot.params['restaurantId'];

    this.restaurantItemService.getAllRestaurantItems(this.restaurantId).subscribe(
      data=>{
      this.restaurantItems = data;
      this.restaurant = data.restaurant;
    })

  }

  deleteRestaurantItem(restaurantItemId:number){
    this.restaurantItemService.deleteRestaurantItem(restaurantItemId).subscribe(
      data=>{
        window.location.reload();
      },
      error => console.log(error));
  }

  updateRestaurantItem(restaurantItemId:number){
    this.router.navigate(['/updateRestaurantItem',restaurantItemId]);
  }

  restaurantItemDetails(restaurantItemId:number){
    this.router.navigate(['/restaurantItemDetails',restaurantItemId]);
  }
}
