import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../entities/Address';
import { Restaurant } from '../entities/Restaurant';
import { LocalService } from '../Services/local.service';
import { LoginRegisterService } from '../Services/login-register.service';
import RestaurantService from '../Services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  submitted = false;
  selectedFile:File;
  base64Data:any;
  imgURL:any;
  message:string;
  userFile:any;
  imagePath:any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService) { }

  addressForm: FormGroup = new FormGroup({
    street: new FormControl,
    city: new FormControl,
    state: new FormControl,
    zipCode: new FormControl,
    country: new FormControl,
  })
  
  restaurantForm: FormGroup = new FormGroup({
    restaurantName: new FormControl,
    imageLocation: new FormControl,
    description: new FormControl,
    phoneNumber: new FormControl
  });

  ngOnInit(): void {
    this.restaurantForm = this.formBuilder.group({
      restaurantName: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
      imageLocation: ['', Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]],
      street: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      state: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      zipCode: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(6)
      ]],
      country: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.restaurantForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.restaurantForm.reset();
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

  addRestaurant() {
    this.submitted = true;

    if (this.restaurantForm.valid) {
      const restaurant = new FormData();
      const restaurantForm = this.restaurantForm.value;
      const address: Address = {
        street:restaurantForm.street,
        city:restaurantForm.city,
        state:restaurantForm.state,
        country:restaurantForm.country,
        zipCode:restaurantForm.zipCode
      }
      const restaurantDetails:Restaurant = {
        restaurantId:0,
        restaurantName:restaurantForm.restaurantName,
        imageLocation:restaurantForm.imageLocation,
        description:restaurantForm.description,
        address:address,
        phoneNumber:restaurantForm.phoneNumber

      }

      const restaurantObject = JSON.stringify(restaurantDetails);
      restaurant.append('restaurant',restaurantObject);
      restaurant.append('imageLocation',this.userFile);
      this.restaurantService.addRestaurant(restaurant).subscribe(
        data=>{
          alert(this.message="Restaurant Added Successfully");
          window.location.reload();
        } 
      );
    }
  }

  viewRestaurants(){
    this.router.navigate(["/listRestaurants"])
  }
}
