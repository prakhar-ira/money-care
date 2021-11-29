import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { UsersdataService } from './services/userData.services';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
 constructor(
  public userService:UsersdataService,
  public router : Router
 ){
   
 }
  canActivate() {
    // console.log('i am checking to see if you are logged in');
    //  console.log(this.userService.userData.api_token,'userData');
    
    return this.userService.userData.id? true : false;
    // return true;
  }

  canActivateChild() {
    // console.log('checking child route access');
    // return false;
    return this.userService.userData.id? false : true;
  }

} 