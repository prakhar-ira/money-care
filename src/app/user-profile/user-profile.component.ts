import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddNotificationComponent } from '../dialogs/add-notification/add-notification.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  addNew() {
    // Opens dialog for adding notification
    this.matDialog.open(AddNotificationComponent, {
      width: "500px",
      height: "500px",
      autoFocus: false,
      panelClass: 'no-padding',
    })
  }

}
