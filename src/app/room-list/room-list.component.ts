import { Component } from '@angular/core';
import {RoomCardComponent} from "../room-card/room-card.component";
import {ConferenceRoom} from "../interfaces/room";

@Component({
    selector: 'app-room-list',
    imports: [
        RoomCardComponent
    ],
    templateUrl: './room-list.component.html',
    styleUrl: './room-list.component.css'
})
export class RoomListComponent {
 public roomList: ConferenceRoom[] = [

 ];

 constructor() {
   for (let i = 0; i < 10; i++) {
     let temp = {
       name: "Oxfam", location: "Paddington ,London",
       id: 0,
       baseCost: 0,
       contact: {
         id: 0,
         name: "",
         phoneNumber: "",
         email: ""
       }
     };

     this.roomList.push(temp);
   }
 }
}
