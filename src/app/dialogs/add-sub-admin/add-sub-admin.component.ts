import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
	selector: 'app-add-sub-admin',
	templateUrl: './add-sub-admin.component.html',
	styleUrls: ['./add-sub-admin.component.scss']
})
export class AddSubAdminComponent implements OnInit {
	admin = {
		username: '',
		role: '',
		email: '',
		phone: '',
		password: '',
		status: 'pending'
	}


	roles = [{id: "admin", text: "Admin"}, { id: "subAdmin", text: "Sub Admin"}]
	constructor(
		private spinner: NgxSpinnerService,
		private notify:NotificationService,
		public as : AuthService,
		public ps : PanelServices,
		public router : Router,
		public activatedRoute : ActivatedRoute,
		public matDialogRef: MatDialogRef<AddSubAdminComponent>
		)  { }

	ngOnInit() {
	}

	add() {
		//ADD ADMIN OR SUB-ADMIN
		if(this.admin.username !== '' && this.admin.role !== '' && this.admin.email !== '' && this.admin.phone !== '') {
			console.log(this.admin)
			this.spinner.show();
			this.ps.addAdmin(this.admin).subscribe((success) =>{
				this.matDialogRef.close('ADMIN ADDED')
				console.log(success);
				this.notify.showNotification("Added!", "Succuess") //used for success notification
				this.spinner.hide();
			},(err:HttpErrorResponse)=>{
				console.log(err);
				this.matDialogRef.close('FAILED')
				// console.log(err.json().error.message);
				this.notify.errNotification(err); //used for error notification
				this.spinner.hide();
			}
			)
		}
	}

}
