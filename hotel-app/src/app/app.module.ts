import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "./home/home.component";
import {ReservationModule} from "./reservation/reservation.module";
import {HomeModule} from "./home/home.module";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations:[
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    ReservationModule,
    RouterOutlet
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class AppModule { }
