import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../entities/Address';
import { Restaurant } from '../entities/Restaurant';
import RestaurantService from '../Services/restaurant.service';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})
export class ListRestaurantsComponent implements OnInit {

  restaurants:Restaurant[];
  imageLocation:any;
  address:Address[];

  constructor(
    private restaurantService : RestaurantService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      data=>{
        this.restaurants=data;
        this.address = data.address;
      }
    );
  }

  // getImage(restaurantId:number){
  //   this.restaurantService.getImage(restaurantId).subscribe(
  //     data=>{
  //       data;
  //     }
  //   );
  // }


  deleteRestaurant(restaurantId:number){
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(
      data=>{
        window.location.reload();
      },
      error => console.log(error));
  }

  restaurantDetails(restaurantId:number){
    this.router.navigate(["/restaurantDetails",restaurantId]);
  }

  updateRestaurant(restaurantId:number){
    this.router.navigate(['/updateRestaurant',restaurantId]);
  }

}
