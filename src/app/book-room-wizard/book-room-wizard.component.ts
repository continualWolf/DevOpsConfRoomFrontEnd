import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WizardService} from "../services/wizardService";
import {Subscription} from "rxjs";
import {ConferenceRoom} from "../interfaces/room";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-book-room-wizard',
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    ReactiveFormsModule
  ],
  templateUrl: './book-room-wizard.component.html',
  styleUrl: './book-room-wizard.component.css'
})
export class BookRoomWizardComponent implements OnInit, OnDestroy {
  isBookRoomWizardVisible = false;
  conferenceRoom?: ConferenceRoom;

  dateFormCtrl = new FormControl(new Date())

  wizardStep: number = 1;
  wizardActionButtonText = "Next";
  wizardActionButtonDisabled = this.dateFormCtrl.value ? false : true;
  wizardTitle: string = "Book Conference Room";
  wizardCancelButtonVisible: boolean = true;

  private sub!: Subscription;

  constructor(private wizardService: WizardService) {}

  ngOnInit() {
    this.subToWizardService();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private subToWizardService(){
    this.sub = this.wizardService.wizardInput$.subscribe(room => {
      if (room){
        this.isBookRoomWizardVisible = room.isDialogVisible;
        this.conferenceRoom = room.conferenceRoom;
      }
    });
  }

  cancelWizard(){
    this.isBookRoomWizardVisible = false;
    this.wizardStep = 1;
    this.wizardActionButtonText = "Next";
    this.wizardTitle = "Book Conference Room";
    this.wizardCancelButtonVisible = true;
    this.wizardService.setWizardInput({
      isDialogVisible: false,
    });
  }

  nextStep(){
    this.wizardStep++;

    if(this.wizardStep == 2){
      this.wizardTitle = "Confirm and Pay";
      this.wizardActionButtonText = `Pay £${this.conferenceRoom?.baseCost}`;
    }

    if(this.wizardStep == 3){
      this.wizardTitle = "Booking Confirmed";
      this.wizardCancelButtonVisible = false;
      this.wizardActionButtonText = "Done";
    }

    if(this.wizardStep == 4){
      this.cancelWizard();
    }
  }
}
