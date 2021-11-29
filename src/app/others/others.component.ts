import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  showSectionNameFixed: boolean = false;
  showSectionNameScheme: boolean = false;
  showSectionNameBond: boolean = false;
  bankList = [];
  paramsData;
  familyList =[];
  secondFamilyList=[];
  bond: any = {
    firstHolder:'',
    minorMajor:'major',
    secondHolder:'',
    accountType:'',
    companyName:'',
    schemeName:'',
    guaranteed:'',
    folioNo:'',
    certification:'',
    distinctive:'',
    unitNumber:'',
    issuance:'',
    term:'',
    payingTerm:'Single',
    paymnetMode:'',
    maturityDate:'',
    tenureInvestment:'',
    backDate:'',
    backAmount:'',
    maturityValue:'',
    nomineeName:'',
    taxBenefits:'',
    maturity:'',
    returnRate:'',
    bank:'',
    payoutMode:'',
    status:'',
    lastPayYear:'',
    familyAgePayYear:'',
    familyAgeEndTerm:'',
    financialYearOnPurchase:'',
    financialYear:'',
    contactLink:'',
    branchLocator:'',
    surrenderAmount:'',
  }

  scheme: any = {
    firstHolder:'',
    minorMajor:'major',
    secondHolder:'',
    accountType:'',
    postOffice:'',
    schemeName:'',
    guaranteed:'',
    folioNum:'',
    certification:'',
    distinctive:'',
    unitNumber:'',
    issuance:'',
    term:'',
    payingTerm:'Single',
    maturityDate:'',
    tenureInvestment:'',
    maturityValue:'',
    nomineeName:'',
    taxBenefits:'',
    maturity:'',
    returnRate:'',
    payoutMode:'',
    backAmount:'',
    place:'',
    status:'',
    lastPayYear:'',
    familyAgePayYear:'',
    familyAgeEndTerm:'',
    financialYearOnPurchase:'',
    currentFinancialYear:'',
    contactLink:'',
    branchLocator:'',
    surrenderAmount:'',
  }
  fixed: any = {
    firstHolder:'',
    minorMajor:'major',
    secondHolder:'',
    nameBank:'',
    schemeName:'',
    guaranteed:'',
    folioNum:'',
    issuance:'',
    maturityDate:'',
    amountDeposit:'',
    maturityValue:'',
    term:'',
    payingTerm:'Single',
    paymentMode:'',
    tenureInvestment:'',
    payoutMode:'',
    nomineeName:'',
    taxBenefits:'',
    maturity:'',
    bankAddress:'',
    status:'',
    surrenderAmount:'',
    lastPayYear:'',
    familyAgePayYear:'',
    familyAgeEndTerm:'',
    financialYearOnPurchase:'',
    currentFinancialYear:'',
    contactLink:'',
    branchLocator:'',
    returnRate:'',
  }
  
  update: any;
  constructor(

    private spinner: NgxSpinnerService,
    private notify:NotificationService,
    public as : AuthService,
    public ps : PanelServices,
    public router : Router,
    public activatedRoute : ActivatedRoute
    ) { 
    console.log(this.paramsData);

    this.activatedRoute.queryParams.subscribe((success)=>{
      console.log(success);
      this.paramsData = success.value;
      this.update = success.update
    })

  }

  ngOnInit() {
    this.getAllBonds();
    this.getAllFixedDeposits();
    this.getAllGovtScheme();
  }

  allFixedDeposits: any = [];
  getAllFixedDeposits() {
    this.ps.getFixedDeposits(this.paramsData).subscribe( data => {
      this.allFixedDeposits = data
    })
  }

  fixedSelected(i) {
    this.fixed = this.allFixedDeposits[i]
  }

  bondSelected(i) {
    this.bond = this.allBonds[i]
    this.buyBacksBond = JSON.parse(this.bond.buyBacks)
  }

  schemeSelected(i) {
    this.scheme = this.allGovtScheme[i]
  }

  allBonds: any = [];
  getAllBonds() {
    this.ps.getBonds(this.paramsData).subscribe(data => {
      this.allBonds = data;
    })
  }

  allGovtScheme: any = [];
  getAllGovtScheme() {
    this.ps.getGovtScheme(this.paramsData).subscribe( data => {
      this.allGovtScheme = data;
    })
  }

  buyBacksBond: any = [];
  getBuyBackNumber() {
    this.buyBacksBond = [];
    for (var i = 0; i < this.bond.numberOfMoneyback; i++) {
      this.buyBacksBond.push({ date: '', amount: '' })
    }
  }

  bondSubmit(){
    this.bond.buyBacks = JSON.stringify(this.buyBacksBond)
    console.log(this.bond);
    this.spinner.show();
    this.ps.addBond(this.bond,this.paramsData).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", "Bond Saved")
      this.spinner.hide();
    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    })
  }

  bondEdit(){
    this.bond.buyBacks = JSON.stringify(this.buyBacksBond)
    console.log(this.bond);
    this.spinner.show();
    this.ps.addBond(this.bond.id ,this.bond).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", "Bond Saved")
      this.spinner.hide();
    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    })
  }

  fixedSubmit(){
    console.log(this.fixed);
    this.spinner.show();
    this.ps.addFixed(this.fixed,this.paramsData).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", "Fixed Deposit Saved")
      this.spinner.hide();

    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )

  }

  fixedEdit(){
    console.log(this.fixed);
    this.spinner.show();
    this.ps.patchFixedDeposits(this.fixed.id, this.fixed).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", "Fixed Deposit Updated")
      this.spinner.hide();

    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )
  }
  schemeSubmit(){
    console.log(this.scheme);

    this.spinner.show();
    this.ps.addScheme(this.scheme,this.paramsData).subscribe((success) =>{
      this.notify.showNotification("success", "Scheme saved")
      console.log(success);
      this.spinner.hide();

    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.showNotification('Success', 'Submitted!')
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )

  }

  schemeEdit(){
    console.log(this.scheme);

    this.spinner.show();
    this.ps.patchGovtScheme(this.scheme.id, this.scheme).subscribe((success) =>{
      this.notify.showNotification("success", "Fixed Deposits Updated")
      console.log(success);
      this.spinner.hide();

    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )

  }


  getBank(value){
    console.log(value);

    this.ps.getBanks(value).subscribe((success) =>{
      console.log(success);
      this.bankList = success;

    },(err:HttpErrorResponse)=>{
      console.log(err);


    }
    )
  }

  getFamilyName(value,checkInput){
    console.log(checkInput);

    this.ps.getFamilyName(value,this.paramsData).subscribe((success) =>{
      console.log(success);
      if(checkInput == 'firstHolder')
      {
        this.familyList = success;     
      }
      else if(checkInput == 'secondHolder'){
        this.secondFamilyList = success;     
      }

    },(err:HttpErrorResponse)=>{
      console.log(err);


    }
    )
  }

  valuechangeFamily(ev,checkInput){
    console.log(ev.target.value);
    if(ev.target.value.length > 2){
      this.getFamilyName(ev.target.value,checkInput); 
    }
    else{
      this.familyList = [];
      this.secondFamilyList =[];
    }
  }

  valuechange(ev){
    console.log(ev.target.value);
    if(ev.target.value.length > 2){
      this.getBank(ev.target.value);

    }
    else{
      this.bankList = [];
    }
  }


  selectDropdown(bankName){

    console.log('sdsd');
    this.fixed.nameBank = bankName;
    this.bankList = [];
  }

  selectDropdownFamily(familyName,check){

    console.log(check);
    if(check == 'firstHolder'){
      this.bond.firstHolder = familyName;
      this.familyList = [];
    }
    else if(check == 'secondHolder'){
      this.bond.secondHolder = familyName;
      this.secondFamilyList =[];
    }


  }

  fixedTaxBenefits(event) {
    console.log(event.value)
    if(event.value === 'yes') {
      this.showSectionNameFixed = true;
    }
    else {
      this.showSectionNameFixed = false;
      this.fixed.taxBenefits = "No"
    }
  }

  schemeTaxBenefits(event) {
    if(event.value === 'yes') {
      this.showSectionNameScheme = true;
    }
    else {
      this.showSectionNameScheme = false;
      this.scheme.taxBenefits = "No"
    }
  }

  bondTaxBenefits(event) {
    if(event.value === 'yes') {
      this.showSectionNameBond = true;
    }
    else {
      this.showSectionNameBond = false;
      this.bond.taxBenefits = "No"
    }
  }

  allHolders: any = []
  setTotalHoldersBond() {
    this.allHolders = [];
    for (var i = 0; i < parseInt(this.bond.totalHolders); i++) {
      this.allHolders.push({nomineeHolder: '', holderAllocation: '', panNumber: '', kyc: ''})
    }
  }

  allHoldersGovt: any = []
  setTotalHoldersGovt() {
    this.allHoldersGovt = [];
    for (var i = 0; i < parseInt(this.scheme.totalHolders); i++) {
      this.allHoldersGovt.push({nomineeHolder: '', holderAllocation: '', panNumber: '', kyc: ''})
    }
  }

  allHoldersFixed: any = []
  setTotalHoldersFixed() {
    this.allHoldersFixed = [];
    for (var i = 0; i < parseInt(this.fixed.totalHolders); i++) {
      this.allHoldersFixed.push({nomineeHolder: '', holderAllocation: '', panNumber: '', kyc: ''})
    }
  }

}
