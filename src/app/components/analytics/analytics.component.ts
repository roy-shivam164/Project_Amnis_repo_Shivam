import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { DbService } from "../../services/db.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"],
})
export class AnalyticsComponent implements OnInit {
  title = "dashboard";
  chart: any = [];

  constructor(public dbService: DbService) {}

  dateLabel: any;
  commandDeckData: Array<object> = new Array<object>();
  createDate: any;
  smsSent: any;
  createDateArray: Array<string> = new Array<string>();
  smsSentArray: Array<number> = new Array<number>();
  //createDateArray : Array<string> = ['27','26','25'];
  //smsSentArray : Array<number> = [14,100,100];

  ngOnInit() {
    this.dbService
      .runStoredProcedure({
        procedure: `workflowReportingData_GET`,
      })
      .subscribe((res) => {
        this.commandDeckData = res as Array<object>;
        this.createDateArray = this.commandDeckData.map((item: any) => {
          return item.CreateDate;
        });
        this.smsSentArray = this.commandDeckData.map((item: any) => {
          return item.NoOfSmsSent;
        });

        this.chart = new Chart("canvas", {
          type: "line",
          data: {
            labels: this.createDateArray,
            datasets: [
              {
                label: "SmsSent",
                data: this.smsSentArray,
                backgroundColor: "blue",
                borderColor: "blue",
                fill: false,
              },
            ],
          },
        });
      });
  }
}
