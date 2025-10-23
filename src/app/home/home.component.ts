import { Component } from '@angular/core';
import {RoomListComponent} from "../room-list/room-list.component";

@Component({
    selector: 'app-home',
    imports: [RoomListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
