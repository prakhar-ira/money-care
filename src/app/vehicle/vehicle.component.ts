import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  paramsData;
  update: any;
  privateVehicle: any= { 
    type: "privateVehicle",
    vehicleVariant:'',
    nameVehicle:'',
    companyName:'',
    ownerName:'',
    policyNumber:'',
    doc:'',
    addressRcCard:'',
    policyPeriod:'',
    geographicalArea:'',
    vehicleName:'',
    registration:'',
    registrationDate:'',
    registrationValidityTill:'',
    makeModel:'',
    modelVariant:'',
    bodyType:'',
    manufactureYear:'',
    engineNumber:'',
    chassisNumber:'',
    cubicCapacity:'',
    seatingCapacity:'',
    fuelType:'',
    vehicleIdv:'',
    nonElectricalAccessory:'',
    electricalAccessory:'',
    cngKit:'',
    totalIdv:'',
    premium:'',
    claimTaken:'',
    currentYearNcb:'',
    lastYearNcb:'',
    claimStatus:'',
    zeroDep:'',
    consumable:'',
    invoiceReturn:'',
    engineProtectionCover:'',
    ncbProtector:'',
    keyLockReplacement:'',
    dailyAllowance:'',
    tyreProtector:'',
    rimDamageCover:'',
    personalBelongingsLoss:'',
    electricalExternalAccessory:'',
    nonElectricalExternalAccessory:'',
    others:'',
    imt1:'',
    imt2:'',
    validDrivingLicense:'',
    uploadDrivingLicense:'',
    drivingLicenseNumber:'',
    licenseValidity:'',
    voluntaryDeductibleAmount:'',
    compulsaryDeductibleAmount:'',
    rto:'',
    gstNumber:'',
    renewalDate:'',
    cashlessGarage:'',
    companyContact:'',
    branchLocator:'',
    claimProcedure:'',
    policyDownload:'',
    policyStatus:'',
    lastPremiumPayYear:'',
    familyAgePayYear:'',
    addOnCoverage: [],
    imt: [],
    imtRemark: [],
    moreImt: []
  }

  commercialVehicle: any = {
    type: "commercialVehicle",
    vehicleVariant:'',
    publicCarrier:'',
    vehicleUsage:'',
    drivenBy:'',
    vehicleFitnessApplicability:'',
    vehicleTaxPaidTill:'',
    vehicleInNameOf:'',
    companyName:'',
    ownerName:'',
    insuranceCompanyName:'',
    policyNumber:'',
    doc:'',
    addressRcCard:'',
    policyPeriod:'',
    geographicalArea:'',
    vehicleName:'',
    registration:'',
    registrationDate:'',
    registrationValidityTill:'',
    manufacturer:'',
    vehicleSubClass:'',
    makeModel:'',
    bodyType:'',
    manufactureYear:'',
    engineNumber:'',
    chassisNumber:'',
    cubicCapacity:'',
    seatingCapacity:'',
    fuelType:'',
    gvw:'',
    carryingCapacity:'',
    vehicleIdv:'',
    nonElectricalAccessory:'',
    electricalAccessory:'',
    cngKit:'',
    totalIdv:'',
    premium:'',
    claimTaken:'',
    currentYearNcb:'',
    lastYearNcb:'',
    claimStatus:'',
    zeroDep:'',
    consumable:'',
    invoiceReturn:'',
    engineProtectionCover:'',
    ncbProtector:'',
    keyLockReplacement:'',
    dailyAllowance:'',
    tyreProtector:'',
    rimDamageCover:'',
    personalBelongingsLoss:'',
    electricalExternalAccessory:'',
    nonElectricalExternalAccessory:'',
    others:'',
    validDrivingLicense:'',
    uploadDrivingLicense:'',
    drivingLicense:'',
    drivingLicenseNumber:'',
    licenseValidity:'',
    voluntaryDeductibleAmount:'',
    compulsaryDeductibleAmount:'',
    rto:'',
    gstNumber:'',
    renewalDate:'',
    cashlessGarage:'',
    contactUs:'',
    branchLocator:'',
    claimProcedure:'',
    policyStatus:'',
    lastPremiumPayYear:'',
    familyAgePayYear:'',
    addOnCoverage: [],
    imt: [],
    imtRemark: [],
    moreImt: []
  }
  otherIMTPrivate: any = [];
  otherIMTCommercial: any = [];
  claimDetailsCommercialVehicle: any = [];
  claimDetailsPrivateVehicle: any = [];
  imtRemarkPrivate: any = [];
  imtRemarkCommercial: any = [];
  constructor(

    private spinner: NgxSpinnerService,
    private notify:NotificationService,
    public as : AuthService,
    public ps : PanelServices,
    public router : Router,
    public activatedRoute : ActivatedRoute,
    public datePipe: DatePipe,
    ) { 
    this.activatedRoute.queryParams.subscribe((success)=>{
      console.log(success);
      this.paramsData = success.value;
      this.update = success.update
    })
  }

  ngOnInit() {
    this.getPrivateVehicle(this.paramsData, this.privateVehicle.type)
    this.getCommercialVehicle(this.paramsData, this.commercialVehicle.type)
  }

  selectedPolicyNumberPrivate: any;l
  allPrivateVehicle:any = [];
  getPrivateVehicle(id, type) {
    this.ps.getVehicle(id, type).subscribe( data => {
      this.allPrivateVehicle = data;
    })
  }

  privateVehicleSelected(i) {
      if(typeof this.allPrivateVehicle[i].imt === 'string') {
        this.allPrivateVehicle[i].imt = this.allPrivateVehicle[i].imt.split(",");
      }
      this.privateVehicle = this.allPrivateVehicle[i];
      this.claimDetailsPrivateVehicle = JSON.parse(this.privateVehicle.claimDetailsPrivateVehicle);
  }

  selectedPolicyNumberCommercial: any;
  allCommercialVehicle: any = [];
  getCommercialVehicle(id, type) {
    this.ps.getVehicle(id, type).subscribe( data => {
      this.allCommercialVehicle = data;
    })
  }

  commercialVehicleSelected(i) {
    if(typeof this.allCommercialVehicle[i].imt === "string") {
      this.allCommercialVehicle[i].imt = this.allCommercialVehicle[i].imt.split(",");
    }
    this.commercialVehicle = this.allCommercialVehicle[i]
    this.claimDetailsCommercialVehicle = JSON.parse(this.commercialVehicle.claimDetailsCommercialVehicle);
  }

  addOnCoverages: any = [ "Zero Depth", "Consumable", "Return to invoice", "Engine Protection Cover", "NCB Protector", "Key & Lock Replacement", "Daily Allowance", "Tyre Protector", "Rim Damage Cover", "Loss of Personal Belongings", "External Accessories - Electrical", "External Accessories - Non Electrical", "Other(if any)"] 


  IMT = ["IMT - 7", "IMT - 10", "IMT - 15", "IMT - 16", "IMT - 17", "IMT - 18", "IMT - 22", "IMT - 22A", "IMT - 28", "IMT - 29", "IMT - 40"]
  moreIMTPrivate: any = [];
  moreIMTCommercial: any =[]
  moreIMTPrivateMethod() {
    this.otherIMTPrivate = [];
    for (var i = 0; i < this.privateVehicle.moreIMT; i++) {
      this.otherIMTPrivate.push({ name: '', remark: ''})
    }
  }

  calcTotalIDVPrivate() {
    if(this.privateVehicle.vehicleIdv !== '' && this.privateVehicle.nonElectricalAccessory !== '' && this.privateVehicle.electricalAccessory !== '' && this.privateVehicle.cngKit !== '') {
      this.privateVehicle.totalIdv = parseFloat(this.privateVehicle.vehicleIdv) + parseFloat(this.privateVehicle.nonElectricalAccessory) + parseFloat(this.privateVehicle.electricalAccessory) + parseFloat(this.privateVehicle.cngKit)
    }
  }

  calcTotalIDVCommercial() {
    if(this.commercialVehicle.vehicleIdv !== '' && this.commercialVehicle.nonElectricalAccessory !== '' && this.commercialVehicle.electricalAccessory !== '' && this.commercialVehicle.cngKit !== '') {
      this.commercialVehicle.totalIdv = parseFloat(this.commercialVehicle.vehicleIdv) + parseFloat(this.commercialVehicle.nonElectricalAccessory) + parseFloat(this.commercialVehicle.electricalAccessory) + parseFloat(this.commercialVehicle.cngKit)
    }
  }

  moreIMTCommercialMethod() {
    this.otherIMTCommercial = [];
    for (var i = 0; i < this.commercialVehicle.moreIMT; i++) {
      this.otherIMTCommercial.push({ name: '', remark: ''})
    }
  }

  selectClaimsCommercialVehicle() {
    this.claimDetailsCommercialVehicle = [];
    for (var i = 0; i < this.commercialVehicle.claimTaken; i++) {
      this.claimDetailsCommercialVehicle.push({workshopName: '', dateOfClaim: '', damageOccurred: '', numberOfClaims: '', claimedAmount: '', approvedAmount: ''})
    }
  }

  selectClaimsPrivateVehicle() {
    this.claimDetailsPrivateVehicle = [];
    for (var i = 0; i < parseFloat(this.privateVehicle.claimTaken); i++) {
      this.claimDetailsPrivateVehicle.push({workshopName: '', dateOfClaim: '', damageOccurred: '', numberOfClaims: '', claimedAmount: '', approvedAmount: '', cashlessReimbursement:'', dateOfPayment:'', bankName: '', bankAccountNumber: '', accountHolder: ''})
    }
  }

  policyPackage: any = [];
  policyPackageCommercial: any = [];
  policyPackageOne = [{id: 'oneYearThirdParty', text: '1 year third party'}, { id: 'oneYearComprehensiveOneYearThirdParty', text: '1 year comprehensive + 1 year third party'}, { id: 'oneYearComprehensiveTwoYearThirdParty', text: '1 year comprehensive + 2 years third party'}, { id: 'oneYearComprehensiveThreeYearThirdParty', text: '1 year comprehensive + 3 years third party'}, { id: 'oneYearComprehensiveFiveYearThirdParty', text: '1 year comprehensive + 5 years third party'}];
  policyPackageTwo = [{id: 'twoYearComprehensiveTwoYearThirdParty', text: '2 years comprehensive + 2 years third party'}];
  policyPackageThree = [{ id: 'oneYearComprehensiveThreeYearThirdParty', text: '1 year comprehensive + 3 years third party'}, {id: 'threeYearComprehensiveThreeYearThirdParty', text: '3 years comprehensive + 3 years third party'}];
  policyPackageFive = [{ id: 'oneYearComprehensiveFiveYearThirdParty', text: '1 year comprehensive + 5 years third party'}, {id: 'fiveYearComprehensiveFiveYearThirdParty', text: '5 years comprehensive + 5 years third party'}];

  setPackagePolicy() {
    if(this.privateVehicle.policyPeriod === '1') {
      this.policyPackage = this.policyPackageOne;
    }
    else if(this.privateVehicle.policyPeriod === '2') {
      this.policyPackage = this.policyPackageTwo
    }
    else if(this.privateVehicle.policyPeriod === '3') {
      this.policyPackage = this.policyPackageThree
    }
    else {
      this.policyPackage = this.policyPackageFive
    }
  }

  setPackagePolicyCommercial() {
    if(this.commercialVehicle.policyPeriod === '1') {
      this.policyPackageCommercial = this.policyPackageOne;
    }
    else if(this.commercialVehicle.policyPeriod === '2') {
      this.policyPackageCommercial = this.policyPackageTwo
    }
    else if(this.commercialVehicle.policyPeriod === '3') {
      this.policyPackageCommercial = this.policyPackageThree
    }
    else {
      this.policyPackage = this.policyPackageFive
    }
  }

  calcLastPremiumPayYear() {
    var m: any;
    if(this.privateVehicle.doc !== '' && this.privateVehicle.policyPeriod === '1') {
      var d : any= new Date(this.privateVehicle.doc)
      m = d.setYear(d.getFullYear() + 1)
    }
    else if(this.privateVehicle.doc !== '' && this.privateVehicle.policyPeriod === '2') {
      var d : any= new Date(this.privateVehicle.doc)
      m = d.setYear(d.getFullYear() + 2)
    }
    else if(this.privateVehicle.doc !== '' && this.privateVehicle.policyPeriod === '3') {
      var d : any= new Date(this.privateVehicle.doc)
      m = d.setYear(d.getFullYear() + 1)
    }
    else if(this.privateVehicle.doc !== '' && this.privateVehicle.policyPeriod === '5') {
      var d : any= new Date(this.privateVehicle.doc)
    }
    var lppy = new Date(m)
    this.privateVehicle.lastPremiumPayYear = lppy.getDate() + '/' + (lppy.getMonth() + 1) + '/' + lppy.getFullYear();
  }

  calcLastPremiumPayYearCommercial() {
    var m: any;
    if(this.commercialVehicle.doc !== '' && this.commercialVehicle.policyPeriod === '1') {
      var d : any= new Date(this.commercialVehicle.doc)
      m = d.setYear(d.getFullYear() + 1)
    }
    else if(this.commercialVehicle.doc !== '' && this.commercialVehicle.policyPeriod === '2') {
      var d : any= new Date(this.commercialVehicle.doc)
      m = d.setYear(d.getFullYear() + 2)
    }
    else if(this.commercialVehicle.doc !== '' && this.commercialVehicle.policyPeriod === '3') {
      var d : any= new Date(this.commercialVehicle.doc)
      m = d.setYear(d.getFullYear() + 1)
    }
    else if(this.commercialVehicle.doc !== '' && this.commercialVehicle.policyPeriod === '5') {
      var d : any= new Date(this.commercialVehicle.doc)
    }
    this.commercialVehicle.lastPremiumPayYear = new Date(m)
  }

  uploadDrivingLicensePrivate(event) {
    var dataForm = event.target.files;
    var fileData: FileList;
    fileData = dataForm
    this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
      var response: any = res;
      console.log(res)
      if(response.name === 'all-files') {
        this.ps.allFiles(fileData).subscribe( response => {
          console.log('fileUploaded');
          var files: any = response;
          this.privateVehicle.uploadDrivingLicense = files.result.files.file[0].name;
        })
      }
    }, error => {
      console.log(JSON.parse(error.Body).error)
      if (JSON.parse(error.Body).error.code === 'EEXIST') {
        this.ps.allFiles(fileData).subscribe( response => {
          var result: any = response;
          var files = JSON.parse(result.Body);
          console.log(files)
          console.log('fileUploaded');
          this.privateVehicle.uploadDrivingLicense = files.result.files.file[0].name;
        },err => {
          console.log(err)
        })
      }
    })
  }

  uploadDrivingLicenseCommercial(event) {
    var dataForm = event.target.files;
    var fileData: FileList;
    fileData = dataForm
    this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
      var response: any = res;
      console.log(res)
      if(response.name === 'all-files') {
        this.ps.allFiles(fileData).subscribe( response => {
          console.log('fileUploaded');
          var files: any = response;
          this.commercialVehicle.uploadDrivingLicense = files.result.files.file[0].name;
        })
      }
    }, error => {
      console.log(JSON.parse(error.Body).error)
      if (JSON.parse(error.Body).error.code === 'EEXIST') {
        this.ps.allFiles(fileData).subscribe( response => {
          var result: any = response;
          var files = JSON.parse(result.Body);
          console.log(files)
          console.log('fileUploaded');
          this.commercialVehicle.uploadDrivingLicense = files.result.files.file[0].name;
        },err => {
          console.log(err)
        })
      }
    })
  }

  policyUploadPrivate(event) {
    var dataForm = event.target.files;
    var fileData: FileList;
    fileData = dataForm
    this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
      var response: any = res;
      console.log(res)
      if(response.name === 'all-files') {
        this.ps.allFiles(fileData).subscribe( response => {
          console.log('fileUploaded');
          var files: any = response;
          this.privateVehicle.policyUpload = files.result.files.file[0].name;
        })
      }
    }, error => {
      console.log(JSON.parse(error.Body).error)
      if (JSON.parse(error.Body).error.code === 'EEXIST') {
        this.ps.allFiles(fileData).subscribe( response => {
          var result: any = response;
          var files = JSON.parse(result.Body);
          console.log(files)
          console.log('fileUploaded');
          this.privateVehicle.policyUpload = files.result.files.file[0].name;
        },err => {
          console.log(err)
        })
      }
    })
  }


  privateVehicleSubmit(){
    this.privateVehicle.otherIMTPrivate = this.otherIMTPrivate
    this.privateVehicle.imtRemarkPrivate = this.imtRemarkPrivate
    this.privateVehicle.claimDetailsPrivateVehicle = JSON.stringify(this.claimDetailsPrivateVehicle)
    console.log(this.privateVehicle);
    
    this.ps.addPrivateVehicle(this.privateVehicle,this.paramsData).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", 'Private Vehicle Added');
      this.spinner.hide();
      
    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )
  }

  editPrivateVehicle() {
    this.privateVehicle.otherIMTPrivate = this.otherIMTPrivate
    this.privateVehicle.imtRemarkPrivate = this.imtRemarkPrivate
    this.privateVehicle.claimDetailsPrivateVehicle = JSON.stringify(this.claimDetailsPrivateVehicle)
    console.log(this.privateVehicle);
    
    this.ps.patchVehicleInsurancess(this.privateVehicle.id, this.privateVehicle).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", 'Private Vehicle Added');
      this.spinner.hide();
      
    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )
  }

  editCommercialVehicel() {
    this.commercialVehicle.claimDetailsCommercialVehicle = JSON.stringify(this.claimDetailsCommercialVehicle)
    this.commercialVehicle.imtRemarkCommercial = this.imtRemarkCommercial
    this.commercialVehicle.otherIMTCommercial = this.otherIMTCommercial
    console.log()
    this.spinner.show();
    this.ps.patchHealthInsurances(this.commercialVehicle,this.paramsData).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", 'Commercial Vehicle Added');
      this.spinner.hide();
      
    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )
  }


  commercialVehicleSubmit(){
    this.commercialVehicle.claimDetailsCommercialVehicle = JSON.stringify(this.claimDetailsCommercialVehicle)
    this.commercialVehicle.imtRemarkCommercial = this.imtRemarkCommercial
    this.commercialVehicle.otherIMTCommercial = this.otherIMTCommercial
    console.log()
    this.spinner.show();
    this.ps.addCommercialVehicle(this.commercialVehicle,this.paramsData).subscribe((success) =>{
      console.log(success);
      this.notify.showNotification("success", 'Commercial Vehicle Added');
      this.spinner.hide();
      
    },(err:HttpErrorResponse)=>{
      console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )
    
  }

}
