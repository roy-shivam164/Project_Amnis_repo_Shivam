import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DbService } from '../../services/db.service';
import { LoaderService } from '../../services/loader.service';
import { QueryBuilderCustomComponent } from '../query-builder-custom/query-builder-custom.component';

@Component({
  selector: 'app-query-builder-screen',
  templateUrl: './query-builder-screen.component.html',
  styleUrls: ['./query-builder-screen.component.css']
})
export class QueryBuilderScreenComponent implements OnInit {
  @ViewChild(QueryBuilderCustomComponent) child! : QueryBuilderCustomComponent
  constructor( public loaderService: LoaderService, private dbService:DbService, private notification: ToastrService){}
  queryHistoryData:any
  tableSchema:any
  isPageSelected:string="query-builder"
  getHistoryData($event:any){
    console.log($event);
    this.dbService.runStoredProcedure({
        ...$event
    }).subscribe(
      res => {this.queryHistoryData = res;console.log(res)},
      err => this.notification.error("Error!", err)
    );
  }
  runQuery($event:any){
    this.child.runAndDisplayQuery($event);
  }
  getScehma($event:any){
    console.log($event,"schema");
      this.tableSchema = $event
  }
  // chengeTab($event:string){
  //   console.log($event)
  //   this.isPageSelected = $event
  // }
  ngOnInit(): void {
  }

}
