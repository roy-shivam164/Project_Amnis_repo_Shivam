import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginRequestService {
  clearTimeout: any;
  loggedInStatus: any;
  regenerateResult: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  setAuthToken(token: string): void {
    localStorage.setItem("authToken", token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem("refreshToken", token);
  }

  removeAuthToken(): void {
    localStorage.removeItem("authToken");
  }

  removeRefreshToken(): void {
    localStorage.removeItem("refreshToken");
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    console.log("logout called");

    this.router.navigate(["login"]);
  }

  getStatus(accessToken: string): Observable<any> {
    let status = this.http.post(
      "https://igcnx-amnis-dev.azurewebsites.net/isValid",

      null,

      { headers: { Authorization: "Bearer " + accessToken } }
    );
    return status;
  }

  // isLoggedIn() {
  //   //return false;
  //   return this.getAuthToken() !== null;
  //   // let accessToken = this.getToken();
  //   // this.getStatus(accessToken).subscribe((result)=>{
  //   //   console.log(result);
  //   //   if(result==true){
  //   //     return true;
  //   //   }
  //   //   else{
  //   //     return false;
  //   //   }

  //   // });
  //   // return true;

  // }

  isLoggedIn() {
    console.log("isLoggedIn is called");
    //return false;
    //return this.getToken() !== null;
    let accessToken = this.getAuthToken();
    // return this.getStatus(accessToken).subscribe((result)=>{
    //   console.log(result);
    //   if(result==true){
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }

    // });

    return this.getStatus(accessToken).pipe(
      map((data) => {
        if (data["isValid"] == true) {
          return true;
        } else {
        }
      })
    );
    //return true;
  }

  isTokenExpired() {
    let isToken = localStorage.getItem("authToken");
    const expiry = JSON.parse(atob(isToken.split(".")[1])).exp;
    console.log(expiry * 1000);
    let expirationTime = expiry * 1000 - Date.now();
    console.log(expirationTime);
    return !(expiry * 1000 > Date.now());
  }

  regenerateToken(refreshToken: string): Observable<any> {
    let regeneratedToken = this.http.post(
      "https://igcnx-amnis-dev.azurewebsites.net/newToken",
      null,
      { headers: { Authorization: "Bearer " + refreshToken } }
    );
    return regeneratedToken;
  }

  sessionTimeOut() {
    console.log("Session Time Out is called");
    let isToken = localStorage.getItem("authToken");
    console.log(isToken);
    const expiry = JSON.parse(atob(isToken.split(".")[1])).exp;
    let expirationTime = expiry * 1000 - Date.now() - 22232;
    console.log(expirationTime);
    let currentRfToken = this.getRefreshToken();
    this.clearTimeout = setInterval(() => {
      //this.logout();
      this.regenerateToken(currentRfToken).subscribe((result) => {
        console.log(result);
        this.regenerateResult = result["isValid"];

        if (this.regenerateResult == true) {
          this.removeAuthToken();
          this.setAuthToken(result["authToken"]);
        } else {
          this.logout();
        }
      });
    }, 600000);
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['login']);
  // }

  authUsers(data: string): Observable<any> {
    let dataRecieved = this.http.post(
      "https://igcnx-amnis-dev.azurewebsites.net/login",

      null,

      { headers: { Authorization: "Basic " + data } }
    );

    // if(dataRecieved['isValid']== true){
    //    this.setToken(dataRecieved['token']);
    //    return dataRecieved;
    // }
    // else{
    //   return throwError(new Error('Failed to login'));
    // }

    //console.log(dataRecieved);
    return dataRecieved;
  }
}
