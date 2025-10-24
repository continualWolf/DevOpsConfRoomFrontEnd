export interface ConferenceRoom {
  id: number;
  name: string;
  location: string;
  baseCost: number;
  description?: string;
  contact: ContactPerson
}

export interface ContactPerson {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}
