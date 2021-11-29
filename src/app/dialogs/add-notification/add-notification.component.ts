import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
	selector: 'app-add-notification',
	templateUrl: './add-notification.component.html',
	styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
	notification = {
		username: '',
		title: '',
		date: '',
		time: '',
		status: 'sheduled'
	}
	constructor(public matDialogRef: MatDialogRef<AddNotificationComponent>) { }

	ngOnInit() {
	}

	add() {
		console.log(this.notification)
		this.matDialogRef.close(this.notification)
	}

}
