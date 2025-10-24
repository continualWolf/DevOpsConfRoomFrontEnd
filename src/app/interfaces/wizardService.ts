import {ConferenceRoom} from "./room";

export interface IWizardService {
  isDialogVisible: boolean;
  conferenceRoom?: ConferenceRoom
}
