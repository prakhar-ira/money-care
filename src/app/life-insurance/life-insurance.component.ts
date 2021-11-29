import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { termWrapper } from 'app/constants/initialize-term-wrapper';
import { unitLinkedWrapper } from 'app/constants/unitLinked-wrapper';
import { traditionalParticipatingWrapper } from 'app/constants/traditionParticipating-wrapper';
import { traditionalNonParticipatingWrapper } from 'app/constants/nonParticipating-wrapper';
import { roiWrapper } from 'app/constants/roi-wrapper';
import * as lodash from "lodash";
import { Helpers } from 'app/helpers/helpers';
import { MAT_DATE_LOCALE } from '@angular/material/core';

enum PERIOD_TYPES {
  ANNUAL = 'annual',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly' ,
  SINGLE = 'single' 
}


@Component({
  selector: 'app-life-insurance',
  templateUrl: './life-insurance.component.html',
  styleUrls: ['./life-insurance.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
  
})
export class LifeInsuranceComponent implements OnInit {
  bankAssigned;
  paramsData;
  totalRiderPremiumReturn: any = 0;
  totalRiderTerm: any = 0;
  totalRiderUnitLinked: any = 0;
  totalRiderNonParticipating: any = 0;
  totalRiderTraditionParticipating: any = 0;
  update: any;
  riderArray: FormArray;
  unitRiderArray: FormArray;
  traditionalParticipatingRiderArray: FormArray;
  roiRiderArray: FormArray;
  childrenArray1: FormArray;
  childrenArray2: FormArray;

  unitChildrenArray1: FormArray;
  unitChildrenArray2: FormArray;

  traditionalParticipatingChildrenArray1: FormArray;
  traditionalParticipatingChildrenArray2: FormArray;

  nonTraditionalParticipatingChildrenArray1: FormArray;
  nonTraditionalParticipatingChildrenArray2: FormArray;

  roiChildrenArray1: FormArray;
  roiChildrenArray2: FormArray;

  moneyBackTraditionalParticipating: FormArray;
  moneyBackNonTraditionalParticipating: FormArray;


  term = termWrapper;
  unitLinked = unitLinkedWrapper;
  traditionalParticipating = traditionalParticipatingWrapper;
  nonTraditionalParticipating = traditionalNonParticipatingWrapper;
  roi = roiWrapper;
  termForm: FormGroup;
  unitLinkedForm: FormGroup;
  roiForm: FormGroup;
  nonParticipatingForm: FormGroup;
  traditionalParticipatingForm: FormGroup;  
  nonTraditionalParticipatingForm: FormGroup;  


  myControlTerm = new FormControl();
  bankList: any = []
  filteredOptionsTerm: Observable<any[]>;
  indexValue;

  private subscriptions: Subscription = new Subscription();





  //Other Variable Declaration
  betterHalfSelectedTerm: boolean = false;
  assignedToBankTerm: boolean = false;
  loanSelectedTerm: boolean = false;
  extendedTermSelectedTerm: boolean = false;
  //riders = ['ADB Rider', 'Critical Illness Rider', 'Hospitality Cash Benefit Rider', 'Term Rider', 'Waiver of Premium Rider', 'PWB Rider', 'Income Benefit Rider']
  riders: any = [];
  ridersPremiumReturn: any = [];
  ridersUnitLinked: any = [];
  ridersTraditionParticipating: any = [];
  ridersNonParticipating: any = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  totals: any = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  numberMoneybackDetail = [];

  // @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  selectedPolicyNumberTerm: any;
  selectedPolicyNumberPremiumReturn: any;
  selectedPolicyNumberUnitLinked: any;
  selectedPolicyNumberTraditionParticipating: any;
  selectedPolicyNumberNonParticipating: any;


  constructor(
    private spinner: NgxSpinnerService,
    private notify: NotificationService,
    public as: AuthService,
    public ps: PanelServices,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public datePipe: DatePipe,
    private readonly _fb: FormBuilder
  ) {
    for (var i = 0; i < 31; i++) {
      if (i < 21)
        this.totals.push(i)
      this.numberMoneybackDetail.push(i)
    }

    console.log(this.paramsData);

    this.activatedRoute.queryParams.subscribe((success) => {
      console.log(success);
      this.paramsData = success.value;
      this.update = success.update
    })
  }

  ngOnInit() {
      // this.term = Boolean(this.edit) ? this.userInfo : userWrapper;
    this.initForm();
    this.getPolicyUserTerm(this.paramsData);
    this.getPolicyUserNonParticipating(this.paramsData)
    this.getPolicyUserPremiumReturn(this.paramsData)
    this.getPolicyUserTraditionParticipating(this.paramsData)
    this.getPolicyUserUnitLinked(this.paramsData)
  }

  initForm(isEdit = false) {

    this.riderArray =  this._fb.array([
      this._fb.group({
        riderName: '',
        riderSumAssured: '', 
        riderValidTill: '', 
        riderFeatures: '', 
        riderBenefit: '', 
        riderMaxAge: '', 
        benefitType: '', 
        typeOfFeature: '' 
      }),
    ]);

    this.unitRiderArray =  this._fb.array([
      this._fb.group({
        riderName: '',
        riderSumAssured: '', 
        riderValidTill: '', 
        riderFeatures: '', 
        riderBenefit: '', 
        riderMaxAge: '', 
        benefitType: '', 
        typeOfFeature: '' 
      }),
    ]);

    this.traditionalParticipatingRiderArray =  this._fb.array([
      this._fb.group({
        riderName: '',
        riderSumAssured: '', 
        riderValidTill: '', 
        riderFeatures: '', 
        riderBenefit: '', 
        riderMaxAge: '', 
        benefitType: '', 
        typeOfFeature: '' 
      }),
    ]);

    this.roiRiderArray =  this._fb.array([
      this._fb.group({
        riderName: '',
        riderSumAssured: '', 
        riderValidTill: '', 
        riderFeatures: '', 
        riderBenefit: '', 
        riderMaxAge: '', 
        benefitType: '', 
        typeOfFeature: '' 
      }),
    ]);

    this.childrenArray1 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.childrenArray2 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.unitChildrenArray1 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.unitChildrenArray2 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.traditionalParticipatingChildrenArray1 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.traditionalParticipatingChildrenArray2 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.nonTraditionalParticipatingChildrenArray1 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.nonTraditionalParticipatingChildrenArray2 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.roiChildrenArray1 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.roiChildrenArray2 = this._fb.array([
      this._fb.group({
        name: [""],
        age: [""],
      }),
    ]);

    this.moneyBackTraditionalParticipating = this._fb.array([
      this._fb.group({
        date: [""],
        value: [""],
        liAgeAtMoneyBack: ['']
      }),
    ]);

    this.moneyBackNonTraditionalParticipating = this._fb.array([
      this._fb.group({
        date: [""],
        value: [""],
        liAgeAtMoneyBack: ['']
      }),
    ]);



    if(isEdit) {
      this.term.rider && this.term.rider.length && Helpers.patchArrayValue(this.riderArray, this.term.rider);
      this.term.lastPremiumYearChild && this.term.lastPremiumYearChild.length && Helpers.patchArrayValue(this.childrenArray1, this.term.lastPremiumYearChild);
      this.term.policyTermChild && this.term.policyTermChild.length && Helpers.patchArrayValue(this.childrenArray2, this.term.policyTermChild);

      this.unitLinked.rider && this.unitLinked.rider.length && Helpers.patchArrayValue(this.unitRiderArray, this.unitLinked.rider);
      this.unitLinked.lastPremiumYearChild && this.unitLinked.lastPremiumYearChild.length && Helpers.patchArrayValue(this.unitChildrenArray1, this.unitLinked.lastPremiumYearChild);
      this.unitLinked.policyTermChild && this.unitLinked.policyTermChild.length && Helpers.patchArrayValue(this.unitChildrenArray2, this.unitLinked.policyTermChild);

      this.traditionalParticipating.rider && this.traditionalParticipating.rider.length && Helpers.patchArrayValue(this.unitRiderArray, this.traditionalParticipating.rider);
      this.traditionalParticipating.lastPremiumYearChild && this.traditionalParticipating.lastPremiumYearChild.length && Helpers.patchArrayValue(this.traditionalParticipatingChildrenArray1, this.traditionalParticipating.lastPremiumYearChild);
      this.traditionalParticipating.policyTermChild && this.traditionalParticipating.policyTermChild.length && Helpers.patchArrayValue(this.traditionalParticipatingChildrenArray2, this.traditionalParticipating.policyTermChild);
      this.traditionalParticipating.moneyBackValues && this.traditionalParticipating.moneyBackValues.length && Helpers.patchArrayValue(this.moneyBackTraditionalParticipating, this.traditionalParticipating.moneyBackValues);

      this.nonTraditionalParticipating.lastPremiumYearChild && this.nonTraditionalParticipating.lastPremiumYearChild.length && Helpers.patchArrayValue(this.nonTraditionalParticipatingChildrenArray1, this.nonTraditionalParticipating.lastPremiumYearChild);
      this.nonTraditionalParticipating.policyTermChild && this.nonTraditionalParticipating.policyTermChild.length && Helpers.patchArrayValue(this.nonTraditionalParticipatingChildrenArray2, this.nonTraditionalParticipating.policyTermChild);
      this.nonTraditionalParticipating.moneyBackValues && this.nonTraditionalParticipating.moneyBackValues.length && Helpers.patchArrayValue(this.moneyBackNonTraditionalParticipating, this.nonTraditionalParticipating.moneyBackValues);

   
      this.roi.rider && this.roi.rider.length && Helpers.patchArrayValue(this.roiRiderArray, this.roi.rider);
      this.roi.lastPremiumYearChild && this.roi.lastPremiumYearChild.length && Helpers.patchArrayValue(this.roiChildrenArray1, this.roi.lastPremiumYearChild);
      this.roi.policyTermChild && this.roi.policyTermChild.length && Helpers.patchArrayValue(this.roiChildrenArray2, this.roi.policyTermChild);
    }

    this.termForm = this._fb.group({
      termPlan: [lodash.get(this.term, "termPlan", ''), Validators.required],
      tab: [lodash.get(this.term, "tab", 'term')],
      purpose: [lodash.get(this.term, "purpose", 'premiumReturn')],
      policyCategory: [lodash.get(this.term, "policyCategory", ''), Validators.required],
      nameLifeInsurance: [lodash.get(this.term, "nameLifeInsurance"), [Validators.required]],
      dob: [lodash.get(this.term, "dob", ''), Validators.required],
      company: [lodash.get(this.term, "company", ''), Validators.required],
      plan: [lodash.get(this.term, "plan", ''), Validators.required],
      clientId: [lodash.get(this.term, "clientId", ''), Validators.required],
      policyNumber: [lodash.get(this.term, "policyNumber", ''), Validators.required],
      doc: [lodash.get(this.term, "doc", ''), Validators.required],
      modalPremium: [lodash.get(this.term, "modalPremium", ''), Validators.required],
      mode: [lodash.get(this.term, "mode", ''), Validators.required],
      annualPremium: [lodash.get(this.term, "annualPremium", ''), Validators.required],
      policyTerm: [lodash.get(this.term, "policyTerm", ''), Validators.required],
      premiumPayTerm: [lodash.get(this.term, "premiumPayTerm", ''), Validators.required],
      sumAssured: [lodash.get(this.term, "sumAssured", ''), Validators.required],
      effectiveSumAssured: [lodash.get(this.term, "effectiveSumAssured", '')],
      betterHalfBenefit: [lodash.get(this.term, "betterHalfBenefit", ''), Validators.required],
      betterHalfName: [lodash.get(this.term, "betterHalfName", '')],
      betterHalfSumAssured: [lodash.get(this.term, "betterHalfSumAssured", '')],
      nominee: [lodash.get(this.term, "nominee", ''), Validators.required],
      nomineeDob: [lodash.get(this.term, "nomineeDob", ''), Validators.required],
      assignedBank: [lodash.get(this.term, "assignedBank", ''), Validators.required],
      apointeeName: [lodash.get(this.term, "apointeeName", '')],
      apointeeDob: [lodash.get(this.term, "apointeeDob", '')],
      assigneeDate: [lodash.get(this.term, "assigneeDate", '')],
      rider: this.riderArray,
      loan: [lodash.get(this.term, "loan", ''), Validators.required],
      nameProposer: [lodash.get(this.term, "nameProposer", ''), Validators.required],
      loanAmount: [lodash.get(this.term, "loanAmount", '')],
      endPolicyTerm: [lodash.get(this.term, "endPolicyTerm", ''), Validators.required],
      deathBenefitValue: [lodash.get(this.term, "deathBenefitValue", ''), Validators.required],
      deathBenefits: [lodash.get(this.term, "deathBenefits", ''), Validators.required],
      extendedTermTenure: [lodash.get(this.term, "extendedTermTenure", '')],
      extendedTerm: [lodash.get(this.term, "extendedTerm", ''),  Validators.required],
      deathBenefitsExtended: [lodash.get(this.term, "deathBenefitsExtended", '')],
      ageAtEnd: [lodash.get(this.term, "ageAtEnd", '')],
      investedAmount: [lodash.get(this.term, "investedAmount", ''),  Validators.required],
      maturity: [lodash.get(this.term, "maturity", ''),  Validators.required],
      lastPremiumPayYear: [lodash.get(this.term, "lastPremiumPayYear", ''),  Validators.required],
      planFeatures: [lodash.get(this.term, "planFeatures", ''),  Validators.required],
      currentStatus: [lodash.get(this.term, "currentStatus", ''),  Validators.required],
      currentStatusOther: [lodash.get(this.term, "currentStatusOther", '')],
      lastPremiumPaid: [lodash.get(this.term, "lastPremiumPaid", '')],
      financialYearPurchase: [lodash.get(this.term, "financialYearPurchase", ''),  Validators.required],
      currentFinancialYear: [lodash.get(this.term, "currentFinancialYear", ''),  Validators.required],
      section80C: [lodash.get(this.term, "section80C", '')],
      section80D: [lodash.get(this.term, "section80D", '')],
      section80CPremium: [lodash.get(this.term, "section80CPremium", '')],
      section80DPremium: [lodash.get(this.term, "section80DPremium", '')],
      renewPaymentMode: [lodash.get(this.term, "renewPaymentMode", ''), Validators.required],
      bankName: [lodash.get(this.term, "bankName", '')],
      bankAccountHolder: [lodash.get(this.term, "bankAccountHolder", '')],
      taxFreeSection: [lodash.get(this.term, "taxFreeSection", '')],
      taxSection: [lodash.get(this.term, "taxSection", '')],
      bankAccountNumber: [lodash.get(this.term, "bankAccountNumber", '')],
      gracePeriod: [lodash.get(this.term, "gracePeriod", '')],
      totalRiderTerm: ['0', Validators.required],
      ageAtMaturity: [lodash.get(this.term, "ageAtMaturity", '')],
      neftDetails: [lodash.get(this.term, "neftDetails", '')],
      maturityBenefit: [lodash.get(this.term, "maturityBenefit", '')],
      lastPremiumYearSelfAge: [lodash.get(this.term, "lastPremiumYearSelfAge", '')],
      lastPremiumYearSpouseAge:  [lodash.get(this.term, "lastPremiumYearSpouseAge", '')],
      lastPremiumYearChild:  this.childrenArray1,
      policyTermSelfAge:  [lodash.get(this.term, "policyTermSelfAge", '')],
      policyTermSpouseAge: [lodash.get(this.term, "policyTermSpouseAge", '')],
      policyTermChild: this.childrenArray2,
    });

    this.roiForm = this._fb.group({
      termPlan: [lodash.get(this.roi, "termPlan", ''), Validators.required],
      tab: [lodash.get(this.roi, "tab", 'premiumReturn')],
      purpose: [lodash.get(this.roi, "purpose", 'Income Replacement')],
      policyCategory: [lodash.get(this.roi, "policyCategory", ''), Validators.required],
      nameLifeInsurance: [lodash.get(this.roi, "nameLifeInsurance"), [Validators.required]],
      dob: [lodash.get(this.roi, "dob", ''), Validators.required],
      company: [lodash.get(this.roi, "company", ''), Validators.required],
      plan: [lodash.get(this.roi, "plan", ''), Validators.required],
      clientId: [lodash.get(this.roi, "clientId", ''), Validators.required],
      policyNumber: [lodash.get(this.roi, "policyNumber", ''), Validators.required],
      doc: [lodash.get(this.roi, "doc", ''), Validators.required],
      modalPremium: [lodash.get(this.roi, "modalPremium", ''), Validators.required],
      mode: [lodash.get(this.roi, "mode", ''), Validators.required],
      annualPremium: [lodash.get(this.roi, "annualPremium", ''), Validators.required],
      policyTerm: [lodash.get(this.roi, "policyTerm", ''), Validators.required],
      premiumPayTerm: [lodash.get(this.roi, "premiumPayTerm", ''), Validators.required],
      sumAssured: [lodash.get(this.roi, "sumAssured", ''), Validators.required],
      effectiveSumAssured: [lodash.get(this.roi, "effectiveSumAssured", '')],
      betterHalfBenefit: [lodash.get(this.roi, "betterHalfBenefit", ''), Validators.required],
      nominee: [lodash.get(this.roi, "nominee", ''), Validators.required],
      nomineeDob: [lodash.get(this.roi, "nomineeDob", ''), Validators.required],
      assignedBank: [lodash.get(this.roi, "assignedBank", ''), Validators.required],
      assigneeDate: [lodash.get(this.roi, "assigneeDate", '')],
      rider: this.roiRiderArray,
      loan: [lodash.get(this.roi, "loan", ''), Validators.required],
      nameProposer: [lodash.get(this.roi, "nameProposer", ''), Validators.required],
      loanAmount: [lodash.get(this.roi, "loanAmount", '')],
      deathBenefitValue: [lodash.get(this.roi, "deathBenefitValue", ''), Validators.required],
      deathBenefits: [lodash.get(this.roi, "deathBenefits", ''), Validators.required],
      extendedTerm: [lodash.get(this.roi, "extendedTerm", ''),  Validators.required],
      ageAtEnd: [lodash.get(this.roi, "ageAtEnd", '')],
      investedAmount: [lodash.get(this.roi, "investedAmount", ''),  Validators.required],
      maturity: [lodash.get(this.roi, "maturity", ''),  Validators.required],
      lastPremiumPayYear: [lodash.get(this.roi, "lastPremiumPayYear", ''),  Validators.required],
      planFeatures: [lodash.get(this.roi, "planFeatures", ''),  Validators.required],
      currentStatus: [lodash.get(this.roi, "currentStatus", ''),  Validators.required],
      currentStatusOther: [lodash.get(this.roi, "currentStatusOther", '')],
      lastPremiumPaid: [lodash.get(this.roi, "lastPremiumPaid", '')],
      financialYearPurchase: [lodash.get(this.roi, "financialYearPurchase", ''),  Validators.required],
      currentFinancialYear: [lodash.get(this.roi, "currentFinancialYear", ''),  Validators.required],
      section80C: [lodash.get(this.roi, "section80C", '')],
      section80D: [lodash.get(this.roi, "section80D", '')],
      section80CPremium: [lodash.get(this.roi, "section80CPremium", '')],
      section80DPremium: [lodash.get(this.roi, "section80DPremium", '')],
      renewPaymentMode: [lodash.get(this.roi, "renewPaymentMode", ''), Validators.required],
      bankName: [lodash.get(this.roi, "bankName", '')],
      bankAccountHolder: [lodash.get(this.roi, "bankAccountHolder", '')],
      taxFreeSection: [lodash.get(this.roi, "taxFreeSection", '')],
      taxSection: [lodash.get(this.roi, "taxSection", '')],
      bankAccountNumber: [lodash.get(this.roi, "bankAccountNumber", '')],
      gracePeriod: [lodash.get(this.roi, "gracePeriod", '')],
      totalRiderTerm: ['0', Validators.required],
      ageAtMaturity: [lodash.get(this.roi, "ageAtMaturity", '')],
      neftDetails: [lodash.get(this.roi, "neftDetails", '')],
      maturityBenefit: [lodash.get(this.roi, "maturityBenefit", '')],
      lastPremiumYearSelfAge: [lodash.get(this.roi, "lastPremiumYearSelfAge", '')],
      lastPremiumYearSpouseAge:  [lodash.get(this.roi, "lastPremiumYearSpouseAge", '')],
      lastPremiumYearChild:  this.roiChildrenArray1,
      policyTermSelfAge:  [lodash.get(this.roi, "policyTermSelfAge", '')],
      policyTermSpouseAge: [lodash.get(this.roi, "policyTermSpouseAge", '')],
      policyTermChild: this.roiChildrenArray2,
      maturityDate: [lodash.get(this.roi, "maturityDate", '')],
      maturityValue: [lodash.get(this.roi, "maturityValue", '')],
      guranteedReturn: [lodash.get(this.roi, "guranteedReturn", '')],

    });

    this.unitLinkedForm = this._fb.group({
      tab: [lodash.get(this.unitLinked, "tab", 'unitLinked')],
      purpose: [lodash.get(this.unitLinked, "purpose", '')],
      policyCategory: [lodash.get(this.unitLinked, "policyCategory", '')],
      nameProposer: [lodash.get(this.unitLinked, "nameProposer", '')],
      nameLifeInsurance: [lodash.get(this.unitLinked, "nameLifeInsurance", '')],
      nameOfPayor: [lodash.get(this.unitLinked, "nameOfPayor", '')],
      payorDob: [lodash.get(this.unitLinked, "payorDob", '')],
      minorMajor: [lodash.get(this.unitLinked, "minorMajor", '')],
      dob: [lodash.get(this.unitLinked, "dob", '')],
      company: [lodash.get(this.unitLinked, "company", '')],
      plan: [lodash.get(this.unitLinked, "plan", '')],
      clientId: [lodash.get(this.unitLinked, "clientId", '')],
      policyNumber: [lodash.get(this.unitLinked, "policyNumber", '')],
      doc: [lodash.get(this.unitLinked, "doc", '')],
      modalPremium: [lodash.get(this.unitLinked, "modalPremium", 0)],
      mode: [lodash.get(this.unitLinked, "mode", '')],
      annualPremium: [lodash.get(this.unitLinked, "annualPremium", 0)],
      policyTerm: [lodash.get(this.unitLinked, "policyTerm", '')],
      premiumPayTerm: [lodash.get(this.unitLinked, "premiumPayTerm", '')],
      sumAssured: [lodash.get(this.unitLinked, "sumAssured", '')],
      effectiveSumAssured: [lodash.get(this.unitLinked, "effectiveSumAssured", '')],
      bankAccountHolder: [lodash.get(this.unitLinked, "bankAccountHolder", '')],
      strategyOfPlan: [lodash.get(this.unitLinked, "strategyOfPlan", '')],
      nominee: [lodash.get(this.unitLinked, "nominee", '')],
      nomineeDob: [lodash.get(this.unitLinked, "nomineeDob", '')],
      deathBenefits: [lodash.get(this.unitLinked, "deathBenefits", '')],
      currentFund1: [lodash.get(this.unitLinked, "currentFund1", '')],
      fundAllocation1: [lodash.get(this.unitLinked, "fundAllocation1", '')],
      currentFund2: [lodash.get(this.unitLinked, "termPlan", '')],
      fundAllocation2: [lodash.get(this.unitLinked, "fundAllocation2", '')],
      otherFundOptionsAvailable: [lodash.get(this.unitLinked, "otherFundOptionsAvailable", '')],
      rider: this.unitRiderArray,
      partialWithdrawal: [lodash.get(this.unitLinked, "partialWithdrawal", '')],
      surrenderCharges: [lodash.get(this.unitLinked, "surrenderCharges", '')],
      loan: [lodash.get(this.unitLinked, "loan", '')],
      loanAmount: [lodash.get(this.unitLinked, "loanAmount", '')],
      deathBenefitValue: [lodash.get(this.unitLinked, "deathBenefitValue", '')],
      extendedTerm: [lodash.get(this.unitLinked, "extendedTerm", '')],
      ageAtEnd: [lodash.get(this.unitLinked, "ageAtEnd", '')],
      investedAmount: [lodash.get(this.unitLinked, "investedAmount", '')],
      totalInvestment: [lodash.get(this.unitLinked, "totalInvestment", '')],
      noOfUnits: [lodash.get(this.unitLinked, "noOfUnits", '')],
      navAsOnDate: [lodash.get(this.unitLinked, "navAsOnDate", '')],
      currentFundValue: [lodash.get(this.unitLinked, "currentFundValue", '')],
      maturity: [lodash.get(this.unitLinked, "maturity", '')],
      lastPremiumPayYear: [lodash.get(this.unitLinked, "lastPremiumPayYear", '')],
      familyAgeEndYears: [lodash.get(this.unitLinked, "familyAgeEndYears", '')],
      ageMaturity: [lodash.get(this.unitLinked, "ageMaturity", '')],
      ageAtEndPolicyTerm: [lodash.get(this.unitLinked, "ageAtEndPolicyTerm", '')],
      planFeatures: [lodash.get(this.unitLinked, "planFeatures", '')],
      currentStatus: [lodash.get(this.unitLinked, "currentStatus", '')],
      currentStatusOther: [lodash.get(this.unitLinked, "currentStatusOther", '')],
      lastPremiumPaid: [lodash.get(this.unitLinked, "lastPremiumPaid", '')],
      financialYearPurchase: [lodash.get(this.unitLinked, "financialYearPurchase", '')],
      currentFinancialYear: [lodash.get(this.unitLinked, "currentFinancialYear", '')],
      renewPaymentMode: [lodash.get(this.unitLinked, "renewPaymentMode", '')],
      bankName: [lodash.get(this.unitLinked, "bankName", '')],
      taxFreeSection: [lodash.get(this.unitLinked, "taxFreeSection", '')],
      taxSection: [lodash.get(this.unitLinked, "taxSection", '')],
      bankAccountNumber: [lodash.get(this.unitLinked, "bankAccountNumber", '')],
      maturityBenefit: [lodash.get(this.unitLinked, "maturityBenefit", '')],
      dateOfMaturity: [lodash.get(this.unitLinked, "dateOfMaturity", '')],
      maturityValue8P: [lodash.get(this.unitLinked, "maturityValue8P", '')],
      maturityValue4P: [lodash.get(this.unitLinked, "maturityValue4P", '')],
      startNav: [lodash.get(this.unitLinked, "startNav", '')],
      ageAtCommencement: [lodash.get(this.unitLinked, "ageAtCommencement", '')],
      settlementOption: [lodash.get(this.unitLinked, "settlementOption", '')],
      settlementOptionValue: [lodash.get(this.unitLinked, "settlementOptionValue", '')],
      lastPremiumYearSelfAge: [lodash.get(this.unitLinked, "lastPremiumYearSelfAge", '')],
      lastPremiumYearSpouseAge: [lodash.get(this.unitLinked, "lastPremiumYearSpouseAge", '')],
      lastPremiumYearChild: this.unitChildrenArray1,
      policyTermSelfAge: [lodash.get(this.unitLinked, "policyTermSelfAge", '')],
      policyTermSpouseAge: [lodash.get(this.unitLinked, "policyTermSpouseAge", '')],
      policyTermChild: this.unitChildrenArray2,
      neftDetails: [lodash.get(this.unitLinked, "neftDetails", '')],
      gracePeriod: [lodash.get(this.unitLinked, "gracePeriod", '')],
      currentReturn: [lodash.get(this.unitLinked, "currentReturn", '')],
      section80C: [lodash.get(this.unitLinked, "section80C", '')],
      section80D: [lodash.get(this.unitLinked, "section80D", '')],
      section80CPremium: [lodash.get(this.unitLinked, "section80CPremium", '')],
      section80DPremium: [lodash.get(this.unitLinked, "section80DPremium", '')],
      totalRiderTerm: ['0'],
    });

    this.traditionalParticipatingForm = this._fb.group({
      tab: [lodash.get(this.traditionalParticipating, "tab", 'traditionParticipating')],
      purpose: [lodash.get(this.traditionalParticipating, "purpose", '')],
      policyCategory: [lodash.get(this.traditionalParticipating, "policyCategory", '')],
      nameProposer: [lodash.get(this.traditionalParticipating, "nameProposer", '')],
      nameLifeInsurance: [lodash.get(this.traditionalParticipating, "nameLifeInsurance", '')],
      nameOfPayor: [lodash.get(this.traditionalParticipating, "nameOfPayor", '')],
      payorDob: [lodash.get(this.traditionalParticipating, "payorDob", '')],
      minorMajor: [lodash.get(this.traditionalParticipating, "minorMajor", '')],
      dob: [lodash.get(this.traditionalParticipating, "dob", '')],
      company: [lodash.get(this.traditionalParticipating, "company", '')],
      plan: [lodash.get(this.traditionalParticipating, "plan", '')],
      clientId: [lodash.get(this.traditionalParticipating, "clientId", '')],
      policyNumber: [lodash.get(this.traditionalParticipating, "policyNumber", '')],
      doc: [lodash.get(this.traditionalParticipating, "doc", '')],
      modalPremium: [lodash.get(this.traditionalParticipating, "modalPremium", 0)],
      mode: [lodash.get(this.traditionalParticipating, "mode", '')],
      annualPremium: [lodash.get(this.traditionalParticipating, "annualPremium", 0)],
      policyTerm: [lodash.get(this.traditionalParticipating, "policyTerm", '')],
      premiumPayTerm: [lodash.get(this.traditionalParticipating, "premiumPayTerm", '')],
      settlementOption: [lodash.get(this.unitLinked, "settlementOption", '')],
      sumAssured: [lodash.get(this.traditionalParticipating, "sumAssured", '')],
      effectiveSumAssured: [lodash.get(this.traditionalParticipating, "effectiveSumAssured", '')],
      bankAccountHolder: [lodash.get(this.traditionalParticipating, "bankAccountHolder", '')],
      deathBenefits: [lodash.get(this.traditionalParticipating, "deathBenefits", '')],
      rider: this.traditionalParticipatingRiderArray,
      partialWithdrawal: [lodash.get(this.traditionalParticipating, "partialWithdrawal", '')],
      surrenderCharges: [lodash.get(this.traditionalParticipating, "surrenderCharges", '')],
      loan: [lodash.get(this.traditionalParticipating, "loan", '')],
      loanAmount: [lodash.get(this.traditionalParticipating, "loanAmount", '')],
      deathBenefitValue: [lodash.get(this.traditionalParticipating, "deathBenefitValue", '')],
      extendedTerm: [lodash.get(this.traditionalParticipating, "extendedTerm", '')],
      ageAtEnd: [lodash.get(this.traditionalParticipating, "ageAtEnd", '')],
      investedAmount: [lodash.get(this.traditionalParticipating, "investedAmount", '')],
      totalInvestment: [lodash.get(this.traditionalParticipating, "totalInvestment", '')],
      maturity: [lodash.get(this.traditionalParticipating, "maturity", '')],
      lastPremiumPayYear: [lodash.get(this.traditionalParticipating, "lastPremiumPayYear", '')],
      familyAgeEndYears: [lodash.get(this.traditionalParticipating, "familyAgeEndYears", '')],
      ageMaturity: [lodash.get(this.traditionalParticipating, "ageMaturity", '')],
      ageAtEndPolicyTerm: [lodash.get(this.traditionalParticipating, "ageAtEndPolicyTerm", '')],
      planFeatures: [lodash.get(this.traditionalParticipating, "planFeatures", '')],
      currentStatus: [lodash.get(this.traditionalParticipating, "currentStatus", '')],
      currentStatusOther: [lodash.get(this.traditionalParticipating, "currentStatusOther", '')],
      lastPremiumPaid: [lodash.get(this.traditionalParticipating, "lastPremiumPaid", '')],
      financialYearPurchase: [lodash.get(this.traditionalParticipating, "financialYearPurchase", '')],
      currentFinancialYear: [lodash.get(this.traditionalParticipating, "currentFinancialYear", '')],
      renewPaymentMode: [lodash.get(this.traditionalParticipating, "renewPaymentMode", '')],
      bankName: [lodash.get(this.traditionalParticipating, "bankName", '')],
      taxFreeSection: [lodash.get(this.traditionalParticipating, "taxFreeSection", '')],
      taxSection: [lodash.get(this.traditionalParticipating, "taxSection", '')],
      bankAccountNumber: [lodash.get(this.traditionalParticipating, "bankAccountNumber", '')],
      maturityBenefit: [lodash.get(this.traditionalParticipating, "maturityBenefit", '')],
      dateOfMaturity: [lodash.get(this.traditionalParticipating, "dateOfMaturity", '')],
      maturityValue8P: [lodash.get(this.traditionalParticipating, "maturityValue8P", '')],
      maturityValue4P: [lodash.get(this.traditionalParticipating, "maturityValue4P", '')],
      ageAtCommencement: [lodash.get(this.traditionalParticipating, "ageAtCommencement", '')],
      lastPremiumYearSelfAge: [lodash.get(this.traditionalParticipating, "lastPremiumYearSelfAge", '')],
      lastPremiumYearSpouseAge: [lodash.get(this.traditionalParticipating, "lastPremiumYearSpouseAge", '')],
      lastPremiumYearChild: this.traditionalParticipatingChildrenArray1,
      policyTermSelfAge: [lodash.get(this.traditionalParticipating, "policyTermSelfAge", '')],
      policyTermSpouseAge: [lodash.get(this.traditionalParticipating, "policyTermSpouseAge", '')],
      policyTermChild: this.traditionalParticipatingChildrenArray2,
      neftDetails: [lodash.get(this.traditionalParticipating, "neftDetails", '')],
      gracePeriod: [lodash.get(this.traditionalParticipating, "gracePeriod", '')],
      currentReturn: [lodash.get(this.traditionalParticipating, "currentReturn", '')],
      section80C: [lodash.get(this.traditionalParticipating, "section80C", '')],
      section80D: [lodash.get(this.traditionalParticipating, "section80D", '')],
      section80CPremium: [lodash.get(this.traditionalParticipating, "section80CPremium", '')],
      section80DPremium: [lodash.get(this.traditionalParticipating, "section80DPremium", '')],
      loyaltyAdditions: [lodash.get(this.traditionalParticipating, "loyaltyAdditions", '')],
      moneyBack:[lodash.get(this.traditionalParticipating, "moneyBack", '')],
      moneyBackDetails: [lodash.get(this.traditionalParticipating, "moneyBackDetails", '')],
      moneyBackValues: this.moneyBackTraditionalParticipating,
      bonus: [lodash.get(this.traditionalParticipating, "bonus", '')],
      maturityAtLumpsum: [lodash.get(this.traditionalParticipating, "maturityAtLumpsum", '')],
      assigneeDob: [lodash.get(this.traditionalParticipating, "assigneeDob", '')],
      assigneeName: [lodash.get(this.traditionalParticipating, "assigneeName", '')],
      nonGuranteedReturn: [lodash.get(this.traditionalParticipating, "nonGuranteedReturn", '')],
      totalRiderTerm: ['0'],
    })

    this.nonTraditionalParticipatingForm = this._fb.group({
      tab: [lodash.get(this.term, "tab", 'nonParticipating')],
      purpose: [lodash.get(this.nonTraditionalParticipating, "purpose", '')],
      policyCategory: [lodash.get(this.nonTraditionalParticipating, "policyCategory", '')],
      moneyBack:[lodash.get(this.nonTraditionalParticipating, "moneyBack", '')],
      nameProposer: [lodash.get(this.nonTraditionalParticipating, "nameProposer", '')],
      nameLifeInsurance: [lodash.get(this.nonTraditionalParticipating, "nameLifeInsurance", '')],
      nameOfPayor: [lodash.get(this.nonTraditionalParticipating, "nameOfPayor", '')],
      payorDob: [lodash.get(this.nonTraditionalParticipating, "payorDob", '')],
      minorMajor: [lodash.get(this.nonTraditionalParticipating, "minorMajor", '')],
      dob: [lodash.get(this.nonTraditionalParticipating, "dob", '')],
      company: [lodash.get(this.nonTraditionalParticipating, "company", '')],
      plan: [lodash.get(this.nonTraditionalParticipating, "plan", '')],
      clientId: [lodash.get(this.nonTraditionalParticipating, "clientId", '')],
      policyNumber: [lodash.get(this.nonTraditionalParticipating, "policyNumber", '')],
      doc: [lodash.get(this.nonTraditionalParticipating, "doc", '')],
      modalPremium: [lodash.get(this.nonTraditionalParticipating, "modalPremium", 0)],
      mode: [lodash.get(this.nonTraditionalParticipating, "mode", '')],
      annualPremium: [lodash.get(this.nonTraditionalParticipating, "annualPremium", 0)],
      policyTerm: [lodash.get(this.nonTraditionalParticipating, "policyTerm", '')],
      premiumPayTerm: [lodash.get(this.nonTraditionalParticipating, "premiumPayTerm", '')],
      settlementOption: [lodash.get(this.unitLinked, "settlementOption", '')],
      sumAssured: [lodash.get(this.nonTraditionalParticipating, "sumAssured", '')],
      effectiveSumAssured: [lodash.get(this.nonTraditionalParticipating, "effectiveSumAssured", '')],
      bankAccountHolder: [lodash.get(this.nonTraditionalParticipating, "bankAccountHolder", '')],
      deathBenefits: [lodash.get(this.nonTraditionalParticipating, "deathBenefits", '')],
      partialWithdrawal: [lodash.get(this.nonTraditionalParticipating, "partialWithdrawal", '')],
      surrenderCharges: [lodash.get(this.nonTraditionalParticipating, "surrenderCharges", '')],
      loan: [lodash.get(this.nonTraditionalParticipating, "loan", '')],
      loanAmount: [lodash.get(this.nonTraditionalParticipating, "loanAmount", '')],
      deathBenefitValue: [lodash.get(this.nonTraditionalParticipating, "deathBenefitValue", '')],
      extendedTerm: [lodash.get(this.nonTraditionalParticipating, "extendedTerm", '')],
      ageAtEnd: [lodash.get(this.nonTraditionalParticipating, "ageAtEnd", '')],
      investedAmount: [lodash.get(this.nonTraditionalParticipating, "investedAmount", '')],
      totalInvestment: [lodash.get(this.nonTraditionalParticipating, "totalInvestment", '')],
      maturity: [lodash.get(this.nonTraditionalParticipating, "maturity", '')],
      lastPremiumPayYear: [lodash.get(this.nonTraditionalParticipating, "lastPremiumPayYear", '')],
      familyAgeEndYears: [lodash.get(this.nonTraditionalParticipating, "familyAgeEndYears", '')],
      ageMaturity: [lodash.get(this.nonTraditionalParticipating, "ageMaturity", '')],
      ageAtEndPolicyTerm: [lodash.get(this.nonTraditionalParticipating, "ageAtEndPolicyTerm", '')],
      planFeatures: [lodash.get(this.nonTraditionalParticipating, "planFeatures", '')],
      currentStatus: [lodash.get(this.nonTraditionalParticipating, "currentStatus", '')],
      currentStatusOther: [lodash.get(this.nonTraditionalParticipating, "currentStatusOther", '')],
      lastPremiumPaid: [lodash.get(this.nonTraditionalParticipating, "lastPremiumPaid", '')],
      financialYearPurchase: [lodash.get(this.nonTraditionalParticipating, "financialYearPurchase", '')],
      currentFinancialYear: [lodash.get(this.nonTraditionalParticipating, "currentFinancialYear", '')],
      renewPaymentMode: [lodash.get(this.nonTraditionalParticipating, "renewPaymentMode", '')],
      bankName: [lodash.get(this.nonTraditionalParticipating, "bankName", '')],
      taxFreeSection: [lodash.get(this.nonTraditionalParticipating, "taxFreeSection", '')],
      taxSection: [lodash.get(this.nonTraditionalParticipating, "taxSection", '')],
      bankAccountNumber: [lodash.get(this.nonTraditionalParticipating, "bankAccountNumber", '')],
      maturityBenefit: [lodash.get(this.nonTraditionalParticipating, "maturityBenefit", '')],
      dateOfMaturity: [lodash.get(this.nonTraditionalParticipating, "dateOfMaturity", '')],
      maturityValue: [lodash.get(this.nonTraditionalParticipating, "maturityValue", '')],
      endOfPolicy: [lodash.get(this.nonTraditionalParticipating, "endOfPolicy", '')],
      ageAtCommencement: [lodash.get(this.nonTraditionalParticipating, "ageAtCommencement", '')],
      lastPremiumYearSelfAge: [lodash.get(this.nonTraditionalParticipating, "lastPremiumYearSelfAge", '')],
      lastPremiumYearSpouseAge: [lodash.get(this.nonTraditionalParticipating, "lastPremiumYearSpouseAge", '')],
      lastPremiumYearChild: this.nonTraditionalParticipatingChildrenArray1,
      policyTermSelfAge: [lodash.get(this.nonTraditionalParticipating, "policyTermSelfAge", '')],
      policyTermSpouseAge: [lodash.get(this.nonTraditionalParticipating, "policyTermSpouseAge", '')],
      policyTermChild: this.nonTraditionalParticipatingChildrenArray2,
      neftDetails: [lodash.get(this.nonTraditionalParticipating, "neftDetails", '')],
      gracePeriod: [lodash.get(this.nonTraditionalParticipating, "gracePeriod", '')],
      currentReturn: [lodash.get(this.nonTraditionalParticipating, "currentReturn", '')],
      section80C: [lodash.get(this.nonTraditionalParticipating, "section80C", '')],
      section80D: [lodash.get(this.nonTraditionalParticipating, "section80D", '')],
      section80CPremium: [lodash.get(this.nonTraditionalParticipating, "section80CPremium", '')],
      section80DPremium: [lodash.get(this.nonTraditionalParticipating, "section80DPremium", '')],
      loyaltyAdditions: [lodash.get(this.nonTraditionalParticipating, "loyaltyAdditions", '')],
      moneyBackValue: [lodash.get(this.nonTraditionalParticipating, "moneyBackValue", '')],
      moneyBackDetails: [lodash.get(this.nonTraditionalParticipating, "moneyBackDetails", '')],
      liAgeAtMoneyback: [lodash.get(this.nonTraditionalParticipating, "liAgeAtMoneyback", '')],
      maturityAtLumpsum: [lodash.get(this.nonTraditionalParticipating, "maturityAtLumpsum", '')],
      assigneeDob: [lodash.get(this.nonTraditionalParticipating, "assigneeDob", '')],
      assigneeName: [lodash.get(this.nonTraditionalParticipating, "assigneeName", '')],
      guranteedReturn: [lodash.get(this.nonTraditionalParticipating, "guranteedReturn", '')],
      moneyBackValues: this.moneyBackNonTraditionalParticipating
    })

    if(isEdit) {
      this.termForm.get('totalRiderTerm').setValue(`${this.term.rider.length}`);
      this.unitLinkedForm.get('totalRiderTerm').setValue(`${this.unitLinked.rider.length}`);
      this.traditionalParticipatingForm.get('totalRiderTerm').setValue(`${this.traditionalParticipating.rider.length}`);
      this.roiForm.get('totalRiderTerm').setValue(`${this.roi.rider.length}`);
    }

  }

  setriderUnitLinked() {
    const riderObject = { 
      riderName: '',
      riderSumAssured: '', 
      riderValidTill: '', 
      riderFeatures: '', 
      riderBenefit: '', 
      riderMaxAge: '', 
      benefitType: '', 
      typeOfFeature: '' 
    };

     let riderDetail = this.unitLinkedForm.controls.rider as FormArray;
      while (riderDetail.length !== 0) {
        riderDetail.removeAt(0)
      }
      if (this.unitLinkedForm.get('totalRiderTerm').value > 0) {
        for (let i = 0; i < this.unitLinkedForm.get('totalRiderTerm').value; i++) {
          riderDetail.push(this._fb.group(riderObject));
        }
    
      if (this.update === 'true' && this.unitLinked.rider.length) {
        for (let i = 0; i < this.unitLinked.rider.length; i++) {
          riderDetail.at(i).patchValue(this.unitLinked.rider[i]);
        }
      }
    }
  }

  setriderRoi() {
    const riderObject = { 
      riderName: '',
      riderSumAssured: '', 
      riderValidTill: '', 
      riderFeatures: '', 
      riderBenefit: '', 
      riderMaxAge: '', 
      benefitType: '', 
      typeOfFeature: '' 
    };

     let riderDetail = this.roiForm.controls.rider as FormArray;
      while (riderDetail.length !== 0) {
        riderDetail.removeAt(0)
      }
      if (this.roiForm.get('totalRiderTerm').value > 0) {
        for (let i = 0; i < this.roiForm.get('totalRiderTerm').value; i++) {
          riderDetail.push(this._fb.group(riderObject));
        }
    
      if (this.update === 'true' && this.roi.rider.length) {
        for (let i = 0; i < this.roi.rider.length; i++) {
          riderDetail.at(i).patchValue(this.roi.rider[i]);
        }
      }
    }
  }



  setriderTraditionalParticipating() {
    const riderObject = { 
      riderName: '',
      riderSumAssured: '', 
      riderValidTill: '', 
      riderFeatures: '', 
      riderBenefit: '', 
      riderMaxAge: '', 
      benefitType: '', 
      typeOfFeature: '' 
    };

     let riderDetail = this.traditionalParticipatingForm.controls.rider as FormArray;
      while (riderDetail.length !== 0) {
        riderDetail.removeAt(0)
      }
      if (this.traditionalParticipatingForm.get('totalRiderTerm').value > 0) {
        for (let i = 0; i < this.traditionalParticipatingForm.get('totalRiderTerm').value; i++) {
          riderDetail.push(this._fb.group(riderObject));
        }
    
      if (this.update === 'true' && this.traditionalParticipating.rider.length) {
        for (let i = 0; i < this.traditionalParticipating.rider.length; i++) {
          riderDetail.at(i).patchValue(this.traditionalParticipating.rider[i]);
        }
      }
    }
  }

  onChildrenDeleted(index: number, type: string) {
    const bankArray = this.termForm.get(`${type}`) as FormArray;
    bankArray.removeAt(index);
  }

  addChildren1() {
    const childrenDetail = this.termForm.controls.lastPremiumYearChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  addChildren2() {
    const childrenDetail = this.termForm.controls.policyTermChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  onTraditionalParticipatingMoneybackDeleted(index: number) {
    const bankArray = this.traditionalParticipatingForm.get('moneyBackValues') as FormArray;
    bankArray.removeAt(index);
  }

  onNonTraditionalParticipatingMoneybackDeleted(index: number) {
    const bankArray = this.nonTraditionalParticipatingForm.get('moneyBackValues') as FormArray;
    bankArray.removeAt(index);
  }

  addTraditionalParticipatingMoneyback() {
    const moneyBackDetail = this.traditionalParticipatingForm.controls.moneyBackValues as FormArray;
    moneyBackDetail.push(
      this._fb.group({
        date: [""],
        value: [""],
        liAgeAtMoneyBack: ['']
      })
    );
  }

  addNonTraditionalParticipatingMoneyback() {
    const moneyBackDetail = this.nonTraditionalParticipatingForm.controls.moneyBackValues as FormArray;
    moneyBackDetail.push(
      this._fb.group({
        date: [""],
        value: [""],
        liAgeAtMoneyBack: ['']
      })
    );
  }


  onUnitChildrenDeleted(index: number, type: string) {
    const bankArray = this.unitLinkedForm.get(`${type}`) as FormArray;
    bankArray.removeAt(index);
  }

  addUnitChildren1() {
    const childrenDetail = this.unitLinkedForm.controls.lastPremiumYearChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  addUnitChildren2() {
    const childrenDetail = this.unitLinkedForm.controls.policyTermChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }


  onTraditionalParticipatingChildrenDeleted(index: number, type: string) {
    const bankArray = this.traditionalParticipatingForm.get(`${type}`) as FormArray;
    bankArray.removeAt(index);
  }

  addTraditionalParticipatingChildren1() {
    const childrenDetail = this.traditionalParticipatingForm.controls.lastPremiumYearChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  addTraditionalParticipatingChildren2() {
    const childrenDetail = this.traditionalParticipatingForm.controls.policyTermChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  onNonTraditionalParticipatingChildrenDeleted(index: number, type: string) {
    const bankArray = this.nonTraditionalParticipatingForm.get(`${type}`) as FormArray;
    bankArray.removeAt(index);
  }

  addNonTraditionalParticipatingChildren1() {
    const childrenDetail = this.nonTraditionalParticipatingForm.controls.lastPremiumYearChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  addNonTraditionalParticipatingChildren2() {
    const childrenDetail = this.nonTraditionalParticipatingForm.controls.policyTermChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  onRoiChildrenDeleted(index: number, type: string) {
    const bankArray = this.roiForm.get(`${type}`) as FormArray;
    bankArray.removeAt(index);
  }

  addRoiChildren1() {
    const childrenDetail = this.roiForm.controls.lastPremiumYearChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }

  addRoiChildren2() {
    const childrenDetail = this.roiForm.controls.policyTermChild as FormArray;
    childrenDetail.push(
      this._fb.group({
        name: [""],
        age: [""],
      })
    );
  }


  setriderTerm() {
    const riderObject = { 
      riderName: '',
      riderSumAssured: '', 
      riderValidTill: '', 
      riderFeatures: '', 
      riderBenefit: '', 
      riderMaxAge: '', 
      benefitType: '', 
      typeOfFeature: '' 
    };

     let riderDetail = this.termForm.controls.rider as FormArray;
      while (riderDetail.length !== 0) {
        riderDetail.removeAt(0)
      }
      if (this.termForm.get('totalRiderTerm').value > 0) {
        for (let i = 0; i < this.termForm.get('totalRiderTerm').value; i++) {
          riderDetail.push(this._fb.group(riderObject));
        }
    
      if (this.update === 'true' && this.term.rider.length) {
        for (let i = 0; i < this.term.rider.length; i++) {
          riderDetail.at(i).patchValue(this.term.rider[i]);
        }
      }
    }
  }



  riderObjectPremiumReturn: any;
  riderObjectNonParticipating: any;
  riderObjectTraditionParticipating: any;
  riderObjectTerm: any;

  allTerms: any;
  getPolicyUserTerm(id) {
   this.subscriptions.add(
    this.ps.getLifeInsurancePolicyNumbers(id, 'term').subscribe(data => {
      this.allTerms = data;
    })
   );
  }

  allNonParticipating: any;
  getPolicyUserNonParticipating(id) {
    this.ps.getLifeInsurancePolicyNumbers(id, 'nonParticipating').subscribe(data => {
      this.allNonParticipating = data;
      console.log(data)
    })
  }

  allTraditionParticipating: any;
  getPolicyUserTraditionParticipating(id) {
    this.ps.getLifeInsurancePolicyNumbers(id, 'traditionParticipating').subscribe(data => {
      this.allTraditionParticipating = data;
      console.log(data)
    })
  }

  allPremiumReturn: any;
  getPolicyUserPremiumReturn(id) {
    this.ps.getLifeInsurancePolicyNumbers(id, 'premiumReturn').subscribe(data => {
      this.allPremiumReturn = data;
      console.log(data)
    })
  }

  allUnitLinked: any;
  getPolicyUserUnitLinked(id) {
    this.ps.getLifeInsurancePolicyNumbers(id, 'unitLinked').subscribe(data => {
      this.allUnitLinked = data;
      console.log(data)
    })
  }

  termSelected(index: number) {
    const selectedterm = this.allTerms[index];
    this.term = selectedterm;
    this.initForm(true);
  }

  premiumReturnSelected(index) {
    const selectedRoi = this.allPremiumReturn[index];
    this.roi = selectedRoi;
    this.initForm(true);
  }

  unitLinkedSelected(index) {
    const selectedUnitLinked = this.allUnitLinked[index];
    this.unitLinked = selectedUnitLinked;
    this.initForm(true);
  }

  nonParticipatingSelection(index) {
    const selectedNonParticipating = this.allNonParticipating[index];
    this.unitLinked = selectedNonParticipating;
    this.initForm(true);
  }

  traditionParticipatingSelection(index) {
    const selectedTP = this.allPremiumReturn[index];
    this.traditionalParticipating = selectedTP;
    this.initForm(true); 
  }

  termFinancialYear(event) {
    if (event.keyCode !== 8) {
      var val: string = this.termForm.get('financialYearPurchase').value;
      if (val.length === 4) {
        this.termForm.get('financialYearPurchase').patchValue(this.termForm.get('financialYearPurchase').value + '-');
      }
    }
  }

  termCurrentFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.term.currentFinancialYear;
      if (val.length === 4) {
        this.term.currentFinancialYear = val + '-'
      }
      else if (val.length === 3) {
        val = this.term.currentFinancialYear;
      }
    }
  }

   roiFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.roiForm.get('financialYearPurchase').value;
      if (val.length === 4) {
        this.roiForm.patchValue({
          financialYearPurchase:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.roiForm.get('financialYearPurchase').value;
      }
    }
  }

    roiCurrentFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.roiForm.get('currentFinancialYear').value;
      if (val.length === 4) {
        this.roiForm.patchValue({
          currentFinancialYear:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.roiForm.get('currentFinancialYear').value;
      }
    }
  }

  unitLinkedFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.unitLinkedForm.get('financialYearPurchase').value;
      if (val.length === 4) {
        this.unitLinkedForm.patchValue({
          financialYearPurchase:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.unitLinkedForm.get('financialYearPurchase').value;
      }
    }
  }

  unitLinkedCurrentFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.unitLinkedForm.get('currentFinancialYear').value;
      if (val.length === 4) {
        this.unitLinkedForm.patchValue({
          currentFinancialYear:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.unitLinkedForm.get('currentFinancialYear').value;
      }
    }
    
  }

  traditionParticipatingFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.traditionalParticipatingForm.get('financialYearPurchase').value;
      if (val.length === 4) {
        this.traditionalParticipatingForm.patchValue({
          financialYearPurchase:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.traditionalParticipatingForm.get('financialYearPurchase').value;
      }
    }
  }

  traditionParticipatingCurrentFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.traditionalParticipatingForm.get('currentFinancialYear').value;
      if (val.length === 4) {
        this.traditionalParticipatingForm.patchValue({
          financialYearPurchase:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.traditionalParticipatingForm.get('currentFinancialYear').value;
      }
    }
  }

  nonTraditionParticipatingFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.nonTraditionalParticipatingForm.get('financialYearPurchase').value;
      if (val.length === 4) {
        this.nonTraditionalParticipatingForm.patchValue({
          financialYearPurchase:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.nonTraditionalParticipatingForm.get('financialYearPurchase').value;
      }
    }
  }

  nonTraditionParticipatingCurrentFinancialYear(event) {
    if (event.keyCode !== 8) {

      var val: string = this.nonTraditionalParticipatingForm.get('currentFinancialYear').value;
      if (val.length === 4) {
        this.nonTraditionalParticipatingForm.patchValue({
          financialYearPurchase:  val + '-'
        })
      }
      else if (val.length === 3) {
        val = this.nonTraditionalParticipatingForm.get('currentFinancialYear').value;
      }
    }
  }

  termAnnualPremium() {

    let premium: number;

    if (this.termForm.get('modalPremium').value) {
      if (this.term.mode === PERIOD_TYPES.ANNUAL) {
        premium = 1 * this.termForm.get('modalPremium').value;
      }
      else if (this.term.mode === PERIOD_TYPES.MONTHLY) {
        premium = 12 * this.termForm.get('modalPremium').value;
      }
      else if (this.term.mode === PERIOD_TYPES.QUARTERLY) {
        premium = 4 * this.termForm.get('modalPremium').value;
      }
      else if (this.term.mode === PERIOD_TYPES.SINGLE) {
        premium = 0 * this.termForm.get('modalPremium').value;
      }
      else {
        //Half
        premium = 2 * this.termForm.get('modalPremium').value;
      }

      this.termForm.get('annualPremium').patchValue(premium);
    }
  }

  premiumReturnAnnualPay() {
    let premium: number;

    if (this.roiForm.get('modalPremium').value) {
      if (this.term.mode === PERIOD_TYPES.ANNUAL) {
        premium = 1 * this.roiForm.get('modalPremium').value;
      }
      else if (this.term.mode === PERIOD_TYPES.MONTHLY) {
        premium = 12 * this.roiForm.get('modalPremium').value;
      }
      else if (this.term.mode === PERIOD_TYPES.QUARTERLY) {
        premium = 4 * this.roiForm.get('modalPremium').value;
      }
      else if (this.term.mode === PERIOD_TYPES.SINGLE) {
        premium = 0 * this.roiForm.get('modalPremium').value;
      }
      else {
        //Half
        premium = 2 * this.roiForm.get('modalPremium').value;
      }

      this.roiForm.get('annualPremium').patchValue(premium);
    }
  }

  unitLinkedAnnualPremium() {
    let val: any;
    if (this.unitLinkedForm.get('modalPremium').value != '') {
      if (this.unitLinkedForm.get('mode').value === 'annual') {
        val = 1 * this.unitLinkedForm.get('modalPremium').value;
      }
      else if (this.unitLinkedForm.get('mode').value === 'monthly') {
        val = 12 * this.unitLinkedForm.get('modalPremium').value;
      }
      else if (this.unitLinkedForm.get('mode').value === 'quarterly') {
        val = 4 * this.unitLinkedForm.get('modalPremium').value;
      }
      else if (this.unitLinkedForm.get('mode').value === 'single') {
        val = 0 * this.unitLinkedForm.get('modalPremium').value;
      }
      else {
        //Half
        val = 2 * this.unitLinkedForm.get('modalPremium').value;
      }
    }
    this.unitLinkedForm.patchValue({
      annualPremium: val
    });
  }

  mapTermFormToWrapper() {
    const formValue = this.termForm.getRawValue();

   lodash.set(this.term, ["termPlan"], formValue["termPlan"])
   lodash.set(this.term, ["tab"], formValue["tab"])
   lodash.set(this.term, ["purpose"], formValue["purpose"])
   lodash.set(this.term, ["policyCategory"], formValue["policyCategory"])
   lodash.set(this.term, ["nameLifeInsurance"], formValue["nameLifeInsurance"])
   lodash.set(this.term, ["dob"], formValue["dob"])
   lodash.set(this.term, ["company"], formValue["company"])
   lodash.set(this.term, ["plan"], formValue["plan"])
   lodash.set(this.term, ["clientId"], formValue["clientId"])
   lodash.set(this.term, ["policyNumber"], formValue["policyNumber"])
   lodash.set(this.term, ["doc"], formValue["doc"]),
   lodash.set(this.term, ["modalPremium"], formValue["modalPremium"]),
   lodash.set(this.term, ["mode"], formValue["mode"]),
   lodash.set(this.term, ["annualPremium"], formValue["annualPremium"]),
   lodash.set(this.term, ["policyTerm"], formValue["policyTerm"]),
   lodash.set(this.term, ["premiumPayTerm"], formValue["premiumPayTerm"]),
   lodash.set(this.term, ["sumAssured"], formValue["sumAssured"]),
   lodash.set(this.term, ["effectiveSumAssured"], formValue["effectiveSumAssured"]),
   lodash.set(this.term, ["betterHalfBenefit"], formValue["betterHalfBenefit"]),
   lodash.set(this.term, ["betterHalfName"], formValue["betterHalfName"]),
   lodash.set(this.term, ["betterHalfSumAssured"], formValue["betterHalfSumAssured"]),
   lodash.set(this.term, ["nominee"], formValue["nominee"]),
   lodash.set(this.term, ["nomineeDob"], formValue["nomineeDob"]),
   lodash.set(this.term, ["assignedBank"], formValue["assignedBank"]),
   lodash.set(this.term, ["apointeeName"] , formValue["apointeeName"]),
   lodash.set(this.term, ["apointeeDob"] , formValue["apointeeDob"]),
   lodash.set(this.term, ["assigneeDate"], formValue["apointeeName"]),
   lodash.set(this.term, ["loan"], formValue["loan"]),
   lodash.set(this.term, ["loanAmount"], formValue["loanAmount"])
   lodash.set(this.term, ["endPolicyTerm"], formValue["endPolicyTerm"]),
   lodash.set(this.term, ["deathBenefitValue"], formValue["deathBenefitValue"]),
   lodash.set(this.term, ["deathBenefits"], formValue["deathBenefits"]),
   lodash.set(this.term, ["extendedTermTenure"], formValue["extendedTermTenure"]),
   lodash.set(this.term, ["extendedTerm"], formValue["extendedTerm"]),
   lodash.set(this.term, ["deathBenefitsExtended"], formValue["deathBenefitsExtended"]),
   lodash.set(this.term, ["ageAtEnd"], formValue["ageAtEnd"]),
   lodash.set(this.term, ["investedAmount"], formValue["investedAmount"]),
   lodash.set(this.term, ["maturity"], formValue["maturity"]),
   lodash.set(this.term, ["lastPremiumPayYear"] ,formValue["lastPremiumPayYear"]),
   lodash.set(this.term, ["familyAgeEndYears"] ,formValue["familyAgeEndYears"]),
   lodash.set(this.term, ["ageMaturity"] ,formValue["ageMaturity"]),
   lodash.set(this.term, ["ageAtEndPolicyTerm"] ,formValue["ageAtEndPolicyTerm"]),
   lodash.set(this.term, ["planFeatures"] ,formValue["planFeatures"]),
   lodash.set(this.term, ["currentStatus"] ,formValue["currentStatus"]),
   lodash.set(this.term, ["currentStatusOther"], formValue["currentStatusOther"])
   lodash.set(this.term, ["lastPremiumPaid"], formValue["lastPremiumPaid"]),
   lodash.set(this.term, ["rider"], formValue["rider"]),
   lodash.set(this.term, ["financialYearPurchase"] , formValue["financialYearPurchase"]),
   lodash.set(this.term, ["currentFinancialYear"] ,formValue["currentFinancialYear"]),
   lodash.set(this.term, ["section80C"] , formValue["section80C"])
   lodash.set(this.term, ["section80D"], formValue["section80D"])
   lodash.set(this.term, ["section80CPremium"], formValue["section80CPremium"])
   lodash.set(this.term, ["section80DPremium"], formValue["section80DPremium"])
   lodash.set(this.term, ["renewPaymentMode"], formValue["renewPaymentMode"]),
   lodash.set(this.term, ["bankName"], formValue["bankName"])
   lodash.set(this.term, ["bankAccountHolder"],  formValue["bankAccountHolder"])
   lodash.set(this.term, ["taxFreeSection"], formValue["taxFreeSection"])
   lodash.set(this.term, ["taxSection"], formValue["taxSection"])
   lodash.set(this.term, ["bankAccountNumber"], formValue["bankAccountNumber"])
   lodash.set(this.term, ["gracePeriod"], formValue["gracePeriod"])
   lodash.set(this.term, ["maturityBenefit"], formValue["maturityBenefit"])
   lodash.set(this.term, ["ageAtMaturity"], formValue["ageAtMaturity"])
   lodash.set(this.term, ["neftDetails"], formValue["neftDetails"])
   lodash.set(this.term, ["nameProposer"], formValue["nameProposer"])
   lodash.set(this.term, ["lastPremiumYearSelfAge"], formValue["lastPremiumYearSelfAge"])
   lodash.set(this.term, ["lastPremiumYearSpouseAge"], formValue["lastPremiumYearSpouseAge"])
   lodash.set(this.term, ["policyTermSelfAge"], formValue["policyTermSelfAge"])
   lodash.set(this.term, ["policyTermSpouseAge"], formValue["policyTermSpouseAge"])
   lodash.set(this.term, ["policyTermChild"], formValue["policyTermChild"])
   lodash.set(this.term, ["lastPremiumYearChild"], formValue["lastPremiumYearChild"])
  }

  mapRoiFormToWrapper() {
    const formValue = this.roiForm.getRawValue();

   lodash.set(this.roi, ["termPlan"], formValue["termPlan"])
   lodash.set(this.roi, ["tab"], formValue["tab"])
   lodash.set(this.roi, ["purpose"], formValue["purpose"])
   lodash.set(this.roi, ["policyCategory"], formValue["policyCategory"])
   lodash.set(this.roi, ["nameLifeInsurance"], formValue["nameLifeInsurance"])
   lodash.set(this.roi, ["dob"], formValue["dob"])
   lodash.set(this.roi, ["company"], formValue["company"])
   lodash.set(this.roi, ["plan"], formValue["plan"])
   lodash.set(this.roi, ["clientId"], formValue["clientId"])
   lodash.set(this.roi, ["policyNumber"], formValue["policyNumber"])
   lodash.set(this.roi, ["doc"], formValue["doc"]),
   lodash.set(this.roi, ["modalPremium"], formValue["modalPremium"]),
   lodash.set(this.roi, ["mode"], formValue["mode"]),
   lodash.set(this.roi, ["annualPremium"], formValue["annualPremium"]),
   lodash.set(this.roi, ["policyTerm"], formValue["policyTerm"]),
   lodash.set(this.roi, ["premiumPayTerm"], formValue["premiumPayTerm"]),
   lodash.set(this.roi, ["sumAssured"], formValue["sumAssured"]),
   lodash.set(this.roi, ["effectiveSumAssured"], formValue["effectiveSumAssured"]),
   lodash.set(this.roi, ["betterHalfBenefit"], formValue["betterHalfBenefit"]),
   lodash.set(this.roi, ["nominee"], formValue["nominee"]),
   lodash.set(this.roi, ["nomineeDob"], formValue["nomineeDob"]),
   lodash.set(this.roi, ["assignedBank"], formValue["assignedBank"]),
   lodash.set(this.roi, ["assigneeDate"], formValue["apointeeName"]),
   lodash.set(this.roi, ["loan"], formValue["loan"]),
   lodash.set(this.roi, ["loanAmount"], formValue["loanAmount"])
   lodash.set(this.roi, ["deathBenefitValue"], formValue["deathBenefitValue"]),
   lodash.set(this.roi, ["deathBenefits"], formValue["deathBenefits"]),
   lodash.set(this.roi, ["extendedTerm"], formValue["extendedTerm"]),
   lodash.set(this.roi, ["ageAtEnd"], formValue["ageAtEnd"]),
   lodash.set(this.roi, ["investedAmount"], formValue["investedAmount"]),
   lodash.set(this.roi, ["maturity"], formValue["maturity"]),
   lodash.set(this.roi, ["lastPremiumPayYear"] ,formValue["lastPremiumPayYear"]),
   lodash.set(this.roi, ["familyAgeEndYears"] ,formValue["familyAgeEndYears"]),
   lodash.set(this.roi, ["ageMaturity"] ,formValue["ageMaturity"]),
   lodash.set(this.roi, ["ageAtEndPolicyTerm"] ,formValue["ageAtEndPolicyTerm"]),
   lodash.set(this.roi, ["planFeatures"] ,formValue["planFeatures"]),
   lodash.set(this.roi, ["currentStatus"] ,formValue["currentStatus"]),
   lodash.set(this.roi, ["currentStatusOther"], formValue["currentStatusOther"])
   lodash.set(this.roi, ["lastPremiumPaid"], formValue["lastPremiumPaid"]),
   lodash.set(this.roi, ["rider"], formValue["rider"]),
   lodash.set(this.roi, ["financialYearPurchase"] , formValue["financialYearPurchase"]),
   lodash.set(this.roi, ["currentFinancialYear"] ,formValue["currentFinancialYear"]),
   lodash.set(this.roi, ["section80C"] , formValue["section80C"])
   lodash.set(this.roi, ["section80D"], formValue["section80D"])
   lodash.set(this.roi, ["section80CPremium"], formValue["section80CPremium"])
   lodash.set(this.roi, ["section80DPremium"], formValue["section80DPremium"])
   lodash.set(this.roi, ["renewPaymentMode"], formValue["renewPaymentMode"]),
   lodash.set(this.roi, ["bankName"], formValue["bankName"])
   lodash.set(this.roi, ["bankAccountHolder"],  formValue["bankAccountHolder"])
   lodash.set(this.roi, ["taxFreeSection"], formValue["taxFreeSection"])
   lodash.set(this.roi, ["taxSection"], formValue["taxSection"])
   lodash.set(this.roi, ["bankAccountNumber"], formValue["bankAccountNumber"])
   lodash.set(this.roi, ["gracePeriod"], formValue["gracePeriod"])
   lodash.set(this.roi, ["maturityBenefit"], formValue["maturityBenefit"])
   lodash.set(this.roi, ["ageAtMaturity"], formValue["ageAtMaturity"])
   lodash.set(this.roi, ["neftDetails"], formValue["neftDetails"])
   lodash.set(this.roi, ["nameProposer"], formValue["nameProposer"])
   lodash.set(this.roi, ["lastPremiumYearSelfAge"], formValue["lastPremiumYearSelfAge"])
   lodash.set(this.roi, ["lastPremiumYearSpouseAge"], formValue["lastPremiumYearSpouseAge"])
   lodash.set(this.roi, ["policyTermSelfAge"], formValue["policyTermSelfAge"])
   lodash.set(this.roi, ["policyTermSpouseAge"], formValue["policyTermSpouseAge"])
   lodash.set(this.roi, ["policyTermChild"], formValue["policyTermChild"])
   lodash.set(this.roi, ["lastPremiumYearChild"], formValue["lastPremiumYearChild"])
   lodash.set(this.roi, ["guranteedReturn"], formValue["guranteedReturn"])
   lodash.set(this.roi, ["maturityDate"], formValue["maturityDate"])
   lodash.set(this.roi, ["maturityValue"], formValue["lastPremiumYearChild"])
  }



  mapUnitLinkedFormToWrapper() {
    const formValue = this.unitLinkedForm.getRawValue();

   lodash.set(this.unitLinked, ["termPlan"], formValue["termPlan"])
   lodash.set(this.unitLinked, ["tab"], formValue["tab"])
   lodash.set(this.unitLinked, ["purpose"], formValue["purpose"])
   lodash.set(this.unitLinked, ["policyCategory"], formValue["policyCategory"])
   lodash.set(this.unitLinked, ["nameLifeInsurance"], formValue["nameLifeInsurance"])
   lodash.set(this.unitLinked, ["dob"], formValue["dob"])
   lodash.set(this.unitLinked, ["company"], formValue["company"])
   lodash.set(this.unitLinked, ["plan"], formValue["plan"])
   lodash.set(this.unitLinked, ["clientId"], formValue["clientId"])
   lodash.set(this.unitLinked, ["policyNumber"], formValue["policyNumber"])
   lodash.set(this.unitLinked, ["doc"], formValue["doc"]),
   lodash.set(this.unitLinked, ["modalPremium"], formValue["modalPremium"]),
   lodash.set(this.unitLinked, ["mode"], formValue["mode"]),
   lodash.set(this.unitLinked, ["annualPremium"], formValue["annualPremium"]),
   lodash.set(this.unitLinked, ["policyTerm"], formValue["policyTerm"]),
   lodash.set(this.unitLinked, ["premiumPayTerm"], formValue["premiumPayTerm"]),
   lodash.set(this.unitLinked, ["sumAssured"], formValue["sumAssured"]),
   lodash.set(this.unitLinked, ["effectiveSumAssured"], formValue["effectiveSumAssured"]),
   lodash.set(this.unitLinked, ["betterHalfBenefit"], formValue["betterHalfBenefit"]),
   lodash.set(this.unitLinked, ["betterHalfName"], formValue["betterHalfName"]),
   lodash.set(this.unitLinked, ["betterHalfSumAssured"], formValue["betterHalfSumAssured"]),
   lodash.set(this.unitLinked, ["nominee"], formValue["nominee"]),
   lodash.set(this.unitLinked, ["nomineeDob"], formValue["nomineeDob"]),
   lodash.set(this.unitLinked, ["assignedBank"], formValue["assignedBank"]),
   lodash.set(this.unitLinked, ["apointeeName"] , formValue["apointeeName"]),
   lodash.set(this.unitLinked, ["apointeeDob"] , formValue["apointeeDob"]),
   lodash.set(this.unitLinked, ["assigneeDate"], formValue["apointeeName"]),
   lodash.set(this.unitLinked, ["loan"], formValue["loan"]),
   lodash.set(this.unitLinked, ["loanAmount"], formValue["loanAmount"])
   lodash.set(this.unitLinked, ["endPolicyTerm"], formValue["endPolicyTerm"]),
   lodash.set(this.unitLinked, ["deathBenefitValue"], formValue["deathBenefitValue"]),
   lodash.set(this.unitLinked, ["deathBenefits"], formValue["deathBenefits"]),
   lodash.set(this.unitLinked, ["extendedTermTenure"], formValue["extendedTermTenure"]),
   lodash.set(this.unitLinked, ["extendedTerm"], formValue["extendedTerm"]),
   lodash.set(this.unitLinked, ["deathBenefitsExtended"], formValue["deathBenefitsExtended"]),
   lodash.set(this.unitLinked, ["ageAtEnd"], formValue["ageAtEnd"]),
   lodash.set(this.unitLinked, ["investedAmount"], formValue["investedAmount"]),
   lodash.set(this.unitLinked, ["maturity"], formValue["maturity"]),
   lodash.set(this.unitLinked, ["lastPremiumPayYear"] ,formValue["lastPremiumPayYear"]),
   lodash.set(this.unitLinked, ["familyAgeEndYears"] ,formValue["familyAgeEndYears"]),
   lodash.set(this.unitLinked, ["ageMaturity"] ,formValue["ageMaturity"]),
   lodash.set(this.unitLinked, ["ageAtEndPolicyTerm"] ,formValue["ageAtEndPolicyTerm"]),
   lodash.set(this.unitLinked, ["planFeatures"] ,formValue["planFeatures"]),
   lodash.set(this.unitLinked, ["currentStatus"] ,formValue["currentStatus"]),
   lodash.set(this.unitLinked, ["currentStatusOther"], formValue["currentStatusOther"])
   lodash.set(this.unitLinked, ["lastPremiumPaid"], formValue["lastPremiumPaid"]),
   lodash.set(this.unitLinked, ["rider"], formValue["rider"]),
   lodash.set(this.unitLinked, ["financialYearPurchase"] , formValue["financialYearPurchase"]),
   lodash.set(this.unitLinked, ["currentFinancialYear"] ,formValue["currentFinancialYear"]),
   lodash.set(this.unitLinked, ["section80C"] , formValue["section80C"])
   lodash.set(this.unitLinked, ["section80D"], formValue["section80D"])
   lodash.set(this.unitLinked, ["section80CPremium"], formValue["section80CPremium"])
   lodash.set(this.unitLinked, ["section80DPremium"], formValue["section80DPremium"])
   lodash.set(this.unitLinked, ["renewPaymentMode"], formValue["renewPaymentMode"]),
   lodash.set(this.unitLinked, ["bankName"], formValue["bankName"])
   lodash.set(this.unitLinked, ["bankAccountHolder"],  formValue["bankAccountHolder"])
   lodash.set(this.unitLinked, ["taxFreeSection"], formValue["taxFreeSection"])
   lodash.set(this.unitLinked, ["taxSection"], formValue["taxSection"])
   lodash.set(this.unitLinked, ["bankAccountNumber"], formValue["bankAccountNumber"])
   lodash.set(this.unitLinked, ["gracePeriod"], formValue["gracePeriod"])
   lodash.set(this.unitLinked, ["maturityBenefit"], formValue["maturityBenefit"])
   lodash.set(this.unitLinked, ["ageAtMaturity"], formValue["ageAtMaturity"])
   lodash.set(this.unitLinked, ["neftDetails"], formValue["neftDetails"])
   lodash.set(this.unitLinked, ["nameProposer"], formValue["nameProposer"])
   lodash.set(this.unitLinked, ["lastPremiumYearSelfAge"], formValue["lastPremiumYearSelfAge"])
   lodash.set(this.unitLinked, ["lastPremiumYearSpouseAge"], formValue["lastPremiumYearSpouseAge"])
   lodash.set(this.unitLinked, ["policyTermSelfAge"], formValue["policyTermSelfAge"])
   lodash.set(this.unitLinked, ["policyTermSpouseAge"], formValue["policyTermSpouseAge"])
   lodash.set(this.unitLinked, ["policyTermChild"], formValue["policyTermChild"])
   lodash.set(this.unitLinked, ["lastPremiumYearChild"], formValue["lastPremiumYearChild"])
   lodash.set(this.unitLinked, ["settlementOption"], formValue["settlementOption"])
   lodash.set(this.unitLinked, ["settlementOptionValue"], formValue["settlementOptionValue"])
   lodash.set(this.unitLinked, ["startNav"], formValue["startNav"])
   lodash.set(this.unitLinked, ["ageAtCommencement"], formValue["ageAtCommencement"])
   lodash.set(this.unitLinked, ["dateOfMaturity"], formValue["dateOfMaturity"])
   lodash.set(this.unitLinked, ["navAsOnDate"], formValue["navAsOnDate"])
   lodash.set(this.unitLinked, ["currentFundValue"], formValue["currentFundValue"])
   lodash.set(this.unitLinked, ["totalInvestment"], formValue["totalInvestment"])
   lodash.set(this.unitLinked, ["noOfUnits"], formValue["noOfUnits"])
   lodash.set(this.unitLinked, ["nameOfPayor"], formValue["nameOfPayor"])
   lodash.set(this.unitLinked, ["payorDob"], formValue["payorDob"])
   lodash.set(this.unitLinked, ["currentFund1"], formValue["currentFund1"])
   lodash.set(this.unitLinked, ["fundAllocation1"], formValue["fundAllocation1"])
   lodash.set(this.unitLinked, ["currentFund2"], formValue["currentFund2"])
   lodash.set(this.unitLinked, ["fundAllocation2"], formValue["fundAllocation2"])
   lodash.set(this.unitLinked, ["otherFundOptionsAvailable"], formValue["otherFundOptionsAvailable"])
   lodash.set(this.unitLinked, ["partialWithdrawal"], formValue["otherFundOptionsAvailable"])
   lodash.set(this.unitLinked, ["surrenderCharges"], formValue["surrenderCharges"])
   lodash.set(this.unitLinked, ["moneyBack"], formValue["moneyBack"])
   lodash.set(this.unitLinked, ["minorMajor"], formValue["minorMajor"])
  }

  maptraditionalParticipatingFormToWrapper() {
    const formValue = this.traditionalParticipatingForm.getRawValue();

   lodash.set(this.traditionalParticipating, ["termPlan"], formValue["termPlan"])
   lodash.set(this.traditionalParticipating, ["tab"], formValue["tab"])
   lodash.set(this.traditionalParticipating, ["purpose"], formValue["purpose"])
   lodash.set(this.traditionalParticipating, ["policyCategory"], formValue["policyCategory"])
   lodash.set(this.traditionalParticipating, ["nameLifeInsurance"], formValue["nameLifeInsurance"])
   lodash.set(this.traditionalParticipating, ["dob"], formValue["dob"])
   lodash.set(this.traditionalParticipating, ["company"], formValue["company"])
   lodash.set(this.traditionalParticipating, ["plan"], formValue["plan"])
   lodash.set(this.traditionalParticipating, ["clientId"], formValue["clientId"])
   lodash.set(this.traditionalParticipating, ["policyNumber"], formValue["policyNumber"])
   lodash.set(this.traditionalParticipating, ["doc"], formValue["doc"]),
   lodash.set(this.traditionalParticipating, ["modalPremium"], formValue["modalPremium"]),
   lodash.set(this.traditionalParticipating, ["mode"], formValue["mode"]),
   lodash.set(this.traditionalParticipating, ["annualPremium"], formValue["annualPremium"]),
   lodash.set(this.traditionalParticipating, ["policyTerm"], formValue["policyTerm"]),
   lodash.set(this.traditionalParticipating, ["premiumPayTerm"], formValue["premiumPayTerm"]),
   lodash.set(this.traditionalParticipating, ["sumAssured"], formValue["sumAssured"]),
   lodash.set(this.traditionalParticipating, ["effectiveSumAssured"], formValue["effectiveSumAssured"]),
   lodash.set(this.traditionalParticipating, ["betterHalfBenefit"], formValue["betterHalfBenefit"]),
   lodash.set(this.traditionalParticipating, ["betterHalfName"], formValue["betterHalfName"]),
   lodash.set(this.traditionalParticipating, ["betterHalfSumAssured"], formValue["betterHalfSumAssured"]),
   lodash.set(this.traditionalParticipating, ["nominee"], formValue["nominee"]),
   lodash.set(this.traditionalParticipating, ["nomineeDob"], formValue["nomineeDob"]),
   lodash.set(this.traditionalParticipating, ["assignedBank"], formValue["assignedBank"]),
   lodash.set(this.traditionalParticipating, ["apointeeName"] , formValue["apointeeName"]),
   lodash.set(this.traditionalParticipating, ["apointeeDob"] , formValue["apointeeDob"]),
   lodash.set(this.traditionalParticipating, ["assigneeDate"], formValue["apointeeName"]),
   lodash.set(this.traditionalParticipating, ["loan"], formValue["loan"]),
   lodash.set(this.traditionalParticipating, ["loanAmount"], formValue["loanAmount"])
   lodash.set(this.traditionalParticipating, ["endPolicyTerm"], formValue["endPolicyTerm"]),
   lodash.set(this.traditionalParticipating, ["deathBenefitValue"], formValue["deathBenefitValue"]),
   lodash.set(this.traditionalParticipating, ["deathBenefits"], formValue["deathBenefits"]),
   lodash.set(this.traditionalParticipating, ["extendedTermTenure"], formValue["extendedTermTenure"]),
   lodash.set(this.traditionalParticipating, ["extendedTerm"], formValue["extendedTerm"]),
   lodash.set(this.traditionalParticipating, ["deathBenefitsExtended"], formValue["deathBenefitsExtended"]),
   lodash.set(this.traditionalParticipating, ["ageAtEnd"], formValue["ageAtEnd"]),
   lodash.set(this.traditionalParticipating, ["investedAmount"], formValue["investedAmount"]),
   lodash.set(this.traditionalParticipating, ["maturity"], formValue["maturity"]),
   lodash.set(this.traditionalParticipating, ["lastPremiumPayYear"] ,formValue["lastPremiumPayYear"]),
   lodash.set(this.traditionalParticipating, ["familyAgeEndYears"] ,formValue["familyAgeEndYears"]),
   lodash.set(this.traditionalParticipating, ["ageMaturity"] ,formValue["ageMaturity"]),
   lodash.set(this.traditionalParticipating, ["ageAtEndPolicyTerm"] ,formValue["ageAtEndPolicyTerm"]),
   lodash.set(this.traditionalParticipating, ["planFeatures"] ,formValue["planFeatures"]),
   lodash.set(this.traditionalParticipating, ["currentStatus"] ,formValue["currentStatus"]),
   lodash.set(this.traditionalParticipating, ["currentStatusOther"], formValue["currentStatusOther"])
   lodash.set(this.traditionalParticipating, ["lastPremiumPaid"], formValue["lastPremiumPaid"]),
   lodash.set(this.traditionalParticipating, ["rider"], formValue["rider"]),
   lodash.set(this.traditionalParticipating, ["financialYearPurchase"] , formValue["financialYearPurchase"]),
   lodash.set(this.traditionalParticipating, ["currentFinancialYear"] ,formValue["currentFinancialYear"]),
   lodash.set(this.traditionalParticipating, ["section80C"] , formValue["section80C"])
   lodash.set(this.traditionalParticipating, ["section80D"], formValue["section80D"])
   lodash.set(this.traditionalParticipating, ["section80CPremium"], formValue["section80CPremium"])
   lodash.set(this.traditionalParticipating, ["section80DPremium"], formValue["section80DPremium"])
   lodash.set(this.traditionalParticipating, ["renewPaymentMode"], formValue["renewPaymentMode"]),
   lodash.set(this.traditionalParticipating, ["bankName"], formValue["bankName"])
   lodash.set(this.traditionalParticipating, ["bankAccountHolder"],  formValue["bankAccountHolder"])
   lodash.set(this.traditionalParticipating, ["taxFreeSection"], formValue["taxFreeSection"])
   lodash.set(this.traditionalParticipating, ["taxSection"], formValue["taxSection"])
   lodash.set(this.traditionalParticipating, ["bankAccountNumber"], formValue["bankAccountNumber"])
   lodash.set(this.traditionalParticipating, ["gracePeriod"], formValue["gracePeriod"])
   lodash.set(this.traditionalParticipating, ["maturityBenefit"], formValue["maturityBenefit"])
   lodash.set(this.traditionalParticipating, ["ageAtMaturity"], formValue["ageAtMaturity"])
   lodash.set(this.traditionalParticipating, ["neftDetails"], formValue["neftDetails"])
   lodash.set(this.traditionalParticipating, ["nameProposer"], formValue["nameProposer"])
   lodash.set(this.traditionalParticipating, ["lastPremiumYearSelfAge"], formValue["lastPremiumYearSelfAge"])
   lodash.set(this.traditionalParticipating, ["lastPremiumYearSpouseAge"], formValue["lastPremiumYearSpouseAge"])
   lodash.set(this.traditionalParticipating, ["policyTermSelfAge"], formValue["policyTermSelfAge"])
   lodash.set(this.traditionalParticipating, ["policyTermSpouseAge"], formValue["policyTermSpouseAge"])
   lodash.set(this.traditionalParticipating, ["policyTermChild"], formValue["policyTermChild"])
   lodash.set(this.traditionalParticipating, ["lastPremiumYearChild"], formValue["lastPremiumYearChild"])
   lodash.set(this.traditionalParticipating, ["settlementOption"], formValue["settlementOption"])
   lodash.set(this.traditionalParticipating, ["settlementOptionValue"], formValue["settlementOptionValue"])
   lodash.set(this.traditionalParticipating, ["ageAtCommencement"], formValue["ageAtCommencement"])
   lodash.set(this.traditionalParticipating, ["dateOfMaturity"], formValue["dateOfMaturity"])
   lodash.set(this.traditionalParticipating, ["currentFundValue"], formValue["currentFundValue"])
   lodash.set(this.traditionalParticipating, ["totalInvestment"], formValue["totalInvestment"])
   lodash.set(this.traditionalParticipating, ["noOfUnits"], formValue["noOfUnits"])
   lodash.set(this.traditionalParticipating, ["nameOfPayor"], formValue["nameOfPayor"])
   lodash.set(this.traditionalParticipating, ["payorDob"], formValue["payorDob"])
   lodash.set(this.traditionalParticipating, ["partialWithdrawal"], formValue["otherFundOptionsAvailable"])
   lodash.set(this.traditionalParticipating, ["surrenderCharges"], formValue["surrenderCharges"])
   lodash.set(this.traditionalParticipating, ["moneyBack"], formValue["moneyBack"])
   lodash.set(this.traditionalParticipating, ["minorMajor"], formValue["minorMajor"])
   lodash.set(this.traditionalParticipating, ["loyaltyAdditions"], formValue["loyaltyAdditions"])
   lodash.set(this.traditionalParticipating, ["moneyBackDetails"], formValue["moneyBackDetails"])
   lodash.set(this.traditionalParticipating, ["bonus"], formValue["bonus"])
   lodash.set(this.traditionalParticipating, ["maturityAtLumpsum"], formValue["maturityAtLumpsum"])
   lodash.set(this.traditionalParticipating, ["assigneeDob"], formValue["assigneeDob"])
   lodash.set(this.traditionalParticipating, ["assigneeName"], formValue["assigneeName"])
   lodash.set(this.traditionalParticipating, ["assigneeName"], formValue["assigneeName"])
   lodash.set(this.traditionalParticipating, ["nonGuranteedReturn"], formValue["nonGuranteedReturn"])
  }


  mapNonTraditionalParticipatingFormToWrapper() {
    const formValue = this.nonTraditionalParticipatingForm.getRawValue();

   lodash.set(this.nonTraditionalParticipating, ["termPlan"], formValue["termPlan"])
   lodash.set(this.nonTraditionalParticipating, ["tab"], formValue["tab"])
   lodash.set(this.nonTraditionalParticipating, ["purpose"], formValue["purpose"])
   lodash.set(this.nonTraditionalParticipating, ["policyCategory"], formValue["policyCategory"])
   lodash.set(this.nonTraditionalParticipating, ["nameLifeInsurance"], formValue["nameLifeInsurance"])
   lodash.set(this.nonTraditionalParticipating, ["dob"], formValue["dob"])
   lodash.set(this.nonTraditionalParticipating, ["company"], formValue["company"])
   lodash.set(this.nonTraditionalParticipating, ["plan"], formValue["plan"])
   lodash.set(this.nonTraditionalParticipating, ["clientId"], formValue["clientId"])
   lodash.set(this.nonTraditionalParticipating, ["policyNumber"], formValue["policyNumber"])
   lodash.set(this.nonTraditionalParticipating, ["doc"], formValue["doc"]),
   lodash.set(this.nonTraditionalParticipating, ["modalPremium"], formValue["modalPremium"]),
   lodash.set(this.nonTraditionalParticipating, ["mode"], formValue["mode"]),
   lodash.set(this.nonTraditionalParticipating, ["annualPremium"], formValue["annualPremium"]),
   lodash.set(this.nonTraditionalParticipating, ["policyTerm"], formValue["policyTerm"]),
   lodash.set(this.nonTraditionalParticipating, ["premiumPayTerm"], formValue["premiumPayTerm"]),
   lodash.set(this.nonTraditionalParticipating, ["sumAssured"], formValue["sumAssured"]),
   lodash.set(this.nonTraditionalParticipating, ["effectiveSumAssured"], formValue["effectiveSumAssured"]),
   lodash.set(this.nonTraditionalParticipating, ["betterHalfBenefit"], formValue["betterHalfBenefit"]),
   lodash.set(this.nonTraditionalParticipating, ["betterHalfName"], formValue["betterHalfName"]),
   lodash.set(this.nonTraditionalParticipating, ["betterHalfSumAssured"], formValue["betterHalfSumAssured"]),
   lodash.set(this.nonTraditionalParticipating, ["nominee"], formValue["nominee"]),
   lodash.set(this.nonTraditionalParticipating, ["nomineeDob"], formValue["nomineeDob"]),
   lodash.set(this.nonTraditionalParticipating, ["assignedBank"], formValue["assignedBank"]),
   lodash.set(this.nonTraditionalParticipating, ["apointeeName"] , formValue["apointeeName"]),
   lodash.set(this.nonTraditionalParticipating, ["apointeeDob"] , formValue["apointeeDob"]),
   lodash.set(this.nonTraditionalParticipating, ["assigneeDate"], formValue["apointeeName"]),
   lodash.set(this.nonTraditionalParticipating, ["loan"], formValue["loan"]),
   lodash.set(this.nonTraditionalParticipating, ["loanAmount"], formValue["loanAmount"])
   lodash.set(this.nonTraditionalParticipating, ["endPolicyTerm"], formValue["endPolicyTerm"]),
   lodash.set(this.nonTraditionalParticipating, ["deathBenefitValue"], formValue["deathBenefitValue"]),
   lodash.set(this.nonTraditionalParticipating, ["deathBenefits"], formValue["deathBenefits"]),
   lodash.set(this.nonTraditionalParticipating, ["extendedTermTenure"], formValue["extendedTermTenure"]),
   lodash.set(this.nonTraditionalParticipating, ["extendedTerm"], formValue["extendedTerm"]),
   lodash.set(this.nonTraditionalParticipating, ["deathBenefitsExtended"], formValue["deathBenefitsExtended"]),
   lodash.set(this.nonTraditionalParticipating, ["ageAtEnd"], formValue["ageAtEnd"]),
   lodash.set(this.nonTraditionalParticipating, ["investedAmount"], formValue["investedAmount"]),
   lodash.set(this.nonTraditionalParticipating, ["maturity"], formValue["maturity"]),
   lodash.set(this.nonTraditionalParticipating, ["lastPremiumPayYear"] ,formValue["lastPremiumPayYear"]),
   lodash.set(this.nonTraditionalParticipating, ["familyAgeEndYears"] ,formValue["familyAgeEndYears"]),
   lodash.set(this.nonTraditionalParticipating, ["ageMaturity"] ,formValue["ageMaturity"]),
   lodash.set(this.nonTraditionalParticipating, ["ageAtEndPolicyTerm"] ,formValue["ageAtEndPolicyTerm"]),
   lodash.set(this.nonTraditionalParticipating, ["planFeatures"] ,formValue["planFeatures"]),
   lodash.set(this.nonTraditionalParticipating, ["currentStatus"] ,formValue["currentStatus"]),
   lodash.set(this.nonTraditionalParticipating, ["currentStatusOther"], formValue["currentStatusOther"])
   lodash.set(this.nonTraditionalParticipating, ["lastPremiumPaid"], formValue["lastPremiumPaid"]),
   lodash.set(this.nonTraditionalParticipating, ["financialYearPurchase"] , formValue["financialYearPurchase"]),
   lodash.set(this.nonTraditionalParticipating, ["currentFinancialYear"] ,formValue["currentFinancialYear"]),
   lodash.set(this.nonTraditionalParticipating, ["section80C"] , formValue["section80C"])
   lodash.set(this.nonTraditionalParticipating, ["section80D"], formValue["section80D"])
   lodash.set(this.nonTraditionalParticipating, ["section80CPremium"], formValue["section80CPremium"])
   lodash.set(this.nonTraditionalParticipating, ["section80DPremium"], formValue["section80DPremium"])
   lodash.set(this.nonTraditionalParticipating, ["renewPaymentMode"], formValue["renewPaymentMode"]),
   lodash.set(this.nonTraditionalParticipating, ["bankName"], formValue["bankName"])
   lodash.set(this.nonTraditionalParticipating, ["bankAccountHolder"],  formValue["bankAccountHolder"])
   lodash.set(this.nonTraditionalParticipating, ["taxFreeSection"], formValue["taxFreeSection"])
   lodash.set(this.nonTraditionalParticipating, ["taxSection"], formValue["taxSection"])
   lodash.set(this.nonTraditionalParticipating, ["bankAccountNumber"], formValue["bankAccountNumber"])
   lodash.set(this.nonTraditionalParticipating, ["gracePeriod"], formValue["gracePeriod"])
   lodash.set(this.nonTraditionalParticipating, ["maturityBenefit"], formValue["maturityBenefit"])
   lodash.set(this.nonTraditionalParticipating, ["ageAtMaturity"], formValue["ageAtMaturity"])
   lodash.set(this.nonTraditionalParticipating, ["neftDetails"], formValue["neftDetails"])
   lodash.set(this.nonTraditionalParticipating, ["nameProposer"], formValue["nameProposer"])
   lodash.set(this.nonTraditionalParticipating, ["lastPremiumYearSelfAge"], formValue["lastPremiumYearSelfAge"])
   lodash.set(this.nonTraditionalParticipating, ["lastPremiumYearSpouseAge"], formValue["lastPremiumYearSpouseAge"])
   lodash.set(this.nonTraditionalParticipating, ["policyTermSelfAge"], formValue["policyTermSelfAge"])
   lodash.set(this.nonTraditionalParticipating, ["policyTermSpouseAge"], formValue["policyTermSpouseAge"])
   lodash.set(this.nonTraditionalParticipating, ["policyTermChild"], formValue["policyTermChild"])
   lodash.set(this.nonTraditionalParticipating, ["lastPremiumYearChild"], formValue["lastPremiumYearChild"])
   lodash.set(this.nonTraditionalParticipating, ["settlementOption"], formValue["settlementOption"])
   lodash.set(this.nonTraditionalParticipating, ["settlementOptionValue"], formValue["settlementOptionValue"])
   lodash.set(this.nonTraditionalParticipating, ["ageAtCommencement"], formValue["ageAtCommencement"])
   lodash.set(this.nonTraditionalParticipating, ["dateOfMaturity"], formValue["dateOfMaturity"])
   lodash.set(this.nonTraditionalParticipating, ["currentFundValue"], formValue["currentFundValue"])
   lodash.set(this.nonTraditionalParticipating, ["totalInvestment"], formValue["totalInvestment"])
   lodash.set(this.nonTraditionalParticipating, ["noOfUnits"], formValue["noOfUnits"])
   lodash.set(this.nonTraditionalParticipating, ["nameOfPayor"], formValue["nameOfPayor"])
   lodash.set(this.nonTraditionalParticipating, ["payorDob"], formValue["payorDob"])
   lodash.set(this.nonTraditionalParticipating, ["partialWithdrawal"], formValue["otherFundOptionsAvailable"])
   lodash.set(this.nonTraditionalParticipating, ["surrenderCharges"], formValue["surrenderCharges"])
   lodash.set(this.nonTraditionalParticipating, ["moneyBack"], formValue["moneyBack"])
   lodash.set(this.nonTraditionalParticipating, ["minorMajor"], formValue["minorMajor"])
   lodash.set(this.nonTraditionalParticipating, ["loyaltyAdditions"], formValue["loyaltyAdditions"])
   lodash.set(this.nonTraditionalParticipating, ["moneyBackDetails"], formValue["moneyBackDetails"])
   lodash.set(this.nonTraditionalParticipating, ["guranteedReturn"], formValue["guranteedReturn"])
   lodash.set(this.nonTraditionalParticipating, ["maturityAtLumpsum"], formValue["maturityAtLumpsum"])
   lodash.set(this.nonTraditionalParticipating, ["assigneeDob"], formValue["assigneeDob"])
   lodash.set(this.nonTraditionalParticipating, ["assigneeName"], formValue["assigneeName"])
  }


  traditionAnnualPremium() {

      let val: any;
      if (this.traditionalParticipatingForm.get('modalPremium').value != '') {
        if (this.traditionalParticipatingForm.get('mode').value === 'annual') {
          val = 1 * this.traditionalParticipatingForm.get('modalPremium').value;
        }
        else if (this.traditionalParticipatingForm.get('mode').value === 'monthly') {
          val = 12 * this.traditionalParticipatingForm.get('modalPremium').value;
        }
        else if (this.traditionalParticipatingForm.get('mode').value === 'quarterly') {
          val = 4 * this.traditionalParticipatingForm.get('modalPremium').value;
        }
        else if (this.traditionalParticipatingForm.get('mode').value === 'single') {
          val = 0 * this.traditionalParticipatingForm.get('modalPremium').value;
        }
        else {
          //Half
          val = 2 * this.traditionalParticipatingForm.get('modalPremium').value;
        }
      }
      this.traditionalParticipatingForm.patchValue({
        annualPremium: val
      });
  }

  nonParticipatingAnnualPremium() {

    let val: any;
      if (this.nonTraditionalParticipatingForm.get('modalPremium').value != '') {
        if (this.nonTraditionalParticipatingForm.get('mode').value === 'annual') {
          val = 1 * this.nonTraditionalParticipatingForm.get('modalPremium').value;
        }
        else if (this.nonTraditionalParticipatingForm.get('mode').value === 'monthly') {
          val = 12 * this.nonTraditionalParticipatingForm.get('modalPremium').value;
        }
        else if (this.nonTraditionalParticipatingForm.get('mode').value === 'quarterly') {
          val = 4 * this.nonTraditionalParticipatingForm.get('modalPremium').value;
        }
        else if (this.nonTraditionalParticipatingForm.get('mode').value === 'single') {
          val = 0 * this.nonTraditionalParticipatingForm.get('modalPremium').value;
        }
        else {
          //Half
          val = 2 * this.nonTraditionalParticipatingForm.get('modalPremium').value;
        }
      }
      this.nonTraditionalParticipatingForm.patchValue({
        annualPremium: val
      });
  }

  // termBetterHalfBenefit(event) {
  //   if (event.value === 'yes') {
  //     this.betterHalfSelectedTerm = true;
  //   }
  //   else {
  //     this.betterHalfSelectedTerm = false;
  //     this.term.betterHalfName = undefined;
  //     this.term.betterHalSumAssured = undefined;
  //   }
  // }



  addRiderTerm(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add Rider
    if ((value || '').trim()) {
      if (this.riders.length < this.totalRiderTerm) {
        this.riders.push(value);
      }
      else {
        this.notify.errNotification("Maximum of 6 values only!")
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeRiderTerm(rider: any): void {
    const index = this.riders.indexOf(rider);

    if (index >= 0) {
      this.riders.splice(index, 1);
    }
  }

  addRiderPremiumReturn(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add Rider
    if ((value || '').trim()) {
      if (this.ridersPremiumReturn.length < this.totalRiderPremiumReturn) {
        this.ridersPremiumReturn.push(value);
      }
      else {
        this.notify.errNotification("Maximum of 6 values only!")
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeRiderUnitLinked(rider: any): void {
    const index = this.ridersUnitLinked.indexOf(rider);

    if (index >= 0) {
      this.ridersUnitLinked.splice(index, 1);
    }
  }

  addRiderUnitLinked(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add Rider
    if ((value || '').trim()) {
      if (this.ridersUnitLinked.length < this.totalRiderUnitLinked) {
        this.ridersUnitLinked.push(value);
      }
      else {
        this.notify.errNotification("Maximum of 6 values only!")
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeRiderPremiumReturn(rider: any): void {
    const index = this.ridersUnitLinked.indexOf(rider);

    if (index >= 0) {
      this.ridersUnitLinked.splice(index, 1);
    }
  }

  addRiderTraditionParticipating(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add Rider
    if ((value || '').trim()) {
      if (this.ridersTraditionParticipating.length < this.totalRiderTraditionParticipating) {
        this.ridersTraditionParticipating.push(value);
      }
      else {
        this.notify.errNotification("Maximum of 6 values only!")
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  calcDeathBenefitValue() {
    console.log('')
    // this.traditionParticipating.deathBenefitValue = this.traditionParticipating.sumassure + this.traditionParticipating.sumAssured
  }





  removeRiderNonParticipating(rider: any): void {
    const index = this.ridersNonParticipating.indexOf(rider);

    if (index >= 0) {
      this.ridersNonParticipating.splice(index, 1);
    }
  }

  currentFundValueUnitLinked() {
    if (this.unitLinkedForm.get('totalUnits').value !== '' && this.unitLinkedForm.get('navAsDate').value !== '')
      this.unitLinkedForm.patchValue({
        currentFundValue: (this.unitLinkedForm.get('totalUnits').value * this.unitLinkedForm.get('navAsDate').value).toFixed(2)
      })
  }


  settlementYearPeriodUnitLinked() {
    var d = this.unitLinkedForm.get('maturityDate').value;
    this.unitLinkedForm.patchValue({
      yearPeriod: d.setFullYear(d.getFullYear() + 5)
    })
  }

  addTerm() {
    this.mapTermFormToWrapper();
    delete this.term.id;

    this.subscriptions.add(
      this.ps.addLifeInsurance(this.term, this.paramsData).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Term created");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  editTerm() {
    this.mapTermFormToWrapper();
    this.subscriptions.add(
      this.ps.patchLifeInsurance(this.term.id, this.term).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Term modified");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  addRoi() {
    this.mapRoiFormToWrapper();
    delete this.roi.id;

    this.subscriptions.add(
      this.ps.addLifeInsurance(this.roi, this.paramsData).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "R.O.I created");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  editRoi() {
    this.mapTermFormToWrapper();
    this.subscriptions.add(
      this.ps.patchLifeInsurance(this.roi.id, this.roi).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "R.O.I modified");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  addUnitLinked() {
    this.mapUnitLinkedFormToWrapper();
    delete this.unitLinked.id;

    this.subscriptions.add(
      this.ps.addLifeInsurance(this.unitLinked, this.paramsData).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Unit Linked created");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  editUnitLinked() {
    this.mapUnitLinkedFormToWrapper();
    this.subscriptions.add(
      this.ps.patchLifeInsurance(this.unitLinked.id, this.unitLinked).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Unit Linked modified");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  addTraditionParticipating() {
    this.maptraditionalParticipatingFormToWrapper();
    delete this.term.id;

    this.subscriptions.add(
      this.ps.addLifeInsurance(this.traditionalParticipatingForm, this.paramsData).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Traditional participating created");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  editTraditionParticipating() {
    this.maptraditionalParticipatingFormToWrapper();
    this.subscriptions.add(
      this.ps.patchLifeInsurance(this.traditionalParticipating.id, this.traditionalParticipating).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Traditional participting modified");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }


  addNonTraditionParticipating() {
    this.mapNonTraditionalParticipatingFormToWrapper();
    delete this.nonTraditionalParticipating.id;

    this.subscriptions.add(
      this.ps.addLifeInsurance(this.nonTraditionalParticipating, this.paramsData).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Non participating created");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  editNonTraditionParticipating() {
    this.mapNonTraditionalParticipatingFormToWrapper();
    this.subscriptions.add(
      this.ps.patchLifeInsurance(this.nonTraditionalParticipating.id, this.nonTraditionalParticipating).subscribe(
        (res) => {
          this.spinner.hide();
          this.notify.showNotification("success", "Non Traditional participting modified");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.notify.errNotification(err.message);
          this.spinner.hide();
        }
      )
    );
  }

  getBank(value) {
    console.log(value);

    this.ps.getBanks(value).subscribe((success) => {
      console.log(success);
      this.bankList = success;

    }, (err: HttpErrorResponse) => {
      console.log(err);


    })
  }

  valuechange(ev) {
    if (ev.target.value.length > 2) {
      this.getBank(ev.target.value);
    }
    else {
      this.bankList = [];
    }
  }

  selectDropdown(bankName, value) {
    if (value === 'term')
      this.term.bankName = bankName;
    else if (value === 'premiumReturn')
      this.roi.bankName = bankName;
    else if (value === 'unitLinked')
      this.unitLinked.bankName = bankName;
    else if (value === 'traditionParticipating')
      this.traditionalParticipating.bankName = bankName;
    else if (value === 'nonParticipating')
      this.nonTraditionalParticipating.bankName = bankName;
    this.bankList = [];
  }


  calcCurrentReturnUnitLinked() {
    if (this.unitLinkedForm.get('currentFundValue').value !== '' && this.unitLinkedForm.get('investedAmount').value !== '') {
       this.unitLinkedForm.patchValue({
        currentReturn: ((this.unitLinkedForm.get('currentFundValue').value - this.unitLinkedForm.get('investedAmount').value) / this.unitLinkedForm.get('investedAmount').value * 100).toFixed(2)
       })
    }
  }

  moneybackDetail: any = [];
  moneybackDetailNonPart: any = [];




  calcLastPremiumPayYear() {
    let val;
    if (this.traditionalParticipatingForm.get('doc').value !== '' && this.traditionalParticipatingForm.get('premiumPayTerm').value !== '' && this.traditionalParticipatingForm.get('mode').value !== '') {
      if (this.traditionalParticipatingForm.get('mode').value === 'single') {
         val = this.traditionalParticipatingForm.get('doc').value;
      }
      else if (this.traditionalParticipatingForm.get('mode').value === 'annual') {
        var d: any = new Date(this.traditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.traditionalParticipatingForm.get('premiumPayTerm').value)) - 12);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      else if (this.traditionalParticipatingForm.get('mode').value === 'quarterly') {
        var d: any = new Date(this.traditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.traditionalParticipatingForm.get('premiumPayTerm').value)) - 4);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      else if (this.traditionalParticipatingForm.get('mode').value === 'monthly') {
        var d: any = new Date(this.traditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.traditionalParticipatingForm.get('premiumPayTerm').value)) - 1);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      else if (this.traditionalParticipatingForm.get('mode').value === 'half') {
        var d: any = new Date(this.traditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.traditionalParticipatingForm.get('premiumPayTerm').value)) - 6);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      this.traditionalParticipatingForm.patchValue({
        lastPremiumPayYear: val
      })
    }
  }

  calcLastPremiumPayYearNonPart() {
    let val;
    if (this.nonTraditionalParticipatingForm.get('doc').value !== '' && this.nonTraditionalParticipatingForm.get('premiumPayTerm').value !== '' && this.nonTraditionalParticipatingForm.get('mode').value !== '') {
      if (this.nonTraditionalParticipatingForm.get('mode').value === 'single') {
         val = this.nonTraditionalParticipatingForm.get('doc').value;
      }
      else if (this.nonTraditionalParticipatingForm.get('mode').value === 'annual') {
        var d: any = new Date(this.nonTraditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.nonTraditionalParticipatingForm.get('premiumPayTerm').value)) - 12);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      else if (this.nonTraditionalParticipatingForm.get('mode').value === 'quarterly') {
        var d: any = new Date(this.nonTraditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.nonTraditionalParticipatingForm.get('premiumPayTerm').value)) - 4);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      else if (this.nonTraditionalParticipatingForm.get('mode').value === 'monthly') {
        var d: any = new Date(this.nonTraditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.nonTraditionalParticipatingForm.get('premiumPayTerm').value)) - 1);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      else if (this.nonTraditionalParticipatingForm.get('mode').value === 'half') {
        var d: any = new Date(this.nonTraditionalParticipatingForm.get('doc').value);
        var m = d.setMonth(d.getMonth(d.setYear(d.getFullYear() + this.nonTraditionalParticipatingForm.get('premiumPayTerm').value)) - 6);
        m = new Date(m)
         val = this.datePipe.transform(m, 'yyyy-MM-dd');
      }
      this.nonTraditionalParticipatingForm.patchValue({
        lastPremiumPayYear: val
      })
    }
  }

  // keyFormatter(event, index) {
  //    if(event.keyCode !== 8){

  //   var val: string = this.moneybackDetail[index].moneybackDetail;
  //   if (val.length === 4) {
  //     this.moneybackDetail[index].moneybackDetail = val + '-'
  //   }
  //   else if(val.length === 3) {
  //     val = this.moneybackDetail[index].moneybackDetail
  //   }
  //   else if(val.length === 7) {
  //     this.moneybackDetail[index].moneybackDetail = this.moneybackDetail[index].moneybackDetail + '-';
  //   }
  //   else if(val.length === 6) {
  //     val  = this.moneybackDetail[index].moneybackDetail
  //   }
  // }
  // }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
