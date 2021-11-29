import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent  } from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms'
import { DatePipe } from '@angular/common'

@Component({
	selector: 'app-corporate',
	templateUrl: './corporate.component.html',
	styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {

	workmenCompensation :any = {
		type: 'workmenCompensation',
		name:'',
		owner:'',
		address:'',
		commencementDate:'',
		policyNumber:'',
		insurancePeriod:'',
		premium:'',
		industryClassification:'',
		insuredTrade:'',
		projectName:'',
		mainCoverageWc:'',
		extensions:'',
		medicalExtensionCover:'',
		limitOfCover:'',
		policyCover:'',
		estNumEmployees:'',
		employeesOccupation:'',
		estEarnings:'',
		policyValidTill:'',
		claimTaken:'',
		addAmount:'',
		periodOfInsurance: '',
		claimDetails: '',
		claimDetailAmt:'',
		geographicalLimit:'',
		gst:'',
		contactUs:'',
		branchLocator:'',
		claimProcedure:'',
		specialCondition:'',
		gstInvoice:'',
		policyStatus:'',
	}

	groupMediclaim: any = {
		type: 'groupMediclaim',
		name:'',
		owner:'',
		address:'',
		commencementDate:'',
		policyNumber:'',
		insurancePeriod:'',
		premium:'',
		industryClassification:'',
		insuredTrade:'',
		projectName:'',
		employeesNumber:'',
		employeesOccupation:'',
		sumAssuredPerEmployee:'',
		claimsTakenInPy:'',
		claimDetail:'',
		totalClaimedAmountTillDate: '',
		endorsement1:'',
		endorsementDate:'',
		totalPremiumPaid:'',
		totalClaimTaken:'',
		claimRatio:'',
		geographicalLimit:'',
		gst:'',
		gstInvoice:'',
		contactUs:'',
		branchLocator:'',
		claimProcedure:'',
		specialCondition:'',
		policyUpload:'',
		policyStatus:'',
	}

	merchantsCover: any = {
		type: 'merchantsCover',
		name:'',
		owner:'',
		riskLocationAddress:'',
		industryClassification:'',
		insuredTrade:'',
		commencementDate:'',
		policyNumber:'',
		insurancePeriod:'',
		premium:'',
		perilsCovered:'',
		sfspContent:'',
		sumAssured1:'',
		burglary:'',
		sumAssured2:'',
		cashInSafe:'',
		sumAssured3:'',
		cashInTransit:'',
		sumAssured4:'',
		totalSumAssured:'',
		policyValidTill:'',
		hypothecation:'',
		policyWordingForDa:'',
		geographicalLimit:'',
		gst:'',
		gstInvoice:'',
		contactUs:'',
		branchLocator:'',
		claimProcedure:'',
		specialCondition:'',
		policyUpload:'',
		policyStatus:'',
		}

	shopInsurance: any = {
		type: 'shopInsurance',
		name:'',
		owner:'',
		riskLocationAddress:'',
		industryClassification:'',
		insuredTrade:'',
		commencementDate:'',
		policyNumber:'',
		insurancePeriod:'',
		premium:'',
		perilsCovered:'',
		sfspBuilding:'',
		sumAssured1:'',
		sfspContent:'',
		sumAssured2:'',
		furnitureNfixtures:'',
		sumAssured3:'',
		burglary:'',
		sumAssured4:'',
		cashInSafe:'',
		sumAssured5:'',
		cashInTransit:'',
		sumAssured6:'',
		cashInCounter:'',
		sumAssured7:'',
		legalLiability:'',
		sumAssured8:'',
		baggage:'',
		sumAssured9:'',
		personalAccident:'',
		sumAssured10:'',
		firstLoss:'',
		sumAssured11:'',
		electronicEquipments:'',
		electronicEquipmentsNumber:'',
		electronicEquipmentsName:'',
		sumAssured12:'',
		publicLiability:'',
		sumAssured13:'',
		earthquakeStructure:'',
		sumAssured14:'',
		earthquakeContent:'',
		sumAssured15:'',
		totalSumAssured:'',
		policyValidTill:'',
		hypothecation:'',
		policyWordingForDa:'',
		gstNumber:'',
		specialCondition:'',
		policyUpload:'',
		gstInvoice:'',
		policyStatus:'',
		contactUs:'',
		branchLocator:'',
		claimProcedure:'',
	}

	contractorsPlant: any = {
		type: 'contractorsPlant',
		policyNumber:'',
		owner:'',
		commencementDate:'',
		industryClassification:'',
		insuredTrade:'',
		insurancePeriod:'',
		machineType:'',
		itemsDescription:'',
		serialNo:'',
		makeModel:'',
		manufactureYear:'',
		sumAssured1:'',
		otherThanAog:'',
		aogPerils:'',
		hypothecation:'',
		policyValidTill:'',
		floaterCover:'',
		sumAssured2:'',
		burglaryInsurance:'',
		sumAssured3:'',
		sfsp:'',
		sumAssured4:'',
		earthquakeCover:'',
		sumAssured5:'',
		tplCover:'',
		sumAssured6:'',
		escalationCover:'',
		sumAssured7:'',
		ownerSurroundingProperty:'',
		sumAssured8:'',
		debrisRemovalExpenses:'',
		sumAssured9:'',
		geographicalLimit:'',
		thirdPartyLiability:'',
		placeForAttachmentOfProspectus:'',
		contactUs:'',
		branchLocator:'',
		claimProcedure:'',
		specialCondition:'',
		policyUpload:'',
		gstInvoice:'',
		policyStatus:'',
		premium: '',
		sumAssured: '',
		coverageSitutaion: '',
		thirdPartyCoverage: '',
		gst: ''
	}

	standardFire: any = {
		type: 'standardFire',
		serialNo:'',
		owner:'',
		insured:'',
		industryClassification:'',
		insuredTrade:'',
		riskLocation:'',
		occupancy:'',
		details:'',
		companyName:'',
		policyNumber:'',
		sumAssured1:'',
		doc:'',
		premium:'',
		policyPeriod:'',
		renewalDate:'',
		fire:'',
		sumAssured2:'',
		lightning:'',
		sumAssured3:'',
		explosion:'',
		sumAssured4:'',
		aircraftDamage:'',
		sumAssured5:'',
		riot:'',
		earthquakeCover:'',
		sumAssured6:'',
		placeForAttachmentOfProspectus:'',
		gst:'',
		contactUs:'',
		branchLocator:'',
		claimProcedure:'',
		specialCondition:'',
		policyUpload:'',
		gstInvoice:'',
		policyStatus:'',
		coverageAmount: '',
		coverageDescription: '',
		periodOfInsurance: '',
		bankName: '',
		policyValidTill: '',
	}

	marineOpenLandDeclaration: any = {
		type: 'marineOpenLandDeclaration',
		periodOfInsurance: ''
	};
	paramsData: any;
	update: any;
	constructor(
		private spinner: NgxSpinnerService,
		private notify:NotificationService, 
		public as : AuthService,
		public ps : PanelServices,
		public router : Router,
		public activatedRoute : ActivatedRoute,
		public datePipe: DatePipe
		) {
		console.log(this.paramsData);

		this.activatedRoute.queryParams.subscribe((success)=>{
			console.log(success);
			this.paramsData = success.value;
			this.update = success.update
		})
	}

	ngOnInit() {
		this.getWorkmen(this.paramsData, this.workmenCompensation.type)
		this.getMarine(this.paramsData, this.marineOpenLandDeclaration.type)
		this.getShopInsurance(this.paramsData, this.shopInsurance.type)
		this.getContractorsPlant(this.paramsData, this.contractorsPlant.type)
		this.getMerchantCoverPolicy(this.paramsData, this.merchantsCover.type)
		this.getStandardFire(this.paramsData, this.standardFire.type)
		this.getGroupMediclaim(this.paramsData, this.groupMediclaim.type)
	}

	workmenPolicyNumber: string;

	allWorkmenCompensation: any;
	getWorkmen(id, type) {
		this.ps.getCorporate(id, type).subscribe( data => {
			this.allWorkmenCompensation = data;
			console.log(data)
		})
	}

	workmenSelected(i) {
		this.workmenCompensation = this.allWorkmenCompensation[i];
		this.endorsement =JSON.parse(this.allWorkmenCompensation[i].endorsementDetails)
		this.claimDetailsWorkmen = JSON.parse(this.allWorkmenCompensation[i].claimDetails)
	}

	groupMediclaimSelected(i) {
		this.groupMediclaim = this.allGroupMediclaim[i]
		this.endorsementGroupMediclaim = JSON.parse(this.allGroupMediclaim[i].endorsementDetails)
		this.claimDetailsGroupMediclaim = JSON.parse(this.allGroupMediclaim[i].claimDetails)
	}

	merchantSelected(i) {
		this.merchantsCover = this.allMerchantCoverPolicy[i]
		this.endorsementMerchants = JSON.parse(this.allMerchantCoverPolicy[i].endorsementDetails)
		this.claimDetailsMerchant = JSON.parse(this.allMerchantCoverPolicy[i].claimDetails)
	}

	marineSelected(i) {
		this.marineOpenLandDeclaration = this.allMarine[i]
		this.transitDetails = JSON.parse(this.allMarine[i].transits)
	}

	standardFireSelected(i) {
		this.standardFire = this.allStandardFire[i]
	}

	shopInsuranceSelected(i) {
		this.shopInsurance = this.allShopInsurance[i];
		this.endorsementShop = JSON.parse(this.allShopInsurance[i].endorsementDetails)
		this.claimDetailsShop -= JSON.parse(this.allShopInsurance[i].claimDetails)
	}

	contractorsPlantSelected(i) {
		this.contractorsPlant = this.allContractorsPlant[i]
	}



	allMerchantCoverPolicy: any;
	getMerchantCoverPolicy(id, type) {
		this.ps.getCorporate(id, type).subscribe( data => {
			this.allMerchantCoverPolicy = data;
		})
	}

	allShopInsurance: any;
	getShopInsurance(id, type) {
		this.ps.getCorporate(id, type).subscribe( data => {
			this.allShopInsurance = data;
		})
	}

	allMarine: any;
	getMarine(id, type) {
		this.ps.getCorporate(id, type).subscribe( data => {
			this.allMarine = data;
		})
	}

	allContractorsPlant: any;
	getContractorsPlant(id, type) {
		this.ps.getCorporate(id, type).subscribe( data => {
			this.allContractorsPlant = data;
		})
	}

	allStandardFire: any;
	getStandardFire(id, type) {
		this.ps.getCorporate(id, type).subscribe( data => {
			this.allStandardFire = data;
		})
	}

	allGroupMediclaim: any;
	getGroupMediclaim(id, type) {
		this.ps.getCorporate(id, type).subscribe( data => {
			this.allGroupMediclaim = data;
		})
	}


	claimDetailsWorkmen: any = [];
	claimDetailsWorkmenMethod() {
		this.claimDetailsWorkmen = [];
		for (var i = 0; i < this.workmenCompensation.claimTaken; i++) {
			this.claimDetailsWorkmen.push({hospitalName: '', patientName: '', diagnosis: '', clamimedAmount: '', approvedAmount: '', claimDate: '', hospitalizedDaycare: '', numberOfDaysHospitalized: ''})
		}
	}

	endorsement: any = [];
	numberEndorsementWorkmen() {
		this.endorsement = [];
		for (var i = 0; i < this.workmenCompensation.numberOfEndorsement; i++) {
			this.endorsement.push({endorsementType: '', remark: '', premium: ''})
		}
	}

	claimDetailsGroupMediclaim: any = []
	claimTakenGroupMediclaim() {
		this.claimDetailsGroupMediclaim = [];
		for (var i = 0; i < this.groupMediclaim.claimsTaken; i++) {
			this.claimDetailsGroupMediclaim.push({hospitalName: '', patientName: '', diagnosis: '', clamimedAmount: '', approvedAmount: '', claimDate: '', hospitalizedDaycare: '', numberOfDaysHospitalized: ''})
		}
	}

	endorsementGroupMediclaim: any = [];
	numberEndorsementGroupMediclaim() {
		this.endorsementGroupMediclaim = [];
		for (var i = 0; i < this.groupMediclaim.numberOfEndorsement; i++) {
			this.endorsementGroupMediclaim.push({endorsementType: '', remark: '', premium: ''})
		}
	}

	claimDetailsMerchant: any = [];
	claimTakenMerchant() {
		this.claimDetailsMerchant = [];
		for (var i = 0; i < this.merchantsCover.claimsTaken; i++) {
			this.claimDetailsMerchant.push({hospitalName: '', patientName: '', diagnosis: '', clamimedAmount: '', approvedAmount: '', claimDate: '', hospitalizedDaycare: '', numberOfDaysHospitalized: ''})
		}
	}
	endorsementMerchants: any = [];
	numberEndorsementMerchantsCover() {
		this.endorsementMerchants = [];
		for (var i = 0; i < this.merchantsCover.numberOfEndorsement; i++) {
			this.endorsementMerchants.push({endorsementType: '', remark: '', premium: ''})
		}
	}

	claimDetailsShop: any = [];
	claimTakenShop() {
		this.claimDetailsShop = [];
		for (var i = 0; i < this.shopInsurance.claimsTaken; i++) {
			this.claimDetailsShop.push({damageType: '', clamimedAmount: '', approvedAmount: '', damageDate: '', reimbursementDate: ''})
		}
	}
	endorsementShop: any = []
	numberEndorsementShopInsurance() {
		this.endorsementShop = [];
		for (var i = 0; i < this.shopInsurance.numberOfEndorsement; i++) {
			this.endorsementShop.push({endorsementType: '', remark: '', premium: ''})
		}
	}


	addWorkmen() {
		this.workmenCompensation.endorsementDetails = JSON.stringify(this.endorsement)
		this.workmenCompensation.claimDetails = JSON.stringify(this.claimDetailsWorkmen)
		console.log(this.workmenCompensation)
		this.ps.addCorporate(this.workmenCompensation, this.paramsData).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Workmen compensation added") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	editWorkmen() {
		this.workmenCompensation.endorsementDetails = JSON.stringify(this.endorsement)
		this.workmenCompensation.claimDetails = JSON.stringify(this.claimDetailsWorkmen)
		console.log(this.workmenCompensation)
		this.ps.patchCorporate(this.workmenCompensation.id, this.workmenCompensation).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Workmen compensation edited") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}



	addGroupMediclaim() {
		this.groupMediclaim.endorsementDetails = JSON.stringify(this.endorsementGroupMediclaim)
		this.groupMediclaim.claimDetails = JSON.stringify(this.claimDetailsGroupMediclaim)
		console.log(this.groupMediclaim)
		this.ps.addCorporate(this.groupMediclaim, this.paramsData).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Group Mediclaim added") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	editGroupMediclaim() {
		this.groupMediclaim.endorsementDetails = JSON.stringify(this.endorsementGroupMediclaim)
		this.groupMediclaim.claimDetails = JSON.stringify(this.claimDetailsGroupMediclaim)
		console.log(this.groupMediclaim)
		this.ps.patchCorporate(this.groupMediclaim.id, this.groupMediclaim).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Group Mediclaim edited") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	addMerchantCover() {
		this.merchantsCover.endorsementDetails = JSON.stringify(this.endorsementMerchants)
		this.merchantsCover.claimDetails = JSON.stringify(this.claimDetailsMerchant)
		console.log(this.merchantsCover)
		this.ps.addCorporate(this.merchantsCover, this.paramsData).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Merchants Cover Policy added") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})		
	}

	editMerchantCover() {
		this.merchantsCover.endorsementDetails = JSON.stringify(this.endorsementMerchants)
		this.merchantsCover.claimDetails = JSON.stringify(this.claimDetailsMerchant)
		console.log(this.merchantsCover)
		this.ps.patchCorporate(this.merchantsCover.id, this.merchantsCover).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Merchants Cover Policy edited") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})		
	}

	addShopInsurance() {
		this.shopInsurance.endorsementDetails = JSON.stringify(this.endorsementShop)
		this.shopInsurance.claimDetails = JSON.stringify(this.claimDetailsShop)
		console.log(this.shopInsurance)
		this.ps.addCorporate(this.shopInsurance, this.paramsData).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Shop Insurance added") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})		
	}

	editShopInsurance() {
		this.shopInsurance.endorsementDetails = JSON.stringify(this.endorsementShop)
		this.shopInsurance.claimDetails = JSON.stringify(this.claimDetailsShop)
		console.log(this.shopInsurance)
		this.ps.patchCorporate(this.shopInsurance.id, this.shopInsurance).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Shop Insurance edited") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})		
	}

	addMarine(){
		this.marineOpenLandDeclaration.transits = JSON.stringify(this.transitDetails)
		console.log(this.marineOpenLandDeclaration)
		this.ps.addCorporate(this.marineOpenLandDeclaration, this.paramsData).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Marine Open In land Declaration Policy added") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	editMarine(){
		this.marineOpenLandDeclaration.transits = JSON.stringify(this.transitDetails)
		console.log(this.marineOpenLandDeclaration)
		this.ps.patchCorporate(this.marineOpenLandDeclaration.id, this.marineOpenLandDeclaration).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Marine Open In land Declaration Policy edited") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}


	addContractorPlan() {
		console.log(this.marineOpenLandDeclaration)
		this.ps.addCorporate(this.contractorsPlant, this.paramsData).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Contractor's Plant added") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	editContractorPlan() {
		console.log(this.marineOpenLandDeclaration)
		this.ps.patchCorporate(this.contractorsPlant.id, this.contractorsPlant).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Contractor's Plant edited") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	addStandardFire() {
		console.log(this.standardFire)
		this.ps.addCorporate(this.standardFire, this.paramsData).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Standard Fire added") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	editStandardFire() {
		console.log(this.standardFire)
		this.ps.patchCorporate(this.standardFire.id, this.standardFire).subscribe((success) =>{
			console.log(success);
			this.notify.showNotification("success", "Standard Fire edited") //used for success notification
			this.spinner.hide();
		},(err:HttpErrorResponse)=>{
			console.log(err);
			// console.log(err.json().error.message);
			this.notify.errNotification(err); //used for error notification
			this.spinner.hide();
		})
	}

	pdfUpload(event, name, field) {
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
					if(name === 'workmen' && field === 'gst') {
						this.workmenCompensation.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'groupMediclaim' && field === 'gst') {
						this.groupMediclaim.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'groupMediclaim' && field === 'policyUpload') {
						this.groupMediclaim.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'merchantsCover' && field === 'policyWordingDirectAccess') {
						this.merchantsCover.policyWordingDirectAccess = files.result.files.file[0].name;
					}
					else if(name === 'merchantsCover' && field === 'gst') {
						this.merchantsCover.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'shopInsurance' && field === 'policyUpload') {
						this.shopInsurance.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'shopInsurance' && field === 'gst') {
						this.shopInsurance.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'marineOpenLandDeclaration' && field === 'policyUpload') {
						this.marineOpenLandDeclaration.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'contractorsPlant' && field === 'gst') {
						this.contractorsPlant.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'contractorsPlant' && field === 'policyUpload') {
						this.contractorsPlant.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'standardFire' && field === 'policyUpload') {
						this.standardFire.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'standardFire' && field === 'gst') {
						this.standardFire.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'workmen' && field === 'occupation') {
						this.workmenCompensation.occupationAttach = files.result.file[0].name
					}

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
					if(name === 'workmen' && field === 'gst') {
						this.workmenCompensation.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'groupMediclaim' && field === 'gst') {
						this.groupMediclaim.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'groupMediclaim' && field === 'policyUpload') {
						this.groupMediclaim.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'merchantsCover' && field === 'policyWordingDirectAccess') {
						this.merchantsCover.policyWordingDirectAccess = files.result.files.file[0].name;
					}
					else if(name === 'merchantsCover' && field === 'gst') {
						this.merchantsCover.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'shopInsurance' && field === 'policyUpload') {
						this.shopInsurance.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'shopInsurance' && field === 'gst') {
						this.shopInsurance.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'marineOpenLandDeclaration' && field === 'gst') {
						this.marineOpenLandDeclaration.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'marineOpenLandDeclaration' && field === 'policyUpload') {
						this.marineOpenLandDeclaration.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'contractorsPlant' && field === 'gst') {
						this.contractorsPlant.gstInvoice = files.result.files.file[0].name;
					}
					else if(name === 'contractorsPlant' && field === 'policyUpload') {
						this.contractorsPlant.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'standardFire' && field === 'policyUpload') {
						this.standardFire.policyUpload = files.result.files.file[0].name;
					}
					else if(name === 'standardFire' && field === 'gst') {
						this.standardFire.gstInvoice = files.result.files.file[0].name;
					}

					else if(name === 'workmen' && field === 'occupation') {
						this.workmenCompensation.occupationAttach = files.result.file[0].name
					}
					else if(name === 'groupMediclaim' && field === 'occupation') {
						this.groupMediclaim.occupationAttach = files.result.file[0].name
					}
				},err => {
					console.log(err)
				})
			}
		})
	}
	transitDetails: any  = [];
	transitDetailsMarineLand() {
		this.transitDetails = [];
		for (var i = 0; i < this.marineOpenLandDeclaration.noOfTransits; i++) {
			this.transitDetails.push({transitDetails: '', transitDate: '', limit: '', mode: ''})
		}
	}
}
