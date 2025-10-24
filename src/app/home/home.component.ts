import { Component } from '@angular/core';
import {RoomListComponent} from "../room-list/room-list.component";
import {BookRoomWizardComponent} from "../book-room-wizard/book-room-wizard.component";

@Component({
    selector: 'app-home',
  imports: [RoomListComponent, BookRoomWizardComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedRoom: any;

}
