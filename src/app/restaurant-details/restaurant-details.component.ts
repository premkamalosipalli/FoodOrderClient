import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../entities/Address';
import { Restaurant } from '../entities/Restaurant';
import RestaurantService from '../Services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant : Restaurant;
  address : Address;
  restaurantId : number;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private restaurantService : RestaurantService
  ) { }

  ngOnInit(): void {
    this.restaurant = new Restaurant();
    this.address = new Address();

    this.restaurantId = this.route.snapshot.params['restaurantId'];

    this.restaurantService.getRestaurant(this.restaurantId).subscribe(
      data =>{
        this.address = data.address;         
        this.restaurant = data;
      }
    );
  }

  updateRestaurant(restaurantId:number){
    this.router.navigate(['/updateRestaurant',restaurantId])
  }

  list(){
    this.router.navigate(['/listRestaurants']);
  }
}
