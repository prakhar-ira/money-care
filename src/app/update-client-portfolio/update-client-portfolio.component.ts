import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/services/notification.services';
import { AuthService } from 'app/services/auth.services';
import { PanelServices } from 'app/services/panel.services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-update-client-portfolio',
  templateUrl: './update-client-portfolio.component.html',
  styleUrls: ['./update-client-portfolio.component.scss']
})
export class UpdateClientPortfolioComponent implements OnInit {
  userList = [];
  constructor(private spinner: NgxSpinnerService,
    private notify: NotificationService,
    public as: AuthService,
    public ps: PanelServices,
    public router: Router) {
    this.getUser();
  }

  ngOnInit() {
  }


  getUser() {
    this.spinner.show();
    this.ps.getuser().subscribe((success) => {
      //  console.log(success);
      this.userList = success;
      this.spinner.hide();
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.notify.errNotification(err);
      this.spinner.hide();
    }
    )
  }

  goToSelectTab(id) {
    this.router.navigate(['/select-tab'], {
      queryParams: {
        value: id,
        update: "false",
      }
    });

  }

  goToPage(pageName, id) {
    console.log('pageName');
    console.log(pageName);
    this.router.navigate([pageName], {
      queryParams: {
        value: id,
        update: "true",
      }
    });

  }



  goToViewProfile(id) {
    this.router.navigate(['/view-profile'], {
      queryParams: {
        value: id,
        update: "true",
      }
    })
  }

}
