import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";

import { FormComponent } from "app/components/form/form.component";
import { CampaignBuilderComponent } from "app/components/campaign-builder/campaign-builder.component";
import { QueryBuilderScreenComponent } from "app/components/query-builder-screen/query-builder-screen.component";
import { LoginComponent } from "app/components/login/login.component";
import { AnalyticsComponent } from "app/components/analytics/analytics.component";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: "dashboard", component: DashboardComponent },
  { path: "querybuilder", component: QueryBuilderScreenComponent },
  { path: "scheduler", component: FormComponent },
  { path: "campaignbuilder", component: CampaignBuilderComponent },
  { path: "analytics", component: AnalyticsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  { path: "signout", component: LoginComponent },
];
