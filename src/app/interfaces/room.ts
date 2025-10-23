export interface ConferenceRoom {
  id: number;
  name: string;
  location: string;
  baseCost: number;
  contact: ContactPerson
}

export interface ContactPerson {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}
