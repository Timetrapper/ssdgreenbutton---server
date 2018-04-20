import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/token/authenticate', { email: email, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                console.log("NOT YET");
                if (user && user.token && user.role == "member") {
                    console.log("GOT TOKEN");
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('role', 'member');
                } else if (user && user.token && user.role == "admin") {
                    console.log("GOT TOKEN");
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('role', 'admin');
                } 

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}