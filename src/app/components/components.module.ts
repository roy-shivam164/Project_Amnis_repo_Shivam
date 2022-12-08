import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { QueryBuilderScreenComponent } from "./query-builder-screen/query-builder-screen.component";
import { QueryHistoryComponent } from "./query-history/query-history.component";
import { QueryResultDialogComponent } from "./query-result-dialog/query-result-dialog.component";
import { SaveQueryDialogComponent } from "./save-query-dialog/save-query-dialog.component";
import { FormComponent } from "./form/form.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { CampaignBuilderComponent } from './campaign-builder/campaign-builder.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, CampaignBuilderComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class ComponentsModule {}
