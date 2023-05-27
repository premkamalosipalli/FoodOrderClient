import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegisterService } from '../Services/login-register.service';
import { LocalService } from '../Services/local.service';
import { RestaurantItemService } from '../Services/restaurant-item.service';
import { RestaurantItemsComponent } from '../restaurant-items/restaurant-items.component';
import { RestaurantItem } from '../entities/RestaurantItem';

@Component({
  selector: 'app-add-restaurant-item',
  templateUrl: './add-restaurant-item.component.html',
  styleUrls: ['./add-restaurant-item.component.css']
})
export class AddRestaurantItemComponent implements OnInit {

  submitted = false;
  restaurantId:number;
  imgURL:any;
  message:string;
  userFile:any;
  imagePath:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantItemService: RestaurantItemService,
    private localService: LocalService,
    private formBuilder: FormBuilder) { }

  restaurantItemForm: FormGroup = new FormGroup({
    restaurantItemName: new FormControl,
    imageLocation: new FormControl,
    description: new FormControl,
    price: new FormControl,
    restaurantId: new FormControl
  });
  
  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['restaurantId'];
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

  onReset(): void {
    this.submitted = false;
    this.restaurantItemForm.reset();
  }

  addRestaurantItem(){
    this.submitted = true;

    if(this.restaurantItemForm.valid){
      const restaurantItemData = new FormData();
      const restaurantItemForm = this.restaurantItemForm.value;

      
      const restaurantItemDetails:RestaurantItem= {
        restaurantItemId:0,
        restaurantItemName:restaurantItemForm.restaurantItemName,
        imageLocation:restaurantItemForm.imageLocation,
        description:restaurantItemForm.description,
        itemPrice:restaurantItemForm.price,
        restaurant:restaurantItemForm.restaurant
      }

      const restaurantItemObject = JSON.stringify(restaurantItemDetails);
      restaurantItemData.append('restaurantItem',restaurantItemObject);
      restaurantItemData.append('imageLocation',this.userFile);
      this.restaurantItemService.addRestaurantItem(this.restaurantId,restaurantItemData).subscribe(
        data=>{
          alert(this.message="Restaurant Added Successfully");
          window.location.reload();
        } 
      );
      
    }
  }

  viewRestaurantItems(){
    this.router.navigate(['/listRestaurantsItems',this.restaurantId]);
  }

}
