import { Component, OnInit } from '@angular/core';
import { UsersdataService } from 'app/services/userData.services';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/add-new-user', title: 'Add New User',  icon: 'person', class: '' },
    { path: '/update-client-portfolio', title: 'Update Client Portfolio',  icon: 'dashboard', class: '' },
    // { path: '/table-list', title: 'User List',  icon:'content_paste', class: '' },
    { path: '/user-profile', title: 'Notification',  icon:'person', class: '' },
    // { path: '/typography', title: 'Database',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Testimonials',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Sub Admin',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Nominee',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor( public userDataServices: UsersdataService,
               public router : Router,
               ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

 

  logout(){
    console.log('logout');
    this.userDataServices.logout();
    this.router.navigate(['login']);
  }
}
