import { Injectable } from '@angular/core';
import { ValueFromArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key:string , value:string){
    localStorage.setItem(key,value);
  }

  public getData(key:string):any{
    return localStorage.getItem(key);
  }

  public removeData(key:string){
    localStorage.removeItem(key);
  }

  public closeData(){
    localStorage.clear();
  }
}
