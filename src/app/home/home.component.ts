import { Component } from '@angular/core';
import {RoomListComponent} from "../room-list/room-list.component";
import {BookRoomWizardComponent} from "../book-room-wizard/book-room-wizard.component";
import {FormsModule} from "@angular/forms";
import {catchError, EMPTY} from "rxjs";
import {WizardService} from "../services/wizardService";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-home',
  imports: [RoomListComponent, BookRoomWizardComponent, FormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  loginScreenVisible = true;

  email = '';
  password = '';
  loginError = false;

  constructor(private http: HttpClient) {}

  login() {
    if (!this.email || !this.password) {
      return;
    }

    console.log('Logging in with:', this.email, this.password);

    try{
      console.log("entering try catch");

      const baseURL = window.location.host.includes("localhost") ? "http://localhost" : window.location;

      this.http.post(`${baseURL}:3000/login`, { "email": this.email, "password": this.password }).pipe(
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      ).subscribe({
        next: res => this.loginScreenVisible = false,
      });
    }catch(err){
      console.error(err);
    }
  }


}
