import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.services';
import { UsersdataService } from 'app/services/userData.services';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  }
  constructor(private authS: AuthService,
    private userData:UsersdataService,
    private spinner: NgxSpinnerService,
    public router : Router,
    private notify:NotificationService) { 
     
    }

    ngOnInit() {
    
    }

  onLogin(){
    //  console.log(this.loginData);
     this.spinner.show();
    // console.log(this.loginData);
    this.authS.loginPost(this.loginData).subscribe((apiData:any) =>{
      // console.log(apiData);
      this.spinner.hide();
      this.userData.saveUserDataLocal(apiData);
      // console.log(apiData.data);
      this.router.navigate(['/dashboard']);
      
    },(err:HttpErrorResponse)=>{
      // console.log(err);
      // console.log(err.json().error.message);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )
  }

}
