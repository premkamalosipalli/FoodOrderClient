import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import RestaurantService from '../Services/restaurant.service';
import { Restaurant } from '../entities/Restaurant';
import { RestaurantItem } from '../entities/RestaurantItem';
import { RestaurantItemService } from '../Services/restaurant-item.service';

@Component({
  selector: 'app-restaurant-item-details',
  templateUrl: './restaurant-item-details.component.html',
  styleUrls: ['./restaurant-item-details.component.css']
})
export class RestaurantItemDetailsComponent implements OnInit {

  restaurantItem : RestaurantItem;
  restaurant : Restaurant;
  restaurantItemId : number;
  restaurantName:String;
  restaurantId: number;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private restaurantItemService : RestaurantItemService
  ) { }

  ngOnInit(): void {
    this.restaurantItem = new RestaurantItem();
    this.restaurant = new Restaurant();

    this.restaurantItemId = this.route.snapshot.params['restaurantItemId'];

    this.restaurantItemService.getRestaurantItem(this.restaurantItemId).subscribe(
      data =>{
        this.restaurantItem = data;
        this.restaurant = data.restaurant;
        this.restaurantId = data.restaurantId
        this.restaurantName = data.restaurant.restaurantName
      }
    );
  }

  updateRestaurantItem(restaurantItemId:number){
    this.router.navigate(['/updateRestaurant',restaurantItemId])
  }

  listRestaurantItems(){
    this.router.navigate(['/listRestaurantsItems',this.restaurantId]);
  }

}
