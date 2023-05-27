import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantItemService {

  private baseUrl= 'http://localhost:8080/api'

  constructor(private httpClient : HttpClient) { }

  addRestaurantItem(restaurantItemId:number,restaurantItem:FormData):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/restaurant/${restaurantItemId}/addRestaurantItem`,restaurantItem);
  }

  getAllRestaurantItems(restaurantItemId:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/restaurant/${restaurantItemId}/restaurantItems`);
  }

  deleteRestaurantItem(restaurantItemId:number):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/restaurantItem/${restaurantItemId}`)
  }

  getRestaurantItem(restaurantItemId:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/restaurantItem/${restaurantItemId}`)
  }

  updateRestaurantItem(restaurantItemId:number,restaurantItem:FormData):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/restaurantItem/${restaurantItemId}`,restaurantItem)
  }

}
