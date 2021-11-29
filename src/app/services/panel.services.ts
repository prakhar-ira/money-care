import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { URLS } from "./url.services";
import { map } from 'rxjs/operators';
import { AuthService } from './auth.services';
import { UsersdataService } from './userData.services';
import { AddUserI } from 'app/constants/add-user';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { TermI } from 'app/constants/term';
@Injectable({
	providedIn: 'root'
})
export class PanelServices {
	constructor(
		private http: Http,
		private _http: HttpClient,	
		public userDataService: UsersdataService) { }

	addUser(reqBody: AddUserI) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		const params = new HttpParams();
		params.append('access_token', `${this.userDataService.userData.id}`)
		
		return this._http.post(`${URLS.baseUrl}/UserAccounts`, reqBody,
		{ 
			params,
			headers	
		})
	}

	patchUserbyId(reqBody: AddUserI) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});
		
		return this._http.patch(`${URLS.baseUrl}/UserAccounts/${reqBody.id}?access_token=${this.userDataService.userData.id}`, reqBody,
		{ 
			headers
		})
	}

	uploadPhoto(image: Array<File>) {
		const formData = new FormData();
    	formData.append('file', image[0]);
		
		return this._http.post(`${URLS.baseUrl}/Uploads/moneycare-files/upload?access_token=${this.userDataService.userData.id}`, formData)
	}

	downloadImageUrl(imageName: string) {
		return `${URLS.baseUrl}/Uploads/moneycare-files/download/${imageName}?access_token=${this.userDataService.userData.id}`
	}


	getuser() {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		return this.http.get(`${URLS.baseUrl}/UserAccounts?access_token=${this.userDataService.userData.id}&filter={"order":"createdAt DESC"}`, options).pipe(
			map(res => res.json())
		);
	}

	viewProfile(id) {

		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});

		let options = new RequestOptions({ headers: headers });

		return this.http.get(`${URLS.baseUrl}/UserAccounts/${id}?access_token=${this.userDataService.userData.id}`, options).pipe(
			map(res => res.json())
		)


	}

	getBanks(data) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		return this.http.get(`${URLS.baseUrl}/Banks?filter={"where":{"name":{"like":"${data}","options":"i"}}}&${this.userDataService.userData.id}`, options).pipe(
			map(res => res.json())
		);

	}


	getFamilyName(value, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();

		params.append('userId', id);
		params.append('name', value);



		return this.http.post(`${URLS.baseUrl}/UserAccounts/familyName?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);


	}


	addBond(data, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		params.append('firstHolder', data.firstHolder);
		params.append('minorMajor', data.minorMajor);
		params.append('secondHolder', data.secondHolder);
		params.append('accountType', data.accountType);
		params.append('companyName', data.companyName);
		params.append('schemeName', data.schemeName);
		params.append('guaranteed', data.guaranteed);
		params.append('folioNo', data.folioNo);
		params.append('certification', data.certification);
		params.append('distinctive', data.distinctive);
		params.append('unitNumber', data.unitNumber);
		params.append('unssuance', data.unssuance);
		params.append('term', data.term);
		params.append('payingTerm', data.payingTerm);
		params.append('payingTerm', data.payingTerm);
		params.append('maturityDate', data.maturityDate);
		params.append('tenureInvestment', data.tenureInvestment);
		params.append('maturityValue', data.maturityValue);
		params.append('nomineeName', data.nomineeName);
		params.append('taxBenefits', data.taxBenefits);
		params.append('maturity', data.maturity);
		params.append('returnRate', data.returnRate);
		params.append('payoutMode', data.payoutMode);
		params.append('backAmount', data.backAmount);

		params.append('place', data.place);
		params.append('status', data.status);
		params.append('lastPayYear', data.lastPayYear);
		params.append('familyAgePayYear', data.familyAgePayYear);
		params.append('familyAgeEndTerm', data.familyAgeEndTerm);
		params.append('financialYearOnPurchase', data.financialYearOnPurchase);

		params.append('currentFinancialYear', data.currentFinancialYear);
		params.append('contactLink', data.contactLink);
		params.append('branchLocator', data.branchLocator);

		params.append('surrenderAmount', data.surrenderAmount);



		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/bonds?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);

	}


	addFixed(data, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		params.append('firstHolder', data.firstHolder);
		params.append('minorMajor', data.minorMajor);
		params.append('secondHolder', data.secondHolder);
		params.append('nameBank', data.nameBank);
		params.append('schemeName', data.schemeName);
		params.append('guaranteed', data.guaranteed);
		params.append('folioNum', data.folioNum);
		params.append('issuance', data.issuance);
		params.append('maturityDate', data.maturityDate);
		params.append('amountDeposit', data.amountDeposit);
		params.append('maturityValue', data.maturityValue);
		params.append('term', data.term);
		params.append('payingTerm', data.payingTerm);
		params.append('paymentMode', data.paymentMode);
		params.append('tenureInvestment', data.tenureInvestment);
		params.append('payoutMode', data.payoutMode);
		params.append('nomineeName', data.nomineeName);
		params.append('taxBenefits', data.taxBenefits);
		params.append('backAmount', data.backAmount);
		params.append('maturityValue', data.maturityValue);
		params.append('nomineeName', data.nomineeName);
		params.append('taxBenefits', data.taxBenefits);
		params.append('maturity', data.maturity);
		params.append('bankAddress', data.bankAddress);

		params.append('status', data.status);
		params.append('surrenderAmount', data.surrenderAmount);
		params.append('lastPayYear', data.lastPayYear);
		params.append('familyAgePayYear', data.familyAgePayYear);
		params.append('familyAgeEndTerm', data.familyAgeEndTerm);
		params.append('financialYearOnPurchase', data.financialYearOnPurchase);

		params.append('currentFinancialYear', data.currentFinancialYear);
		params.append('contactLink', data.contactLink);
		params.append('branchLocator', data.branchLocator);
		params.append('returnRate', data.returnRate);



		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/fixedDeposits?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);

	}


	addScheme(data, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		params.append('firstHolder', data.firstHolder);
		params.append('minorMajor', data.minorMajor);
		params.append('secondHolder', data.secondHolder);
		params.append('accountType', data.accountType);
		params.append('postOffice', data.postOffice);
		params.append('schemeName', data.schemeName);
		params.append('guaranteed', data.guaranteed);
		params.append('folioNum', data.folioNum);
		params.append('certification', data.certification);
		params.append('distinctive', data.distinctive);
		params.append('unitNumber', data.unitNumber);
		params.append('issuance', data.issuance);
		params.append('term', data.term);
		params.append('payingTerm', data.payingTerm);
		params.append('paymnetMode', data.paymnetMode);
		params.append('maturityDate', data.maturityDate);
		params.append('tenureInvestment', data.tenureInvestment);
		params.append('maturityValue', data.maturityValue);
		params.append('nomineeName', data.nomineeName);
		params.append('taxBenefits', data.taxBenefits);
		params.append('maturity', data.maturity);
		params.append('returnRate', data.returnRate);
		params.append('payoutMode', data.payoutMode);
		params.append('backAmount', data.backAmount);

		params.append('place', data.place);
		params.append('status', data.status);
		params.append('lastPayYear', data.lastPayYear);
		params.append('familyAgePayYear', data.familyAgePayYear);
		params.append('familyAgeEndTerm', data.familyAgeEndTerm);
		params.append('financialYearOnPurchase', data.financialYearOnPurchase);

		params.append('currentFinancialYear', data.currentFinancialYear);
		params.append('contactLink', data.contactLink);
		params.append('branchLocator', data.branchLocator);
		params.append('surrenderAmount', data.surrenderAmount);



		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/govtSchemes?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);

	}



	addMutualFund(data, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})


		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/mutualFunds?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);

	}


	addLifeInsurance(reqBody, id) {

		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this._http.post(`${URLS.baseUrl}/UserAccounts/${id}/lifeInsurances?access_token=${this.userDataService.userData.id}`, reqBody,
		{ 
			headers	
		});

	}

	addCorporate(data: any, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/corporateInsurances?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);
	}

	submitHealthInsurance(data: any, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/healthInsurances?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);
	}

	addAdmin(data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		return this.http.post(`${URLS.baseUrl}/UserAccounts/?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);
	}


	getAdmin() {
		return this.http.get('${URLS.baseUrl}/UserAccounts/?access_token=${this.userDataService.userData.id}`')
	}

	addEquity(data, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})

		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/equity?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);

	}



	addPrivateVehicle(data, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})

		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/vehicleInsurances?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);

	}



	addCommercialVehicle(data, id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'

		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})


		return this.http.post(`${URLS.baseUrl}/UserAccounts/${id}/vehicleInsurances?access_token=${this.userDataService.userData.id}`, params, options)
			.pipe(
				map(res => res.json())
			);

	}

	createProfileUpDir(postItem: any) {
		return this.http.post(`${URLS.baseUrl}/Uploads?access_token=${this.userDataService.userData.id}`, postItem)
	}

	allFiles(files: FileList) {
		var formData = new FormData();
		Array.from(files).forEach(f => formData.append('file', f))
		return this.http.post(`${URLS.baseUrl}/Uploads/all-files/upload?access_token=${this.userDataService.userData.id}`, formData)
	}

	addUserPhoto(files: FileList) {
		var formData = new FormData();
		Array.from(files).forEach(f => formData.append('file', f))
		return this.http.post(`${URLS.baseUrl}/Uploads/photos/upload?access_token=${this.userDataService.userData.id}`, formData)
	}

	fileUpload(files: FileList) {
		let headers = new Headers({
			'Content-Type': 'multipart/form-data'

		});
		headers.append('Accept', 'application/json');
		let options = new RequestOptions({ headers: headers });
		var formData = new FormData();
		Array.from(files).forEach(f => formData.append('file', f))
		return this.http.post(`${URLS.baseUrl}/Uploads/statement-upload/upload?access_token=${this.userDataService.userData.id}`, formData)
	}

	getLifeInsurancePolicyNumbers(id, purpose) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/LifeInsurances?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + ', "tab": ' + JSON.stringify(purpose) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}

	getMutualFunds(id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/MutualFunds?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}

	getShares(id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/Equities?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}

	getHealth(id, type) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/HealthInsurances?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + ', "type": ' + JSON.stringify(type) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}



	getVehicle(id, type) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/VehicleInsurances?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + ', "type": ' + JSON.stringify(type) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}

	getCorporate(id, type) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/CorporateInsurances?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + ', "type": ' + JSON.stringify(type) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}

	patchCorporate(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/CorporateInsurances/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	patchLifeInsurance(id, reqBody) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		console.log(reqBody);
		
		const url = URLS.baseUrl + '/LifeInsurances/' + reqBody.id;
		
		delete reqBody.id;
		
		return this._http.patch(url, reqBody, { headers });
	}

	patchMutualFund(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/MutualFunds/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	patchEquity(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/Equities/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	patchHealthInsurances(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
				params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/HealthInsurances/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	patchVehicleInsurancess(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/VehicleInsurances/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	patchGovtScheme(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/GovtSchemes/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	patchBonds(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/Bonds/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	patchFixedDeposits(id, data: any) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({ headers: headers });
		let params = new URLSearchParams();
		Object.keys(data).forEach(element => {
			params.append(element, data[element])
		})
		var url = URLS.baseUrl + '/FixedDeposits/' + id;
		return this.http.patch(url, params, options).pipe(map(res => res.json()))
	}

	getGovtScheme(id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/GovtSchemes?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}

	getFixedDeposits(id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/FixedDeposits?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}


	getBonds(id) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		let options = new RequestOptions({ headers: headers });
		var url = URLS.baseUrl + '/Bonds?filter={ "where": { "userAccountId": ' + JSON.stringify(id) + '}}' + '&access_token=' + JSON.stringify(this.userDataService.userData.id)
		return this.http.get(url, options).pipe(map(res => res.json()))
	}

}

// export interface FILERESPONSE {
//   result: {
//     fields: {},
//     files: {
//       file: [
//         {
//           container: string;
//           field: string;
//           name: string;
//           originalFilename: string;
//           size: number;
//           type: string;
//         }
//       ]
//     }
//   }
// }
export var convertDateUTC = (date) => {
	if (date) {
		date = new Date(date);
		var nowUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
			date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
		return new Date(nowUtc).toISOString();
	}
}
