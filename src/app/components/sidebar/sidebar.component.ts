import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, RouterLink } from "@angular/router";
import { Observable } from "rxjs";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { LoginRequestService } from "app/services/login-request.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  {
    path: "/querybuilder",
    title: "Query Builder",
    icon: "table_chart",
    class: "",
  },
  { path: "/scheduler", title: "Scheduler", icon: "schedule", class: "" },
  {
    path: "/campaignbuilder",
    title: "Campaign Builder",
    icon: "assignment",
    class: "",
  },
  {
    path: "/analytics",
    title: "Analytics",
    icon: "signal_cellular_alt",
    class: "",
  },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  {
    path: "/login",
    title: "Sign out",
    icon: "logout",
    class: "active-pro",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  title: string = "Sign out";
  // isLogout:boolean=false;

  constructor(private router: Router, private loginUser: LoginRequestService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if (!this.loginUser.isLoggedIn()) {
      this.logout();
      // call logout method/dispatch logout event
    }
  }

  callFunc(title: string) {
    if (this.title == title) {
      console.log(title);

      this.logout();
    }
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    console.log("logout called");

    this.router.navigate(["login"]);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
