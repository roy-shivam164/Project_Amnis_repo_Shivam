import { Injectable, Inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { LoginRequestService } from "app/services/login-request.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginComponent } from "app/components/login/login.component";

@Injectable({
  providedIn: "root",
})

//@Inject(LoginComponent) private parent: LoginComponent
export class AuthGuard implements CanActivate {
  constructor(private loginUser: LoginRequestService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.loginUser.isLoggedIn().pipe(delay(2000))) {
      this.router.navigate(["/login"]);
    }
    return this.loginUser.isLoggedIn().pipe(delay(2000));
    //return false;
  }
  //  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // return false;
}
