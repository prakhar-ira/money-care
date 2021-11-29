import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelServices } from 'app/services/panel.services';
import { Subscription } from 'rxjs';
import { AddUserI } from 'app/constants/add-user';

interface successObj  {
  value: string,
  update: string
};


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})


export class ViewProfileComponent implements OnInit, OnDestroy {
 
  user: AddUserI;
  readonly isEdit = true; 
  subscriptions: Subscription = new Subscription();

  constructor(
    private activatedRoute : ActivatedRoute,
    private ps: PanelServices) {
 }

  ngOnInit() { 
   this.subscriptions.add(
    this.activatedRoute
    .queryParams
    .subscribe((success: successObj)=> {
       this.fetchProfileDetails(success.value)
    })
   )
  }

  fetchProfileDetails(id: string) {
    this.subscriptions.add(
      this.ps.
      viewProfile(id)
      .subscribe(user => {
        this.user = user;
      }, e => {
        console.error(e);
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
