import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../entities/Restaurant';

@Injectable({
  providedIn: 'root'
})


export default class RestaurantService {

  private baseUrl = 'http://localhost:8080/api'

  constructor(private http:HttpClient) { }

  addRestaurant(restaurant:FormData):Observable<any>{
    return this.http.post(`${this.baseUrl}/restaurant`,restaurant);
  }

  getAllRestaurants():Observable<any>{
    return this.http.get(`${this.baseUrl}/restaurants`)
  }

  deleteRestaurant(restaurantId:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/restaurant/${restaurantId}`)
  }

  getRestaurant(restaurantId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/restaurant/${restaurantId}`)
  }

  updateRestaurant(restaurantId:number,restaurant:FormData):Observable<any>{
    return this.http.put(`${this.baseUrl}/restaurant/${restaurantId}`,restaurant)
  }
}
