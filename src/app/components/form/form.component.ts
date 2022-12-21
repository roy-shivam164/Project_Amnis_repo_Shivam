import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DbService } from '../../services/db.service';
import { environment } from '../../../environments/environment';
import { LoginRequestService } from 'app/services/login-request.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private dbservice: DbService,
    private router: Router,
    private loginUser: LoginRequestService,
    private http: HttpClient,
    public notification: ToastrService
  ) {}
  templateData: any;
  selectedTemplateId: any="";
  templateIdSelected: any="";
  smsData: any;
  selectedSmsId: any;
  smsIdSelected: any;
  textMsg: any="";
  todayDate = new Date().toISOString().slice(0, 16);
  scheduleDate: any;
  queryData: any;
  selectedQuery: any="";
  selectedQueryName: any;

  showEmail: any;
  showSms: any;
  containerValue: any = 'email';
  name: any;
  result: any;

  ngOnInit(): void {
    if (this.loginUser.isTokenExpired()) {
      this.logout();
      // call logout method/dispatch logout event
    }
    this.dbservice
      .runStoredProcedure({
        procedure: `dbo.GetAllEmailTemplateId`,
      })
      .subscribe((res) => {
        this.templateData = res;
        // this.selectedTemplateId = res[0].emailTemplateId;
        // this.templateIdSelected = this.selectedTemplateId;
      });

    this.dbservice
      .runStoredProcedure({
        procedure: `dbo.getSqlNameQueryHistory`,
      })
      .subscribe((res) => {
        console.log(res);
        this.queryData = res;
      });

    this.dbservice
      .runStoredProcedure({
        procedure: `dbo.GetSmsRecord`,
      })
      .subscribe((res) => {
        this.smsData = res;
        // this.selectedSmsId = res[0].description;
        // this.textMsg=res[0].text;
      });
  }
  radioChange(event: any) {
    console.log(event);
    this.containerValue = event.value;
  }
  
  logout() {
    localStorage.removeItem('token');
    console.log("logout called");
    
    this.router.navigate(['login']);

  }


  getSelection(option: any, type: HTMLSelectElement) {
    console.log(type.id);
    if (type.id == 'templates') {
      this.selectedTemplateId = option;
      this.templateIdSelected=option;
    } else if (type.id == 'query') {
      this.selectedQueryName = option;
     this.selectedQuery = option;
    } else if(type.id =='sms'){
      console.log(option)
      this.smsIdSelected = option;
      this.selectedSmsId = option;
      this.textMsg=this.smsData.filter( (item: { SmsTemplateId: any; }) => item.SmsTemplateId === option)[0].text;
      console.log(this.smsIdSelected)
    }
    
  }
  onChnageEmailCheck(check: any) {
    this.showEmail = check;
  }
  onChnageSmsCheck(check: any) {
    this.showSms = check;  
  }
  validateEmptyField(){
    if (this.scheduleDate == null || this.selectedQuery == "" || this.templateIdSelected=="" && this.textMsg=="") {
      return false;
    } 
    return true;
  }
  validateDate(){
    console.log("changed")
    if(new Date(this.scheduleDate) < new Date()){
      this.scheduleDate = null
      this.notification.error('Cannot select the past date and time');
      return ;
    }
  }
   submit() { 
    console.log(this.scheduleDate);
    let url = `${environment.baseApiUrl}cd-schedule-email-and-sms`;
    this.http
      .post(url, {
        emailTemplateId: this.templateIdSelected,
        scheduleTime: new Date(new Date(this.scheduleDate).toUTCString()),
        sqlQuery: this.selectedQuery,
        sendEmail: this.containerValue == 'email' ? true : false,
        text:this.textMsg,
        smsTemplateId:this.smsIdSelected,

      })
      .toPromise()
      .then((data: any) => { 
        this.notification.success('Task Scheduleded Successfully');
        this.result = JSON.stringify(data.json);
      });
  }
}
