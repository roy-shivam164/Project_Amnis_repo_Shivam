import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { KeysPipe } from "./services/keys.pipe";
import { SqlFormatPipe } from "./pipes/sql-format.pipe";

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { QueryBuilderModule } from "angular2-query-builder";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";

import { DbService } from "./services/db.service";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { InterceptorService } from "./services/interceptor.service";

import {
  matTooltipAnimations,
  MatTooltipModule,
} from "@angular/material/tooltip";
import { QueryBuilderCustomComponent } from "./components/query-builder-custom/query-builder-custom.component";
import { MatIconModule } from "@angular/material/icon";
import { ToastrModule } from "ngx-toastr";
import { QueryHistoryComponent } from "./components/query-history/query-history.component";
import { NgxPaginationModule } from "ngx-pagination";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { QueryResultDialogComponent } from "./components/query-result-dialog/query-result-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";

import { QueryBuilderScreenComponent } from "./components/query-builder-screen/query-builder-screen.component";
import { FormComponent } from "./components/form/form.component";
import { SaveQueryDialogComponent } from "./components/save-query-dialog/save-query-dialog.component";
import { MatRadioModule } from "@angular/material/radio";
import { DeleteDialogComponent } from "./components/delete-dialog/delete-dialog.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCheckboxModule,
    QueryBuilderModule,
    MatTooltipModule,
    MatIconModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatCardModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSidenavModule,
    NgxSpinnerModule.forRoot({ type: "line-scale" }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    KeysPipe,
    SqlFormatPipe,
    QueryBuilderCustomComponent,
    QueryHistoryComponent,

    QueryResultDialogComponent,
    KeysPipe,
    QueryBuilderScreenComponent,
    FormComponent,
    SaveQueryDialogComponent,
    DeleteDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
