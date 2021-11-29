export interface BankI {
  bankName: string;
  ifsc: string;
  accountNumber: string;
}

export interface ChildrenI {
  childName: string;
  childDob: string;
  childFeet: string;
  childInches: string;
  childWeight: string;
}

export interface AddUserI {
  id?: "";
  dob: string;
  email: string;
  firstName: string;
  middleName: string;
  userName: string;
  password: string;
  lastName: string;
  mobile: string;
  alternateNumber: string;
  maritalStatus: string;
  address: string;
  streetName: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  userFeet: string;
  userInches: string;
  weight: string;
  occupation: string;
  natureDuties: string;
  annualIncome: number;
  pan: string;
  adhar: string;
  officeAddress: string;
  officeContact: string;
  bank: BankI[];
  fatherFirstName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherFirstName: string;
  motherMiddleName: string;
  motherLastName: string;
  spouseName: string;
  spouseDob: string;
  spouseFeet: string;
  spouseInches: string;
  spouseWeight: string;
  spouseNumber: string;
  userPhoto?: string;
  children: ChildrenI[];
  panPhoto?: string;
  aadharPhoto?: string;
}
