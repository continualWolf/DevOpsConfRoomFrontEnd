import {Component, EventEmitter, Output} from '@angular/core';
import {RoomCardComponent} from "../room-card/room-card.component";
import {ConferenceRoom} from "../interfaces/room";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-room-list',
  imports: [
    RoomCardComponent,
    FormsModule
  ],
    templateUrl: './room-list.component.html',
    styleUrl: './room-list.component.css'
})
export class RoomListComponent {
 public roomList: ConferenceRoom[] = [];
 public baseList: ConferenceRoom[] = [];
 public searchText: string = "";
  maxPrice: number = 500;

  constructor() {
   for (let i = 0; i < 10; i++) {
     let temp = {
       name: "Oxfam", location: "Paddington ,London",
       id: 0,
       baseCost: 10,
       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a sapien non ex congue pharetra. Curabitur luctus imperdiet dolor nec ullamcorper. Aliquam porta dui semper lacus imperdiet fringilla. Morbi dui orci, rhoncus. ",
       contact: {
         id: 0,
         name: "Benjamin Watt",
         phoneNumber: "",
         email: "workEmail@gmail.com"
       }
     };

     this.roomList.push(temp);
   }
    this.baseList = this.roomList;
 }

  searchRooms() {
    if(this.searchText.length > 0) {
      this.roomList = this.roomList.filter((room: ConferenceRoom) => room.name.indexOf(this.searchText) > -1);
      return;
    }

    this.roomList = this.baseList;
  }

  applyFilter() {
    this.roomList = this.baseList.filter((room: ConferenceRoom) => room.baseCost <= this.maxPrice);
  }

  resetFilter() {
    this.maxPrice = 500;
    this.roomList = this.baseList;
  }
}
