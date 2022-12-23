import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { DbService } from "../../services/db.service";
import { LoaderService } from "../../services/loader.service";
import { QueryBuilderCustomComponent } from "../query-builder-custom/query-builder-custom.component";
import { LoginRequestService } from "app/services/login-request.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-query-builder-screen",
  templateUrl: "./query-builder-screen.component.html",
  styleUrls: ["./query-builder-screen.component.css"],
})
export class QueryBuilderScreenComponent implements OnInit {
  test: Date = new Date();
  @ViewChild(QueryBuilderCustomComponent) child!: QueryBuilderCustomComponent;
  constructor(
    public loaderService: LoaderService,
    private dbService: DbService,
    private router: Router,
    private notification: ToastrService,
    private loginUser: LoginRequestService,
    private spinner: NgxSpinnerService
  ) {}
  queryHistoryData: any;
  tableSchema: any;
  isPageSelected: string = "query-builder";
  getHistoryData($event: any) {
    console.log($event);
    this.dbService
      .runStoredProcedure({
        ...$event,
      })
      .subscribe(
        (res) => {
          this.queryHistoryData = res;
          console.log(res);
        },
        (err) => this.notification.error("Error!", err)
      );
  }
  runQuery($event: any) {
    this.child.runAndDisplayQuery($event);
  }
  getScehma($event: any) {
    console.log($event, "schema");
    this.tableSchema = $event;
  }
  logout() {
    localStorage.removeItem("token");
    console.log("logout called");

    this.router.navigate(["login"]);
  }
  // chengeTab($event:string){
  //   console.log($event)
  //   this.isPageSelected = $event
  // }
  ngOnInit() {
    this.spinner.show();
    if (this.loginUser.isTokenExpired()) {
      this.logout();
      // call logout method/dispatch logout event
    }

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
}
