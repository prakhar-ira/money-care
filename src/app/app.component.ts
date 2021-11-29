import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UsersdataService } from './services/userData.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router : Router,
              public userService : UsersdataService
            ){
    this.router.navigate(['login']);

    if(!this.userService.userData.id){
      this.router.navigate(['login']);
    }
    else{
      this.router.navigate(['dashboard']);
    }
  }

}
