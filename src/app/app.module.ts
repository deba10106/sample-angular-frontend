import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { VeggiesComponent } from './components/veggies/veggies.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LoginComponent } from './components/login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MessageComponent } from './components/message/message.component';
import { DemoMaterialModule } from './demoMaterialModule';
import { FishMeatComponent } from './components/fish-meat/fish-meat.component';
import { FoodComponent } from './components/food/food.component';
import { GroceriesComponent } from './components/groceries/groceries.component';
import { PrintingComponent } from './components/printing/printing.component';
import { ShopComponent } from './components/shop/shop.component';
import { SellComponent } from './components/sell/sell.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopHoverMenuComponent } from './components/top-hover-menu/top-hover-menu.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddressComponent } from './components/address/address.component';
import { MatButtonModule } from  '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ApplicationStateService } from './components/shared/components/view/application.state.service';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    VeggiesComponent,
    TopBarComponent,
    LoginComponent,
    MessageComponent,
    FishMeatComponent,
    FoodComponent,
    GroceriesComponent,
    PrintingComponent,
    ShopComponent,
    SellComponent,
    DeliveryComponent,
    MedicinesComponent,
    TopHoverMenuComponent,
    CartComponent,
    ProfileComponent,
    OrdersComponent,
    AddressComponent,
    NotificationsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [ApplicationStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
