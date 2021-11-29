import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mediclaimWrapper } from 'app/constants/mediclaim-wrapper';
import * as lodash from "lodash";


@Component({
	selector: 'app-health',
	templateUrl: './health.component.html',
	styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
	paramsData
	update: any;
	membersInsured: any = [];
	mediclaimForm: FormGroup;
	mediclaim = mediclaimWrapper;

	private subscriptions: Subscription = new Subscription();


	mediClaim : any =  {
		type: 'mediClaim',
		insuranceType: 'Mediclaim',
		sNo: '',
		individualFamily: '',
		proposer: '',
		company: '',
		plan: '',
		policyNumber: '',
		oldPolicyNumber: '',
		policyPeriod: '',
		ageRange: '',
		occupation: '',
		sumAssured: '',
		membersInsured: '',
		dob: '',
		sex: '',
		relation: '',
		premium: '',
		riskStart: '',
		riskEnd: '',
		noBonusClaim: '',
		bonusClaimInsured: '',
		deductiblesSumInsured: '',
		claimTaken: '',
		claimDetailsHospital: '',
		claimDetailsAmount: '',
		nominee: '',
		healthCheckupWait: '',
		healthCheckupAmount: '',
		healthCheckupLink: '',
		healthCheckupBenefit: '',
		policyYear: '',
		policyStatus: '',
		lastPremiumPayYear: '',
		familyAgeLastPremium: '',
		taxSection: '',
		prePolicyCheckup: '',
		anyLoading: '',
		reasonLoading: '',
		amountLoading: '',
		anyExclusion: '',
		waitPeriodExclusion: '',
		declarationHealthStatus: '',
		declarationDate: '',
		memberName: '',
		diagnosis: '',
		companyAcceptance: '',
		cashlessHospitalLink: '',
		contactUsLink: '',
		branchLocator: '',
		claimProcedure: '',
		purchasedVia: '',
		agentCompanyContact: '',
		riderList: []
	}


	criticalIllness: any = {
		type: 'criticalIllness',
		insuranceType: 'Critical Illness',
		proposer: '',
		company: '',
		sNo: '',
		plan: '',
		policyNumber: '',
		policyPeriod: '',
		sumAssured: '',
		membersInsured: '',
		dob: '',
		sex: '',
		relation: '',
		premium: '',
		riskStart: '',
		riskEnd: '',
		noBonusClaim: '',
		bonusClaimInsured: '',
		deductiblesSumInsured: '',
		healthCheckupBenefit: '',
		healthCheckupAmount: '',
		healthCheckupLink: '',
		individualFamily: '',
		healthCheckupWait: '',
		policyYear: '',
		policyStatus: '',
		taxSection: '',
		prePolicyCheckup: '',
		anyLoading: '',
		reasonAmountLoading: '',
		contactUsLink: '',
		branchLocator: '',
		claimProcedure: '',
	}

	personalAccidental: any = {
		type: 'personalAccidental',
		insuranceType: 'Personal Accidental',
		proposer: '',
		company: '',
		plan: '',
		policyNumber: '',
		policyPeriod: '',
		sumAssured: '',
		membersInsured: '',
		memberName: '',
		companyTwo: '',
		dob: '',
		sex: '',
		relation: '',
		ageRange: '',
		accidentalDeath: '',
		ptd: '',
		ppd: '',
		ttd: '',
		roadAmbulanceCharges: '',
		airAmbulanceCharges: '',
		adventureSports: '',
		loanSecure: '',
		inpadientHospitalisation: '',
		inpadientHospitalisationRestore: '',
		noBonusClaim: '',
		bonusClaimInsured: '',
		cashlessHospitalLink: '',
		riskStart: '',
		riskEnd: '',
		contactUsLink: '',
		branchLocator: '',
		claimProcedure: '',
		policyYear: '',
		policyStatus: '',
		anyLoading: '',
		reasonAmountLoading: '',
	}

	criticalIllnessList = ["Alzheimer’s Disease", "Apallic Syndrome", "Aplastic Anaemia", "Aorta Graft Surgery", "Bacterial Meningitis,Blindness", "Benign Brain Tumor", "Brain Surgery", "Cancer", "Cardiomyopathy", "Creutzfeldt-Jakob Disease (CJD)", "Coma of Specified Severity", "Coronary Artery Bypass Surgery", "Deafness", "Encephalitis", "End Stage Lung Failure", "End Stage Liver Failure", "Goodpasture`s Syndrome", "Heart Valve Replacement", "Kidney Failure requiring Regular Dialysis,Loss of Speech", "Major Head Trauma", "Major organ transplant", "Multiple Sclerosis with Persisting Symptoms", "Myocardinal Infraction (First Heart Attack Of Specific Severity)", "Motor Neuron Disease with Permanent Symptoms", "Multiple System Atrophy", "Progressive Scleroderma", "Permanent Paralysis of Limbs", "Primary (idiopathic) Pulmonary Hypertension", "Primary Pulmonary arterial Hypertension", "Primary Parkinsons disease", "Pulmonary Artery Graft Surgery", "Pneumonectomy", "Systemic Lupus Erythematosis", "Stroke resulting in Permanent Symptoms", "Third Degree Burns"]


	allPersonalAccidentalList = [{ "id": "[CC]", "text": "Cremation Ceremony", "value": "cc" }, { "id": "[PTD]", "text": "Permanent Total Disablement", "value": "ptd" }, { "id": "[PPD]", "text": "Permanent Partial Disablement", "value": "ppd" }, { "id": "[TTD]", "text": "Temporary Total Disablement", "value": "ttd" }, { "id": "[EAC]", "text": "Emergency Road Ambulance Charges", "value": "eac" }, { "id": "[EAB]", "text": "Emergency Air Ambulance Charges", "value": "eab" }, { "id": "[EF]", "text": "Education Fund", "value": "ef" }, { "id": "[FTB]", "text": "Family Transportation", "value": "ftb" }, { "text": "Purchase of Blood", "id": "[PB]", "value": "pb" }, { "text": "Transportation of Imported Medicine", "id": "[IMT]", "value": "imt" }, { "text": "Accidental Hospital Cash", "id": "[AHC]", "value": "ahc" }, { "text": "Accidental Medical Expenses", "id": "", "value": "accidentalMedicalExpenses" }, { "text": "Accidental In-patient Hospitalisation", "id": "[AIH]", "value": "AIH" }, { "text": "Restore Benefit for Accidental In-patient Hospitalisation", "id": "[RSB]", "value": "rsb" }, { "text": "Accidental Out-patient Hospitalisation", "id": "[AOH]", "value": "aoh" }, { "text": "Broken Bones", "id": "[BB]", "value": "bb" }, { "text": "Marriage Expenses for Children", "id": "[MEC]", "value": "mec" }, { "text": "Coma", "id": "[COMA]", "value": "coma" }, { "text": "Carrier", "id": "[CCR]", "value": "ccr" }, { "text": "Modification of Residence/Vehicle", "id": "[MRES]", "value": "mres" }, { "text": "Burns", "id": "[BUR]", "value": "bur" }, { "text": "Elderly Care", "id": "[EDC]", "value": "edc" }, { "text": "Pet Care", "id": "[PTC]", "value": "ptc" }, { "text": "Homemaker Care Allowance", "id": "[HMA]", "value": "hma" }, { "text": "Cost of Prosthetics", "id": "[COP]", "value": "cop" }, { "text": "Education Fund on Disability of Dependent Child", "id": "", "value": "educationFundChild" }, { "text": "Adventure Sport", "id": "[ADS]", "value": "ads" }, { "text": "Head and Spinal Injury", "id": "[HIS]", "value": "his" }, { "text": "Loan Secure", "id": "[LSR]", "value": "lsr" }, { "text": "Multi Member Disability", "id": "", "value": "multiMemberDisability" }, { "text": "Common Carrier Mishap Cover", "id": "", "value": "commonCarrierMishapCover" }, { "text": "Major Diagnosis Tests", "id": "", "value": "majorDiagnosisTests" }, { "text": "Child Education", "id": "", "value": "childEducation" }, { "text": "ACCIDENTAL HOSPITALIZATION EXPENSES", "id": "", "value": "accidentalHospitalizationExpenses" }, { "text": "ADVENTURE SPORTS BENEFIT", "id": "", "value": "adventureSportsBenefit" }, { "text": "AIR AMBULANCE COVER", "id": "", "value": "airAmbulanceCover" }, { "id": "", "text": "CHILDREN EDUCATION BENEFIT", "value": "childrenEducationBenefit" }, { "text": "COMA DUE TO ACCIDENTAL BODILY INJURY", "id": "", "value": "comaBodilyInjury" }, { "id": "", "text": "EMI PAYMENT COVER", "value": "emiPaymentCover" }, { "id": "", "text": "FRACTURE CARE", "value": "fractureCare" }, { "id": "", "text": "HOSPITAL CASH BENEFIT", "value": "hospitalCashBenefit" }, { "id": "", "text": "LOAN PROTECTOR COVER", "value": "loanProtectorCover" }, { "id": "", "text": "LOSS OF INCOME DUE TO DISABILITY FROM ACCIDENT", "value": "lossIncomeDisabilityAccident" }, { "id": "", "text": "ROAD AMBULANCE COVER", "value": "roadAmbulanceCover" }, { "id": "", "text": "TRAVEL EXPENSES BENEFIT", "value": "travelExpensesBenefit" }]

	constructor(
		private spinner: NgxSpinnerService,
		private notify: NotificationService,
		public as: AuthService,
		public ps: PanelServices,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		private readonly _fb: FormBuilder
	) {
		console.log(this.paramsData);

		this.activatedRoute.queryParams.subscribe((success) => {
			console.log(success);
			this.paramsData = success.value;
			this.update = success.update;
		})
	}

	ngOnInit() {
		this.initMembersInsured();
		this.getMediclaim(this.paramsData, this.mediClaim.type);
		this.getCriticalIllnes(this.paramsData, this.criticalIllness.type);
		this.getPersonalAccidental(this.paramsData, this.personalAccidental.type);
	}


	
	allMediclaim: any = [];
	selectedPolicyNumberMedicliaim: any;
	getMediclaim(id, type) {
		this.ps.getHealth(id, 'mediClaim').subscribe(success => {
			this.allMediclaim = success
		})
	}

	mediClaimSelected(i) {
		this.mediClaim = this.allMediclaim[i];
		this.allMenbersInsuredObject = JSON.parse(this.mediClaim.allMembersInsured);
		this.mediClaim.riderList = JSON.parse(this.mediClaim.riderList);
	}

	allCriticalIllness: any = [];
	selectedPolicyNumberCritical: any;
	getCriticalIllnes(id, type) {
		this.ps.getHealth(id, 'criticalIllness').subscribe(data => {
			this.allCriticalIllness = data;
		})
	}

	criticalIllnessSelected(i) {
		this.criticalIllness = this.allCriticalIllness[i]
		this.allMenbersInsuredCriticalObject = JSON.parse(this.mediClaim.allMembersInsured);
	}

	selectedPolicyNumberPersonal: any;
	allPersonalAccidental: any = [];
	getPersonalAccidental(id, type) {
		this.ps.getHealth(id, type).subscribe(data => {
			this.allPersonalAccidental = data;
		})
	}

	personalAccidentalSelected(i) {
		this.personalAccidental = this.allPersonalAccidental[i];
		this.allMemberInsuredObjectPersonalAccidental = JSON.parse(this.personalAccidental.allMembersInsured);
	}

	

	initMembersInsured() {
		for (var i = 1; i <= 10; i++) {
			this.membersInsured.push(i)
		}
	}


	allMenbersInsuredObject: any = []
	getMemberInsuredMediclaim() {
		this.allMenbersInsuredObject = [];
		for (var i = 0; i < this.mediClaim.membersInsured; i++) {
			this.allMenbersInsuredObject.push({ memberName: '', dob: '', sex: '', relation: '', sumAssured: '' })
		}
	}

	allMenbersInsuredCriticalObject: any = []
	getMemberInsuredIllness() {
		this.allMenbersInsuredCriticalObject = [];
		for (var i = 0; i < this.criticalIllness.membersInsured; i++) {
			this.allMenbersInsuredCriticalObject.push({ memberName: '', dob: '', sex: '', relation: '', sumAssured: '' })
		}
	}

	allMemberInsuredObjectPersonalAccidental: any = [];
	getMemberInsuredPersonalAccidental() {
		this.allMemberInsuredObjectPersonalAccidental = [];
		for (var i = 0; i < this.personalAccidental.membersInsured; i++) {
			this.allMemberInsuredObjectPersonalAccidental.push({ memberName: '', dob: '', sex: '', relation: '', sumAssured: '' })
		}
	}

	claimDetailsMediclaim: any = []

	claimDetailsMediclaimMethod() {
		this.claimDetailsMediclaim = [];
		for (var i = 0; i < this.mediClaim.claimTaken; i++) {
			this.claimDetailsMediclaim.push({ hospitalName: '', patientName: '', diagnosis: '', clamimedAmount: '', approvedAmount: '', claimDate: '', hospitalizedDaycare: '', numberOfDaysHospitalized: '' })
		}
	}

	declarationMediclaim: any = [];
	options: any = [{ id: 'covered', text: 'Covered' }, { id: 'notCovered', text: 'Not Covered' }]

	openDeclarationFields() {
		this.declarationMediclaim = [];
		for (var i = 0; i < this.mediClaim.totalDeclaration; i++) {
			this.declarationMediclaim.push({ declarationDate: '', memberName: '', diagnosis: '', companyAccecptance: '' })
		}
	}

	submitMediclaim() {
		this.mediClaim.allMembersInsured = JSON.stringify(this.allMenbersInsuredObject)
		this.mediClaim.declaration = JSON.stringify(this.declarationMediclaim)
		this.mediClaim.riderList = JSON.stringify(this.mediClaim.riderList)
		console.log(this.mediClaim)
		this.ps.submitHealthInsurance(this.mediClaim, this.paramsData).subscribe((success) => {
			console.log(success);
			this.spinner.hide();
			this.notify.showNotification("success", "Insurance Sumbitted");
		}, (err: HttpErrorResponse) => {
			console.log(err);
			this.notify.errNotification(err);
			this.spinner.hide();
		})
	}

	editMediclaim() {
		this.mediClaim.allMembersInsured = JSON.stringify(this.allMenbersInsuredObject)
		this.mediClaim.declaration = JSON.stringify(this.declarationMediclaim)
		this.mediClaim.riderList = JSON.stringify(this.mediClaim.riderList)

		this.ps.patchHealthInsurances(this.mediClaim.id, this.mediClaim).subscribe((success) => {
			console.log(success);
			this.spinner.hide();
			this.notify.showNotification("success", "Insurance Sumbitted");
		}, (err: HttpErrorResponse) => {
			console.log(err);
			this.notify.errNotification(err);
			this.spinner.hide();
		})
	}

	fileToUpload: any;
	policyWordingUploadMedicliam(event) {
		var dataForm = event.target.files;
		this.fileToUpload = dataForm;
		var fileData: FileList;
		fileData = this.fileToUpload
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.mediClaim.policyWording = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.mediClaim.policyWording = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	fileToUploadDl: any;
	drivingLicence(event) {
		var dataForm = event.target.files;
		this.fileToUploadDl = dataForm;
		var fileData: FileList;
		fileData = this.fileToUploadDl
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.mediClaim.drivingLicenceUpload = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.mediClaim.drivingLicenceUpload = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	policyWordingUploadIllness(event) {
		var dataForm = event.target.files;
		var fileData: FileList;
		fileData = dataForm
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.criticalIllness.policyWording = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.criticalIllness.policyWording = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	policyUpload(event) {
		var dataForm = event.target.files;
		this.fileToUpload = dataForm;
		var fileData: FileList;
		fileData = this.fileToUpload
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.criticalIllness.clientPolicy = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.criticalIllness.clientPolicy = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	clientPolicyMedicliam(event) {
		var dataForm = event.target.files;
		this.fileToUpload = dataForm;
		var fileData: FileList;
		fileData = this.fileToUpload
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.mediClaim.clientPolicy = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.mediClaim.clientPolicy = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	policyWordingUploadAccidental(event) {
		var dataForm = event.target.files;
		this.fileToUpload = dataForm;
		var fileData: FileList;
		fileData = this.fileToUpload
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.personalAccidental.policyWording = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.personalAccidental.policyWording = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	accidentalCardUpload(event) {
		var dataForm = event.target.files;
		this.fileToUpload = dataForm;
		var fileData: FileList;
		fileData = this.fileToUpload
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.personalAccidental.accidentalCardUpload = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.personalAccidental.accidentalCardUpload = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	healthCardMedicliam(event) {
		var dataForm = event.target.files;
		this.fileToUpload = dataForm;
		var fileData: FileList;
		fileData = this.fileToUpload
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.mediClaim.healthCard = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.mediClaim.healthCard = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}


	waitingPeriodUpload(event) {
		var dataForm = event.target.files;
		var fileData: FileList;
		fileData = dataForm;
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.mediClaim.waitingPeriodUpload = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.mediClaim.waitingPeriodUpload = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	policyUploadAccidental(event) {
		var dataForm = event.target.files;
		this.fileToUpload = dataForm;
		var fileData: FileList;
		fileData = this.fileToUpload
		this.ps.createProfileUpDir({ "name": "all-files" }).subscribe(res => {
			var response: any = res;
			console.log(res)
			if (response.name === 'all-files') {
				this.ps.allFiles(fileData).subscribe(response => {
					console.log('fileUploaded');
					var files: any = response;
					this.personalAccidental.policyUpload = files.result.files.file[0].name;
				})
			}
		}, error => {
			console.log(JSON.parse(error.Body).error)
			if (JSON.parse(error.Body).error.code === 'EEXIST') {
				this.ps.allFiles(fileData).subscribe(response => {
					var result: any = response;
					var files = JSON.parse(result.Body);
					console.log(files)
					console.log('fileUploaded');
					this.personalAccidental.policyUpload = files.result.files.file[0].name;
				}, err => {
					console.log(err)
				})
			}
		})
	}

	submitCriticalIllness() {
		this.criticalIllness.claimDetailsMediclaim = JSON.stringify(this.claimDetailsMediclaim)
		this.criticalIllness.allMembersInsured = JSON.stringify(this.allMenbersInsuredCriticalObject);
		console.log(this.criticalIllness)
		this.ps.submitHealthInsurance(this.criticalIllness, this.paramsData).subscribe((success) => {
			console.log(success);
			this.spinner.hide();
			this.notify.showNotification("success", "Insurance Sumbitted");
		}, (err: HttpErrorResponse) => {
			console.log(err);
			this.notify.errNotification(err);
			this.spinner.hide();
		})
	}

	editCriticalIllness() {
		this.criticalIllness.claimDetailsMediclaim = JSON.stringify(this.claimDetailsMediclaim)
		this.criticalIllness.allMembersInsured = JSON.stringify(this.allMenbersInsuredCriticalObject);

		console.log(this.criticalIllness)
		this.ps.patchHealthInsurances(this.criticalIllness.id, this.criticalIllness).subscribe((success) => {
			console.log(success);
			this.spinner.hide();
			this.notify.showNotification("success", "Insurance Sumbitted");
		}, (err: HttpErrorResponse) => {
			console.log(err);
			this.notify.errNotification(err);
			this.spinner.hide();
		})
	}

	submitPersonalAccidental() {
		this.personalAccidental.allMembersInsured = JSON.stringify(this.allMemberInsuredObjectPersonalAccidental)
		console.log(this.personalAccidental)
		this.ps.submitHealthInsurance(this.personalAccidental, this.paramsData).subscribe((success) => {
			console.log(success);
			this.spinner.hide();
			this.notify.showNotification("success", "Insurance Sumbitted");
		}, (err: HttpErrorResponse) => {
			console.log(err);
			this.notify.errNotification(err);
			this.spinner.hide();
		})
	}

	editPersonalAccidental() {
		this.personalAccidental.allMembersInsured = JSON.stringify(this.allMemberInsuredObjectPersonalAccidental)
		console.log(this.personalAccidental)
		this.ps.patchHealthInsurances(this.personalAccidental.id, this.personalAccidental).subscribe((success) => {
			console.log(success);
			this.spinner.hide();
			this.notify.showNotification("success", "Insurance Sumbitted");
		}, (err: HttpErrorResponse) => {
			console.log(err);
			this.notify.errNotification(err);
			this.spinner.hide();
		})
	}

}
