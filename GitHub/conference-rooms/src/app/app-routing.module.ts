import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path:"", component: HomeComponent, },
];

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppRoutingModule { }
