import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantItemService } from '../Services/restaurant-item.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantItem } from '../entities/RestaurantItem';
import { Restaurant } from '../entities/Restaurant';

@Component({
  selector: 'app-restaurant-item-update',
  templateUrl: './restaurant-item-update.component.html',
  styleUrls: ['./restaurant-item-update.component.css']
})
export class RestaurantItemUpdateComponent implements OnInit {

  submitted = false;
  restaurantItem : RestaurantItem;
  restaurantItemId:number;
  restaurant: Restaurant;
  imgURL:any;
  message:string;
  userFile:any;
  imagePath:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantItemService: RestaurantItemService,
    private formBuilder: FormBuilder) { }

  restaurantItemForm: FormGroup = new FormGroup({
    restaurantItemName: new FormControl,
    imageLocation: new FormControl,
    description: new FormControl,
    price: new FormControl,
    restaurantId: new FormControl
  });

  ngOnInit(): void {
    this.restaurantItemId = this.route.snapshot.params['restaurantItemId'];

    this.restaurantItemService.getRestaurantItem(this.restaurantItemId).subscribe(
      data =>{
        this.restaurantItem = data;
        this.restaurant = data.restaurant;
      }
    );
    
    this.restaurantItemForm = this.formBuilder.group({
      restaurantItemName: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
      imageLocation: ['', Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(500)
      ]],
      price: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]],
      restaurantId:[]
    });
  }

  onFileUpload(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if(mimeType.match(/image\/*/)== null){
        this.message = "ONLY imges are supported";
        return;
      }

      var reader = new FileReader();

      this.imagePath= file;
      reader.readAsDataURL(file);
      reader.onload = (_event)=>{
        this.imgURL=reader.result;
      }
    }
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.restaurantItemForm.controls;
  }

  updateRestaurantItem(restaurantItemId: number){
    this.submitted = true;

    if(this.restaurantItemForm.valid){
      const restaurantItemData = new FormData();
      const restaurantItemForm = this.restaurantItemForm.value;

      
      const restaurantItemDetails:RestaurantItem= {
        restaurantItemId:restaurantItemId,
        restaurantItemName:restaurantItemForm.restaurantItemName,
        imageLocation:restaurantItemForm.imageLocation,
        description:restaurantItemForm.description,
        itemPrice:restaurantItemForm.price,
        restaurant:this.restaurant
      }

      const restaurantItemObject = JSON.stringify(restaurantItemDetails);
      restaurantItemData.append('restaurantItem',restaurantItemObject);
      restaurantItemData.append('imageLocation',this.userFile);
      this.restaurantItemService.updateRestaurantItem(this.restaurantItemId,restaurantItemData).subscribe(
        data=>{
          alert(this.message="Restaurant Updated Successfully");
          this.router.navigate(['/listRestaurantsItems',this.restaurant.restaurantId]);
        } 
      );
      
    }
  }

  // viewRestaurantItems(){
  //   this.router.navigate(['/listRestaurantsItems',this.restaurantItemId]);
  // }


}
