import { Component, OnInit } from '@angular/core';
import RestaurantService from '../Services/restaurant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-items',
  templateUrl: './restaurant-items.component.html',
  styleUrls: ['./restaurant-items.component.css']
})
export class RestaurantItemsComponent implements OnInit {

  restaurants: any;
  restaurant: String="";
  restaurantId:number;
  selectRestaurant:FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private formBuilder : FormBuilder,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.getAllRestaurants();
    this.selectRestaurant = this.formBuilder.group({
      restaurantId:["",Validators.required]
    })
  }

  getAllRestaurants(){
    this.restaurantService.getAllRestaurants().subscribe(data=>{
      this.restaurants = data;
    },
    err=>{
      console.log(err);
    })
  }

  getRestaurnat(e: any){
    this.restaurantId = e.target.value.split(":")[1];
  }

  submit(){
    this.router.navigate(['/addRestaurantItem',Number(this.restaurantId)]);
  }

}
