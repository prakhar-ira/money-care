import { AddUserI } from "./add-user";

export const userWrapper : AddUserI = {
        firstName: '',
        middleName: '',
        lastName: '',
        userName: '',
        password: '', 
        email: '',
        mobile: '',
        alternateNumber: '',
        maritalStatus: 'non-married',
        address: '',
        streetName: '',
        city: '',
        pincode: '',
        state: '',
        country: '',
        dob: '',
        userFeet: '0',
        userInches: '0',
        weight: '0',
        occupation: '',
        natureDuties: '',
        annualIncome: 0,
        pan: '',
        adhar: '',
        officeAddress: '',
        officeContact: '',
        bank: [
          {
            bankName: '',
            ifsc: '',
            accountNumber: '',
          }
        ],
        fatherFirstName: '',
        fatherMiddleName: '',
        fatherLastName: '',
        motherFirstName: '',
        motherMiddleName: '',
        motherLastName: '',
        spouseName: '',
        spouseDob: '',
        spouseFeet: '',
        spouseInches: '',
        spouseWeight: '',
        spouseNumber: '',
        children: [],
        panPhoto: '',
        userPhoto: '',
        aadharPhoto: ''
};