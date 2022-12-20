import { Component, ElementRef, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DbService } from "../../services/db.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-campaign-builder",
  templateUrl: "./campaign-builder.component.html",
  styleUrls: ["./campaign-builder.component.css"],
})
export class CampaignBuilderComponent implements OnInit {
  test: Date = new Date();
  constructor(
    private dbservice: DbService,
    private http: HttpClient,
    public notification: ToastrService
  ) {}

  queryData: any;
  campaignTypeData: any;
  quiqMsgTemplates: any;
  campaignIntervalMapping: any;
  scheduleDate: any = null;

  todayDate = new Date().toISOString().slice(0, 16);

  selectedQuery: any = "";
  selectedQueryName: any;

  smsMsg: any = "";
  smsMsgName: any;

  //FORM Field Value
  campaignTypeName: any = "";
  campaignName: any = "";

  campaignInterval: any = null;

  ngOnInit(): void {
    // this.dbservice
    //   .runStoredProcedure({
    //     procedure: `dbo.`,
    //   })
    //   .subscribe((res) => {
    //     this.TypeOf = res;
    //     // this.selectedTemplateId = res[0].emailTemplateId;
    //     // this.templateIdSelected = this.selectedTemplateId;
    //   });

    this.dbservice
      .runStoredProcedure({
        procedure: `dbo.getSqlNameQueryHistory`,
      })
      .subscribe((res) => {
        console.log(res);
        this.queryData = res;
        // this.selectedQuery = res[0].;
        // this.selectedQueryName = this.selectedTemplateId;
      });

    //Get Campaign Data
    this.dbservice
      .runStoredProcedure({
        procedure: `dbo.sp_CampaignType_GET`,
      })
      .subscribe((res) => {
        console.log(res);
        this.campaignTypeData = res;
      });

    //Get Quiq Message
    this.dbservice
      .runStoredProcedure({
        procedure: `dbo.sp_QuiqMessage_GET`,
      })
      .subscribe((res) => {
        console.log(res);
        this.quiqMsgTemplates = res;
      });

    //Get Quiq Message
    this.dbservice
      .runStoredProcedure({
        procedure: `dbo.sp_CampaignIntervalMapping_GET`,
      })
      .subscribe((res) => {
        console.log(res);
        this.campaignIntervalMapping = res;
      });
  }

  submit() {
    var formEle = <HTMLFormElement>(
      document.getElementById("campaign-builder-form")
    );
    formEle.reset();

    var rt = (<HTMLElement>document.getElementById("campaignName")) as any;
    this.campaignName = rt.value;

    var sceduleTime =
      this.campaignInterval == "select"
        ? new Date(new Date(this.scheduleDate).toUTCString())
        : this.campaignInterval;

    var campaignData = {
      scheduleTime: sceduleTime,
      campaginData: {
        campaignType: this.campaignTypeName,
        campaignName: this.campaignName,
        campaignScheduleTime: sceduleTime,
        frequency: null,
        sqlqueryName: null,
        sqlQuery: this.selectedQuery,
        smsMessage: this.smsMsg,
        emailTemplateId: null,
      },
    };

    console.log(campaignData);

    let url = `${environment.baseApiUrl}cd-schedule-campaign`;
    this.http
      .post(url, campaignData)
      .toPromise()
      .then((data: any) => {
        this.notification.success("Task Scheduleded Successfully");
        //this.result = JSON.stringify(data.json);
      });
  }

  validateDate() {
    console.log("changed");
    if (new Date(this.scheduleDate) < new Date()) {
      this.scheduleDate = null;
      this.notification.error("Cannot select the past date and time");
      return;
    }
  }

  validateEmptyField() {
    console.log(this.campaignTypeName + this.campaignName);

    if (this.campaignTypeName != "") {
      return true;
    }
    return false;
  }

  getSelection(option: any, type: HTMLSelectElement) {
    console.log(type.id);
    if (type.id == "query") {
      this.selectedQueryName = option;
      this.selectedQuery = option;
    }

    if (type.id == "smsTemp") {
      this.smsMsgName = option;
      this.smsMsg = option;
    }

    if (type.id == "campaignData") {
      this.campaignTypeName = option;
      //  this.smsMsg = option;
    }

    if (type.id == "campaignInterval") {
      this.campaignInterval = option;
      console.log(this.campaignInterval);
      console.log(this.scheduleDate);
    }
    //  var rt = this.quiqMsgTemplates.filter(ele=>{ return ele.});

    //  const results = people.filter(element => {
    //   // 👇️ using AND (&&) operator
    //   return element.age === 30 && element.name === 'Carl';
    // });
    //  }

    // else if (type.id == 'templates') {
    //   this.selectedTemplateId = option;
    //   this.templateIdSelected=option;
    // } else  else if(type.id =='sms'){
    //   console.log(option)
    //   this.smsIdSelected = option;
    //   this.selectedSmsId = option;
    //   this.textMsg=this.smsData.filter( (item: { SmsTemplateId: any; }) => item.SmsTemplateId === option)[0].text;
    //   console.log(this.smsIdSelected)
    // }
  }
}
