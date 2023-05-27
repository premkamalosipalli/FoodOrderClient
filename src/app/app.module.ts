import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectRestaurantComponent } from './select-restaurant/select-restaurant.component';
import { AdminComponent } from './admin/admin.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ListRestaurantsComponent } from './list-restaurants/list-restaurants.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantUpdateComponent } from './restaurant-update/restaurant-update.component';
import { AddRestaurantItemComponent } from './add-restaurant-item/add-restaurant-item.component';
import { ListRestaurantItemsComponent } from './list-restaurant-items/list-restaurant-items.component';
import { RestaurantItemDetailsComponent } from './restaurant-item-details/restaurant-item-details.component';
import { RestaurantItemUpdateComponent } from './restaurant-item-update/restaurant-item-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    SelectRestaurantComponent,
    AdminComponent,
    DeliveryComponent,
    RestaurantsComponent,
    RestaurantItemsComponent,
    UserDetailsComponent,
    DeliveryDetailsComponent,
    UserComponent,
    HomeComponent,
    ListRestaurantsComponent,
    RestaurantDetailsComponent,
    RestaurantUpdateComponent,
    AddRestaurantItemComponent,
    ListRestaurantItemsComponent,
    RestaurantItemDetailsComponent,
    RestaurantItemUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
