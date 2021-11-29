import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { URLS } from "./url.services";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: Http) { }

  userlogin
  loginPost(data) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({ headers: headers });
    let params = new URLSearchParams();
   
    params.append('email', data.email);
    params.append('password', data.password);

    return this.http.post(`${URLS.baseUrl}/UserAccounts/login`, params, options)
      .pipe(
        map(res => res.json())
    );
  }
}
