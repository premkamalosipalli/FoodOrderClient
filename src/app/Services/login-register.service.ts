import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private baseUrl = 'http://localhost:8080/api'
  constructor(private http:HttpClient) { }

  saveUser(user:user): Observable<any>{
    return this.http.post(`${this.baseUrl}/user`, user);
  }

  validateUser(params:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/validateUser`, params, {responseType: 'text'});
  }

  getUser(userName:String):Observable<any>{
    return this.http.get(`${this.baseUrl}/getUser/${userName}`);
  }

  countByRole(role:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/countByRole/${role}`);
  }

  getByUserId(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }
  
  getAllUsersByRole(role:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/users/${role}`);
  }

  deleteUser(userId:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/user/${userId}`)
  }

  countByRestaurantItems():Observable<any> {
    return this.http.get(`${this.baseUrl}/countRestaurantItems`)
  }

  countByRestaurant():Observable<any> {
    return this.http.get(`${this.baseUrl}/countRestaurants`)
  }


}
