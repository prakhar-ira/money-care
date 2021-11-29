import { Component, OnInit, Input, SecurityContext } from "@angular/core";
import { AuthService } from "app/services/auth.services";
import { PanelServices } from "app/services/panel.services";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { userWrapper } from "app/constants/initialize-wrappers";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



import * as lodash from "lodash";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { AddUserI } from "app/constants/add-user";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from "app/services/notification.services";
import { Helpers } from "app/helpers/helpers";

enum marrigeType {
  MAIRRIED = 'married',
  NON_MARRIED = 'non-married'
};

enum imageType {
  USER = 'user',
  PAN = 'pan',
  AADHAR = 'aadhar'
};

@Component({
  selector: "app-add-new-user",
  templateUrl: "./add-new-user.component.html",
  styleUrls: ["./add-new-user.component.scss"],
})
export class AddNewUserComponent implements OnInit {
  @Input() userInfo: AddUserI;
  @Input() edit = false;

  indexValue: number;
  maritalStatus = "non-married";
  addUserForm: FormGroup;
  bankArray: FormArray;
  childrenArray: FormArray;
  user = userWrapper;
  bankList = [];
  isContactNumberValid = false;
  userProfilePhoto = '';
  userAadharPhoto = '';
  userPanPhoto = '';

  subscriptions: Subscription = new Subscription();
  constructor(
    private readonly _fb: FormBuilder,
    private as: AuthService,
    private ps: PanelServices,
    private router: Router,
    private readonly spinner: NgxSpinnerService,
    private readonly notify: NotificationService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.user = Boolean(this.edit) ? this.userInfo : userWrapper;
    this.initForm();
  }

  initForm() {
    this.bankArray = this._fb.array([
      this._fb.group({
        bankName: [""],
        ifsc: [""],
        accountNumber: [""],
      }),
    ]);

    this.childrenArray = this._fb.array([
      this._fb.group({
        childDob: [""],
        childFeet: [""],
        childInches: [""],
        childName: [""],
        childWeight: [""],
      }),
    ]);

    if (Boolean(this.edit)) {
      this.user.dob = this.user.dob ? this.user.dob.substring(0, 10) : '';
      this.user.spouseDob = this.user.spouseDob ? this.user.spouseDob.substring(0, 10) : '';
      if (this.user.children && this.user.children.length) {
        this.userInfo.children = this.user.children.map((child) => {
          child.childDob = child.childDob
            ? child.childDob.substring(0, 10)
            : '';
          return child;
        });
      }
      this.userInfo.children && this.userInfo.children.length && Helpers.patchArrayValue(this.childrenArray, this.userInfo.children)
      this.userInfo.bank && this.userInfo.bank.length && Helpers.patchArrayValue(this.bankArray, this.userInfo.bank)
      this.userAadharPhoto = this.userInfo.aadharPhoto || '';
      this.userPanPhoto = this.userInfo.panPhoto || '';
      this.userProfilePhoto = this.userInfo.userPhoto || '';
    }

    this.addUserForm = this._fb.group({
      firstName: [lodash.get(this.user, "firstName", ''), Validators.required],
      middleName: [lodash.get(this.user, "middleName", '')],
      lastName: [lodash.get(this.user, "lastName", ''), Validators.required],
      email: [lodash.get(this.user, "email"), [Validators.email, Validators.required]],
      dob: [lodash.get(this.user, "dob", ''), Validators.required],
      userName: [lodash.get(this.user, "userName", '')],
      password: [lodash.get(this.user, "password", ''), Validators.required],
      mobile: [lodash.get(this.user, "mobile", ''), [Validators.required, Validators.min(10)]],
      alternateNumber: [lodash.get(this.user, "alternateNumber", ''), Validators.required],
      maritalStatus: [lodash.get(this.user, "maritalStatus", ''), Validators.required],
      address: [lodash.get(this.user, "address", ''), Validators.required],
      streetName: [lodash.get(this.user, "streetName", ''), Validators.required],
      city: [lodash.get(this.user, "city", ''), Validators.required],
      pincode: [lodash.get(this.user, "pincode", ''), [Validators.required, Validators.minLength(6)]],
      state: [lodash.get(this.user, "state", ''), Validators.required],
      country: [lodash.get(this.user, "country", ''), Validators.required],
      weight: [lodash.get(this.user, "weight", ''), Validators.required],
      userFeet: [lodash.get(this.user, "userFeet", ''), Validators.required],
      userInches: [lodash.get(this.user, "weight", ''), Validators.required],
      occupation: [lodash.get(this.user, "occupation", ''), Validators.required],
      natureDuties: [lodash.get(this.user, "natureDuties", ''), Validators.required],
      annualIncome: [lodash.get(this.user, "annualIncome", 0), Validators.required],
      pan: [lodash.get(this.user, "pan", ''), [Validators.required, Validators.minLength(10)]],
      adhar: [lodash.get(this.user, "adhar", ''), [Validators.required, Validators.minLength(12)]],
      officeAddress: [lodash.get(this.user, "officeAddress", '')],
      officeContact: [lodash.get(this.user, "officeContact", ''), Validators.required],
      bank: this.bankArray,
      fatherFirstName: [lodash.get(this.user, "fatherFirstName", ''), Validators.required],
      fatherMiddleName: [lodash.get(this.user, "fatherMiddleName", '')],
      fatherLastName: [lodash.get(this.user, "fatherLastName", ''), Validators.required],
      motherFirstName: [lodash.get(this.user, "motherFirstName", ''), Validators.required],
      motherMiddleName: [lodash.get(this.user, "motherMiddleName", '')],
      motherLastName: [lodash.get(this.user, "motherLastName", ''), Validators.required],
      spouseName: [lodash.get(this.user, "spouseName", '')],
      spouseDob: [lodash.get(this.user, "spouseDob", '')],
      spouseWeight: [lodash.get(this.user, "spouseWeight", '')],
      spouseFeet: [lodash.get(this.user, "spouseWeight", '')],
      spouseInches: [lodash.get(this.user, "spouseWeight", '')],
      spouseNumber: [lodash.get(this.user, "spouseNumber", '')],
      children: this.childrenArray,
      userPhoto: [lodash.get(this.user, "userPhoto", '')],
      panPhoto: [lodash.get(this.user, "panPhoto", '')],
      aadharPhoto: [lodash.get(this.user, "aadharPhoto", '')]
    });

    if (Boolean(this.edit)) {
      this.addUserForm.get('password').clearValidators();
      this.addUserForm.updateValueAndValidity();
    }
  }

  onArrayItemDeleted(index: number, type: string) {
    const bankArray = this.addUserForm.get(`${type}`) as FormArray;
    bankArray.removeAt(index);
  }

  addChildren() {
    const childrenDetail = this.addUserForm.controls.children as FormArray;
    childrenDetail.push(
      this._fb.group({
        childName: "",
        childDob: [""],
        childFeet: [""],
        childInches: [""],
        childWeight: '0',
      })
    );
  }

  preventInput(ev) {
    if (ev.target.value.length > 10) {
       ev.preventDefault();
    }
  }

  

  onMartialStatusChange(type: { source: object, value: string }) {
    const formValueControls = ['spouseName', 'spouseDob', 'spouseFeet', 'spouseInches', 'spouseWeight', 'spouseNumber'];
    if (type.value === marrigeType.NON_MARRIED) {
      formValueControls.forEach(value => {
        this.addUserForm.get(value).clearValidators();
        this.addUserForm.get(value).reset();
      });
      this.addUserForm.updateValueAndValidity();
    } else {
      formValueControls.forEach(value => {
        this.addUserForm.get(value).setValidators(Validators.required);
        this.addUserForm.get(value).reset();
      });
      this.addUserForm.updateValueAndValidity();
    }
  }

  addUser() {
    this.mapFormToWrapper();
    this.subscriptions.add(
      this.getUserAction(this.user).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", this.user.id ? 'User updated' : 'User added');
          this.router.navigate(["/dashboard"]);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  addBank() {
    const bankDetail = this.addUserForm.controls.bank as FormArray;
    bankDetail.push(
      this._fb.group({
        bankName: "",
        ifsc: "",
        accountNumber: "",
      })
    );
  }

  onValueChange(event) {
    if (event.target.value.length >= 0 && event.target.value.length < 10) {
      this.addUserForm.get('mobile').setErrors({'incorrect': true});
      this.isContactNumberValid = true;
     } 
   else if (event.target.value.length > 10) {
    this.addUserForm.get('mobile').setErrors(null);
      this.addUserForm.get('mobile').patchValue(event.target.value.slice(0, 10));
      this.isContactNumberValid = false;

    } else {
      this.addUserForm.get('mobile').setErrors(null);
      this.isContactNumberValid = false;
    }
    
  }

  getBank(value: string) {
    this.subscriptions.add(
      this.ps
        .getBanks(value)
        .pipe(debounceTime(600), distinctUntilChanged())
        .subscribe(
          (success) => {
            this.bankList = success;
          },
          (err: HttpErrorResponse) => {
            console.error(err);
          }
        )
    );
  }

  addPhoto(files: Array<File>, type: string) {
    const fileArray = Array.from(files);
    this.subscriptions.add(
      this.ps.uploadPhoto(fileArray).subscribe(
        (res: any) => {
          const imageUrl = this.ps.downloadImageUrl(res.result.files.file[0].name);
          switch(type) {
            case imageType.USER: 
              this.userProfilePhoto = imageUrl;
              this.addUserForm.get('userPhoto').patchValue(this.userProfilePhoto);
              return;
            case imageType.PAN:
              this.userPanPhoto = imageUrl;
              this.addUserForm.get('panPhoto').patchValue(this.userPanPhoto);
              return;
            case imageType.AADHAR: 
              this.userAadharPhoto = imageUrl;
              this.addUserForm.get('aadharPhoto').patchValue(this.userAadharPhoto);
              return;
            default: return;
          }
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      )
    );
  }


  valuechange(ev: any, index: number) {
    if (ev.target.value.length > 3) {
      this.getBank(ev.target.value);
      this.indexValue = index;
    } else {
      this.bankList = [];
    }
  }

  mapFormToWrapper() {
    const formValue = this.addUserForm.getRawValue();
    formValue["dob"] = formValue["dob"] ? new Date(formValue["dob"]).toISOString() : '';
    formValue["spouseDob"] = formValue["spouseDob"] ? new Date(formValue["spouseDob"]).toISOString() : '';

    if (formValue["children"].length && formValue["children"][0].childName) {
      formValue["children"] = formValue["children"].map((child) => {
        child.childDob = child.childDob ? new Date(child.childDob).toISOString() : '';
        return child;
      });
    } else {
      formValue["children"] = [];
    }

    lodash.set(this.user, ["firstName"], formValue["firstName"]);
    lodash.set(this.user, ["middleName"], formValue["middleName"]);
    lodash.set(this.user, ["lastName"], formValue["lastName"]);
    lodash.set(this.user, ["userName"], formValue["userName"]);
    lodash.set(this.user, ["password"], formValue["password"]);
    lodash.set(this.user, ["email"], formValue["email"]);
    lodash.set(this.user, ["mobile"], String(formValue["mobile"]));
    lodash.set(this.user, ["alternateNumber"], String(formValue["alternateNumber"]));
    lodash.set(this.user, ["maritalStatus"], formValue["maritalStatus"]);
    lodash.set(this.user, ["address"], formValue["address"]);
    lodash.set(this.user, ["streetName"], formValue["streetName"]);
    lodash.set(this.user, ["city"], formValue["city"]);
    lodash.set(this.user, ["pincode"], formValue["pincode"]);
    lodash.set(this.user, ["state"], formValue["state"]);
    lodash.set(this.user, ["country"], formValue["country"]);
    lodash.set(this.user, ["dob"], formValue["dob"]);
    lodash.set(this.user, ["userFeet"], formValue["userFeet"]);
    lodash.set(this.user, ["userInches"], formValue["userInches"]);
    lodash.set(this.user, ["weight"], formValue["weight"]);
    lodash.set(this.user, ["occupation"], formValue["occupation"]);
    lodash.set(this.user, ["natureDuties"], formValue["natureDuties"]);
    lodash.set(this.user, ["annualIncome"], formValue["annualIncome"]);
    lodash.set(this.user, ["pan"], formValue["pan"]);
    lodash.set(this.user, ["adhar"], formValue["adhar"]);
    lodash.set(this.user, ["officeAddress"], formValue["officeAddress"]);
    lodash.set(this.user, ["officeContact"], formValue["officeContact"]);
    lodash.set(this.user, ["bank"], formValue["bank"]);
    lodash.set(this.user, ["fatherFirstName"], formValue["fatherFirstName"]);
    lodash.set(this.user, ["fatherMiddleName"], formValue["fatherMiddleName"]);
    lodash.set(this.user, ["fatherLastName"], formValue["fatherLastName"]);
    lodash.set(this.user, ["motherFirstName"], formValue["motherFirstName"]);
    lodash.set(this.user, ["motherMiddleName"], formValue["motherMiddleName"]);
    lodash.set(this.user, ["motherLastName"], formValue["motherLastName"]);
    lodash.set(this.user, ["spouseName"], formValue["spouseName"]);
    lodash.set(this.user, ["spouseDob"], formValue["spouseDob"]);
    lodash.set(this.user, ["spouseFeet"], formValue["spouseFeet"]);
    lodash.set(this.user, ["spouseInches"], formValue["spouseInches"]);
    lodash.set(this.user, ["spouseWeight"], formValue["spouseWeight"]);
    lodash.set(this.user, ["spouseNumber"], String(formValue["spouseNumber"]));
    lodash.set(this.user, ["children"], formValue["children"]);
    lodash.set(this.user, ["userPhoto"], formValue["userPhoto"]);
    lodash.set(this.user, ["panPhoto"], formValue["panPhoto"]);
    lodash.set(this.user, ["aadharPhoto"], formValue["aadharPhoto"]);

    if (Boolean(this.edit)) {
      delete this.user.password;
    }
  }

  selectDropdown(bankName: string, index: number) {
    const form = this.addUserForm.get("bank") as FormArray;
    form.at(index).patchValue({
      bankName: bankName,
    });
    this.bankList = [];
  }

  private getUserAction(user: AddUserI) {
    return Boolean(this.edit) ? this.ps.patchUserbyId(user) : this.ps.addUser(user) 
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
