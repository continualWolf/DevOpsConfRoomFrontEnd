import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IWizardService} from "../interfaces/wizardService";

@Injectable({ providedIn: 'root' })
export class WizardService {
  private wizardInputSource = new BehaviorSubject<IWizardService>({
    isDialogVisible: false,
    conferenceRoom: undefined
  });

  wizardInput$ = this.wizardInputSource.asObservable();

  setWizardInput(value: IWizardService) {
    this.wizardInputSource.next(value);
  }
}
