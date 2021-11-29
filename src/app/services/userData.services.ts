import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UsersdataService {
	userData: User = {};
	constructor(

	) {
		this.getUserData();
	}


	saveUserDataLocal(data) {
		if (data) {
			let str = JSON.stringify(data);
			localStorage.setItem('moneyCare', str);
			this.getUserData();
			// console.log(this.userData.api_token+"hello Save user");
		}
	}

	//
	logout() {

		this.userData = {};
		localStorage.removeItem('moneyCare');

	}

	getUserData() {
		let data = localStorage.getItem('moneyCare');
		if (data) {
			let obj = JSON.parse(data);
			this.userData = obj;
			return obj;
		} else {
			return {};
		}
	}
}
export interface User {
	id?: string,
	created?: string,
	ttl?: string,
	userId?: string,
	[key: string]: any;
}