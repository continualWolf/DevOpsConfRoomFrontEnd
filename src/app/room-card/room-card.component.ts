import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ConferenceRoom} from "../interfaces/room";
import {WizardService} from "../services/wizardService";

@Component({
    selector: 'app-room-card',
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './room-card.component.html',
    styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input() room!: ConferenceRoom;
  constructor(private wizardService: WizardService) {}

  selectRoom() {
    this.wizardService.setWizardInput({
      isDialogVisible: true,
      conferenceRoom: this.room
    });
  }

}
