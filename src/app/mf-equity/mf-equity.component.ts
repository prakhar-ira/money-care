import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
selector: 'app-mf-equity',
templateUrl: './mf-equity.component.html',
styleUrls: ['./mf-equity.component.scss']
})
export class MfEquityComponent implements OnInit {

mutualFund: any = {
  category:'',
  type:'',
  purpose:'',
  expectedTerm:'',
  taxSaver:'',
  companyName:'',
  proposerName:'',
  minorMajor:'',
  registeredAddress:'',
  folioMobile:'',
  folioEmail:'',
  kycUpdated:'',
  fatcaUpdated:'',
  nomineeHolder1:'',
  nomineeHolder2:'',
  bankName:'',
  bankAccNumber:'',
  bankAddress:'',
  ifscCode:'',
  panNumber:'',
  lifeType:'',
  folioNumber:'',
  planName:'',
  option:'',
  purchaseDate:'',
  purchaseYear:'',
  investmentMode:'',
  lumpSumAmount:0,
  sipEcsDate:'',
  currentNav:'',
  freeUnits:'',
  lockedUnits:'',
  totalDeposits:'',
  fundValue:'',
  absoluteReturn:'',
  termDoiTillDate:'',
  expectedReturnInTerm:'',
  agent:'',
  topUp:'',
  topUpAmount:'',
  topUpDate:'',
  purchaseDateNav:'',
  lastSip:'',
  familyAgePayYear:'',
  familyAgeEndTerm:'',
  sensexAtPurchase:'',
  currentRateSensex:'',
  liMutualFund:'',
  exitLoad:'',
  exitLoadAmount:'',
  exitLoadTenure:'',
  CC:'',
  stp:'',
  smp:'',
  returnPerformanceSinceInception:'',
  status:'',
  policyDownload:'',
  redemptionDate:'',
  partialRedemption:'',
  dividendReceived:'',
  redemptionAmount:'',
  currentFinancialYear:'',
  capitalTaxGain:'',
  annualSip: 0,
  tenureInvestment:'',
  estimatedFundValue:'',
  returnType:'',
  riskometer:'',
  taxTreatmentStt:'',
  lttgCurrentRate:'',
  lttgAmount:'',
  sttgCurrentRate:'',
  sttgAmount:'',
  cTaxBenefit:'',
  maturity:'',
}

equity: any={
  investmentPurpose:'',
  expectedTerm:'',
  companyName:'',
  proposerName:'',
  minorMajor:'',
  beneficiaryName:'',
  nomineeHolder1:'',
  dematAccNum:'',
  clientCode:'',
  registeredAddress:'',
  folioMobile:'',
  folioEmail:'',
  kycUpdated:'',
  fatcaUpdated:'',
  panNumber:'',
  bankName:'',
  bankAccNumber:'',
  lifeType:'',
  folioNumber:'',
  shareName:'',
  purchaseDate:'',
  financialYearOfPurchase:'',
  investmentMode:'',
  numberOfShare:'',
  currentNav:'',
  shareValue:'',
  tenureInvestment:'',
  surrenderValue:'',
  termDoiTillDate:'',
  estimatedFundValue:'',
  returnType:'',
  redemptionAmount:'',
  status:'',
  totalInvestmentDays:'',
  absoluteReturn:'',
  purchaseDateNav:'',
  sensexAtPurchase:'',
  returnPerformanceSinceInception:'',
  familyAgePayYear:'',
  familyAgeEndTerm:'',
  agent:'',
}
paramsData;
update: any;
types = [{id: "equity", text: "EQUITY"}, {id:"hybrid", text: "HYBRID"}, {id:"debt", text: "DEBT"}, {id:"solutionOriented", text: "SOLUTION ORIENTED"}, {id:"other", text: "OTHER"}]
category = [{id: '', text: ''}];
equityCat = [{id: 'multiCapFund', text: 'Multi Cap Fund'}, {id: 'smallCapFund', text: 'Small Cap Fund'}, {id: 'largeCapFund', text: 'Large Cap Fund'}, {id: 'largeMildCapFund', text: 'Large & Mid Cap Fund'}, {id: 'mildCapFund', text: 'Mid Cap Fund'}, {id: 'elss', text: 'ELSS'}, {id: 'dividentYieldFund', text: 'Divident Yield Fund'}, {id: 'sectorialThematic', text: 'Sectoral/Thematic'}, {id: 'contraFund', text: 'Contra Fund'}, {id: 'focusedFund', text: 'Focused Fund'}, {id: 'valueFund', text: 'Value Fund'}, {id: 'rgess', text: 'RGESS'}]
hybridCat = [{id: 'aggressiveHybridFund', text: 'Aggressive Hybrid Fund'}, {id: 'conservativeHybridFund', text: 'Conservative Hybrid Fund'}, {id: 'arbitrageFund', text: 'Arbitrage Fund'}, {id: 'capitalProtectionFunds', text: 'Capital Protection Funds'}, {id: 'equitySavings', text: 'Equity Savings'}, {id: 'dynamicAssetAllocation', text: 'Dynamic Asset Allocation or Balanced Advantage'}, {id: 'multiAssetAllocation', text: 'Multi Asset Allocation'},{id: 'fixedMaturityPlan', text: 'Fixed Maturity Plan - Hybrid'}];
debtCat = [{id: 'lowDurationFund', text: 'Low Duration Fund'}, {id: 'shortDurationFund', text: 'Short Duration Fund'}, {id: 'mediumDurationFund', text: 'Medium Duration Fund'}, {id: 'mediumLongDurationFund', text: 'Medium to Long Duration Fund'}, {id: 'longDurationFund', text: 'Long Duration Fund'}, {id: 'dynamicBondFund', text: 'Dynamic Bond Fund'}, {id: 'giltFund', text: 'Gilt Fund'},{id: 'giltFundTenYear', text: 'Gilt Fund with 10 year constant duration'}, {id: 'corporateBondFund', text: 'Corporate Bond Fund'}, {id: 'creditRiskFund', text: 'Credit Risk Fund'}, {id: 'floaterFund', text: 'Floater Fund'}, {id: 'bankingPsuFund', text: 'Banking & PSU Fund'}, {id: 'fixedMaturityPlans', text: 'Fixed Maturity Plans - Debt'}, {id: 'intervalPlans', text: 'Interval Plans'}, {id: 'ultraShortDurationFund', text: 'Ultra Short Duration Fund'}, {id: 'liquidFund', text: 'Liquid Fund'}, {id: 'moneyMarketFund', text: 'Money Market Fund'}, {id: 'overnightFund', text: 'Overnight Fund'}]
solutionOrinetedCat = [{id: "childrensFund", text: "Childrens Fund"}, {id:"retirementFund", text: "Retirement Fund"}, {id:"investmentCumInsurance", text: "Investment Cum Insurance"}]
othersCat = [{id: "fundOfFunds", text: "Fund of Funds"}, {id: "indexFund", text: "Index Funds/ETFs"}]
days: any = [];
constructor(
  private spinner: NgxSpinnerService,
  private notify:NotificationService,
  public as : AuthService,
  public ps : PanelServices,
  public router : Router,
  public activatedRoute : ActivatedRoute,
  ) {

  console.log(this.paramsData);

  this.activatedRoute.queryParams.subscribe((success)=>{
    console.log(success);
    this.paramsData = success.value;
    this.update = success.update
  })

}

ngOnInit() {
  for(let i = 1; i <= 30; i++){
    this.days.push(i)
  }
  this.getAllMutualFundsFolio(this.paramsData)
  this.getAllShares();
}
mfFolio: any = [];
getAllMutualFundsFolio(id) {
  this.ps.getMutualFunds(id).subscribe( data => {
    console.log(data)
    this.mfFolio = data
  })
}

allEquity:any = []; 
getAllShares() {
  this.ps.getShares(this.paramsData).subscribe(data => {
    this.allEquity = data
  })
}

equitySelected(i) {
  this.equity = this.allEquity[i]
}

mfSelected(i) {
  this.mutualFund = this.mfFolio[i]
}

capitalGain: any;

calcTaxTreatmentStt() {
  if(this.mutualFund.schemeType === 'oneEndedScheme') {
    this.mutualFund.taxTreatmentStt = 0.025 * this.mutualFund.fundValue * 100;
  }
  else {
    this.mutualFund.taxTreatmentStt = 0.001 * this.mutualFund.fundValue * 100;
  }
  // if(this.mutualFund.tenure < 365) {
  //   this.mutualFund.lttgAmount = 10 * this.mutualFund.fundValue * 100;
  //   this.mutualFund.lttgCurrentRate = '10% OF FUND VALUE';
  //   this.mutualFund.sttgAmount = '';
  //   this.mutualFund.sttgCurrentRate = '';
  // }
  // else {
  //   this.mutualFund.lttgAmount = '';
  //   this.mutualFund.lttgCurrentRate = '';
  //   this.mutualFund.sttgAmount = 15 * this.mutualFund.fundValue * 100;
  //   this.mutualFund.sttgCurrentRate = '15% OF FUND VALUE';
  // }
}

getType() {
  if(this.mutualFund.type === 'others'){
    this.category = this.othersCat;
  }
  else if(this.mutualFund.type === 'solutionOriented'){
    this.category = this.solutionOrinetedCat;
  }
  else if(this.mutualFund.type === 'debt'){
    this.category = this.debtCat;
  }
  else if(this.mutualFund.type === 'hybrid'){
    this.category = this.hybridCat;
  }
  else {
    this.category = this.equityCat;
  }
}



calcCapitalTaxGain() {
  if(this.mutualFund.fundValue !== ''){
    this.mutualFund.taxTreatmentStt = 0.00125 * this.mutualFund.fundValue / 100
    if(this.mutualFund.totalDeposits !== '') {
    this.mutualFund.capitalTaxGain = this.mutualFund.fundValue - this.mutualFund.totalDeposits;
      this.mutualFund.absoluteReturn = ((this.mutualFund.fundValue - this.mutualFund.totalDeposits)/this.mutualFund.totalDeposits * 100).toFixed(2);
      this.calcAnnualizedReturn();
    }
  }
}

calcTaxGain() {
  if(this.mutualFund.type === 'equity') {
    this.calcTaxGainEquity()
  }
  else if(this.mutualFund.type === 'debt') {
    this.calcTaxGainDebt();
  }
}

calcTaxGainEquity() {
  if(this.mutualFund.tenure > 365 && this.mutualFund.totalDeposits > 100000) {
    this.mutualFund.lttgCurrentRate = '11.6 %';
    this.mutualFund.lttgAmount = ((11.6 * this.mutualFund.capitalTaxGain)/100).toFixed(2)
    this.mutualFund.sttgAmount = ''
    this.mutualFund.sttgCurrentRate = ''
  }
  else {
    this.mutualFund.sttgCurrentRate = '17.40 %'
    this.mutualFund.sttgAmount = ((17.4 * this.mutualFund.capitalTaxGain)/100).toFixed(2)
    this.mutualFund.lttgAmount = ''
    this.mutualFund.lttgCurrentRate = ''
  }
}

calcTaxGainDebt() {
  if(this.mutualFund.tenure < 1095) {
    this.mutualFund.sttgCurrentRate = 'CAPITAL GAIN IS ADDED TO INCOME OF HOLDER';
    this.mutualFund.sttgAmount = ''
    this.mutualFund.lttgAmount = ''
    this.mutualFund.lttgCurrentRate = ''
  }
  else {
    this.mutualFund.capitalTaxGain = this.mutualFund.fundValue - this.mutualFund.indexation
    this.mutualFund.lttgCurrentRate = '23.20 %'
    this.mutualFund.lttgAmount = ((23.2 * this.mutualFund.capitalTaxGain)/100).toFixed(2)
    this.mutualFund.sttgAmount = ''
    this.mutualFund.sttgCurrentRate = ''
  }
}

calcTenure() {
  if(this.mutualFund.purchaseDate !== '') {
    var today = new Date();
    var doc = new Date(this.mutualFund.purchaseDate)
    var tenure = (today.getTime() - doc.getTime())/(1000 * 3600 * 24)
    this.mutualFund.tenure = Math.round(tenure)

  }
}

calcAnnualizedReturn() {
  var month = (this.mutualFund.tenure / 30)
  var tenureInMonth = Math.round(month)
  this.mutualFund.annualizedReturn = (this.mutualFund.absoluteReturn/tenureInMonth * 12).toFixed(2);
  console.log(tenureInMonth)
}

calcCurrentFinancialYear(event){
  if(event.keyCode !== 8){

    var val: string = this.mutualFund.currentFinancialYear;
    if (val.length === 4) {
      this.mutualFund.currentFinancialYear = val + '-'
    }
    else if(val.length === 3) {
      val = this.mutualFund.currentFinancialYear;
    }
  }
}

// calcTotalInvestmentTenure() {
//   if(this.mutualFund.investmentMode != 'sip')
// }

financialYearPurchase(event) {
  if(event.keyCode !== 8){

    var val: string = this.mutualFund.purchaseYear;
    if (val.length === 4) {
      this.mutualFund.purchaseYear = val + '-'
    }
    else if(val.length === 3) {
      val = this.mutualFund.purchaseYear;
    }
  }
}

equityfinancialYearOfPurchase(event){
  if(event.keyCode !== 8){

    var val: string = this.mutualFund.equity.financialYearOfPurchase;
    if (val.length === 4) {
      this.equity.financialYearOfPurchase = val + '-'
    }
    else if(val.length === 3) {
      val = this.equity.financialYearOfPurchase;
    }
  }
}

shareValue() {
  if(this.equity.numberOfShare != '' && this.equity.currentNav != '') {
    this.equity.shareValue = this.equity.numberOfShare * this.equity.currentNav;
    this.equity.surrenderValue = this.equity.shareValue
  }
}

calcFundValue() {
  if(this.mutualFund.totalUnits && this.mutualFund.currentNav) {
    this.mutualFund.fundValue = this.mutualFund.totalUnits * this.mutualFund.currentNav
  }
}

allHolders: any = []
setTotalHolders() {
  this.allHolders = [];
  for (var i = 0; i < this.mutualFund.totalHolders; i++) {
    this.allHolders.push({nomineeHolder: '', holderAllocation: '', panNumber: '', kyc: ''})
  }
}


mutualFundSubmit() {
  this.mutualFund.allHolders = JSON.stringify(this.allHolders)
  console.log(this.mutualFund);
  this.spinner.show();
  this.ps.addMutualFund(this.mutualFund,this.paramsData).subscribe((success) =>{
    console.log(success);
    this.notify.showNotification("success", "Mutual fund saved") //used for success notification
    this.spinner.hide();
  },(err:HttpErrorResponse)=>{
    console.log(err);
    // console.log(err.json().error.message);
    this.notify.errNotification(err); //used for error notification
    this.spinner.hide();
  })
}

editMutualFund() {
  this.mutualFund.allHolders = JSON.stringify(this.allHolders)
  console.log(this.mutualFund);
  this.spinner.show();
  this.ps.patchMutualFund(this.mutualFund.id,this.mutualFund).subscribe((success) =>{
    console.log(success);
    this.notify.showNotification("success", "Mutual fund saved") //used for success notification
    this.spinner.hide();
  },(err:HttpErrorResponse)=>{
    console.log(err);
    // console.log(err.json().error.message);
    this.notify.errNotification(err); //used for error notification
    this.spinner.hide();
  })
}

equitySubmit(){
  console.log(this.equity);
  this.spinner.show();
  this.ps.addEquity(this.equity, this.paramsData).subscribe((success) =>{
    console.log(success);
    this.notify.showNotification("success", "Share added")
    this.spinner.hide();

  },(err:HttpErrorResponse)=>{
    console.log(err);
    // console.log(err.json().error.message);
    this.notify.errNotification(err);
    this.spinner.hide();
  })
}

editEquity() {
   console.log(this.equity);
  this.spinner.show();
  this.ps.addEquity(this.equity.id, this.equity).subscribe((success) =>{
    console.log(success);
    this.notify.showNotification("success", "Share updated")
    this.spinner.hide();

  },(err:HttpErrorResponse)=>{
    console.log(err);
    // console.log(err.json().error.message);
    this.notify.errNotification(err);
    this.spinner.hide();
  })
}


calcTenureInvestment() {
  if(this.mutualFund.investmentMode === 'sip') {
    if(this.mutualFund.sipAmount !== '' && this.mutualFund.expectedTerm !== '' && this.mutualFund.topUpAmount !== '') {
      this.mutualFund.tenureInvestment = (this.mutualFund.sipAmount * 12 * this.mutualFund.expectedTerm) + this.mutualFund.topUpAmount;  
    }
    else if(this.mutualFund.sipAmount !== '' && this.mutualFund.expectedTerm !== '' && this.mutualFund.topUpAmount === '') {
      this.mutualFund.tenureInvestment = this.mutualFund.sipAmount * 12* this.mutualFund.expectedTerm; 
    }
  }
  else if(this.mutualFund.investmentMode === 'lumpsum') {
    if(this.mutualFund.mutualFund.lumpSumAmount !== '' && this.mutualFund.topUpAmount !== '') {
      this.mutualFund.tenureInvestment = this.mutualFund.lumpSumAmount + this.mutualFund.topUpAmount;  
    }
    else if(this.mutualFund.sipAmount !== '' && this.mutualFund.topUpAmount === '') {
      this.mutualFund.tenureInvestment = this.mutualFund.lumpSumAmount; 
    }
  }
  else if(this.mutualFund.investmentMode === 'sipLumpsum') {
    if(this.mutualFund.lumpSumAmount !== '' && this.mutualFund.sipAmount !== '' && this.mutualFund.expectedTerm !== '' && this.mutualFund.topUpAmount !== '') {
      this.mutualFund.tenureInvestment = (this.mutualFund.lumpSumAmount + this.mutualFund.topUpAmount) + ((this.mutualFund.sipAmount * this.mutualFund.expectedTerm) + this.mutualFund.topUpAmount); 
    }
    else if(this.mutualFund.lumpSumAmount !== '' && this.mutualFund.sipAmount !== '' && this.mutualFund.expectedTerm !== '') {
      this.mutualFund.tenureInvestment = (this.mutualFund.lumpSumAmount + this.mutualFund.topUpAmount) + (this.mutualFund.sipAmount * this.mutualFund.expectedTerm); 
    }
  }
}

// calcAbsoluteReturnMF() {
  //   this.mutualFund.absoluteReturn =
  // }


  valuechangeSip(ev){
    console.log(ev.target.value);
    this.mutualFund.annualSip = this.mutualFund.sipAmount * 12
    if(this.mutualFund.lumpSumAmount && this.mutualFund.sipAmount)
      this.mutualFund.totalDeposits = this.mutualFund.lumpSumAmount * this.mutualFund.sipAmount;
  }

  calculateAbsoluteReturn() {
    if(this.equity.shareValue !== '' && this.equity.tenureInvestment !== '')
      this.equity.absoluteReturn = (this.equity.shareValue - this.equity.tenureInvestment)/this.equity.tenureInvestment;
  }

  fileToUpload: any;

  handleFileInput(event) {
    var dataForm = event.target.files;
    this.fileToUpload = dataForm;
    var fileData: FileList;
    fileData = this.fileToUpload
    this.ps.createProfileUpDir({ "name": "statement-upload" }).subscribe(res => {
      var response: any = res;
      if(response.name === 'statement-upload') {
        this.ps.fileUpload(fileData).subscribe( response => {
          console.log('fileUploaded');
          var files: any = response;
          this.mutualFund.statementUpload = files.result.files.file[0].name;
          console.log(this.mutualFund.statementUpload)
        })
      }
    }, error => {
      console.log(JSON.parse(error.Body).error)
        if (JSON.parse(error.Body).error.code === 'EEXIST') {
          this.ps.fileUpload(fileData).subscribe( response => {
          var result: any = response;
          var files = JSON.parse(result.Body);
          console.log(response)
          this.mutualFund.statementUpload = files.result.files.file[0].name;
          console.log('hello');
          console.log(this.mutualFund.statementUpload)
        },err => {
          console.log(err)
        })
       }
    })
  }


}
