import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ConferenceRoom} from "../interfaces/room";

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
}
