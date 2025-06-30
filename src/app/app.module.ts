import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Common/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterformComponent } from './Components/registerform/registerform.component';
import { FooterComponent } from './Common/footer/footer.component';
import { AdminloginformComponent } from './Components/adminloginform/adminloginform.component';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './interceptors/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterformComponent,
    FooterComponent,
    AdminloginformComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true, 
    },],
  bootstrap: [AppComponent],
})
export class AppModule {}
