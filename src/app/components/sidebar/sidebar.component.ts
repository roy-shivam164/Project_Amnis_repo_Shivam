import { Component, OnInit } from "@angular/core";

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
    path: "/icons",
    title: "Analytics",
    icon: "signal_cellular_alt",
    class: "",
  },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  {
    path: "/signout",
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

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
