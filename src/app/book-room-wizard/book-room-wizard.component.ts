import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WizardService} from "../services/wizardService";
import {catchError, EMPTY, Subscription} from "rxjs";
import {ConferenceRoom} from "../interfaces/room";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-book-room-wizard',
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    ReactiveFormsModule,
    FormsModule
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
  public acCost = 0;
  public totalCost = (this.conferenceRoom?.baseCost ?? 0) + this.acCost;
  cardNumber = '';
  cardExpiry = '';
  cardCvc = '';

  private sub!: Subscription;

  constructor(private wizardService: WizardService, private http: HttpClient) {

  }

  dateChanged(): void {
    const isLocalhost = window.location.hostname === 'localhost';
    const baseURL =
      window.location.hostname === "localhost"
        ? "http://localhost"
        : window.location.origin.replace(":4200", "");


    this.http.post<{ temperature: number }>(
      `${baseURL}:3000/todayTemp`,
      {}
    ).pipe(
      catchError(err => {
        console.error('Temperature API error:', err);
        return EMPTY;
      })
    ).subscribe(res => {
      const temperature = res.temperature;
      const baseCost = this.conferenceRoom?.baseCost ?? 0;

      if (temperature < 2) {
        this.acCost = 0;
      } else if (temperature < 5) {
        this.acCost = baseCost * 0.1;
      } else if (temperature < 10) {
        this.acCost = baseCost * 0.2;
      } else if (temperature < 20) {
        this.acCost = baseCost * 0.3;
      } else {
        this.acCost = baseCost * 0.5;
      }

      this.totalCost = this.acCost + baseCost;
    });
  }

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
      this.wizardActionButtonText = `Pay £${this.totalCost}`;
    }

    if(this.wizardStep == 3){
      try{
        console.log("entering try catch");

        const baseURL =
          window.location.hostname === "localhost"
            ? "http://localhost"
            : window.location.origin.replace(":4200", "");

        this.http.post(`${baseURL}:3000/publishBooking`, { "roomId": "133", "date": new Date(), "price": this.conferenceRoom?.baseCost, "cardNumber": this.cardNumber, "expiry": this.cardExpiry, "cvv": this.cardCvc }).pipe(
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
      this.wizardTitle = "Booking Confirmed";
      this.wizardCancelButtonVisible = false;
      this.wizardActionButtonText = "Done";
    }

    if(this.wizardStep == 4){
      this.cancelWizard();
    }
  }
}
