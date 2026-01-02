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



    this.wizardService.setWizardInput({
      isDialogVisible: true,
      conferenceRoom: this.room
    });
  }

}
