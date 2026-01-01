import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ConferenceRoom} from "../interfaces/room";
import {WizardService} from "../services/wizardService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";

@Component({
    selector: 'app-room-card',
    imports: [
        NgOptimizedImage,
       HttpClientModule,
    ],
    templateUrl: './room-card.component.html',
    styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input() room!: ConferenceRoom;

  constructor(private wizardService: WizardService, private http: HttpClient) {}

  selectRoom() {
    console.log("Selected Room clicked");
    try{
      console.log("entering try catch");

      this.http.post(`${window.location.protocol}//${window.location.host}:3000/publishBooking`, { "roomId": "123", "date": "12/12/25", "price": "1", "cardNumber": "1231231", "expiry": "12/22/24", "cvv": "234" }).pipe(
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      ).subscribe({
        next: res => console.log('Success', res),
      });
    }catch(err){
      console.error(err);
    }


    this.wizardService.setWizardInput({
      isDialogVisible: true,
      conferenceRoom: this.room
    });
  }

}
