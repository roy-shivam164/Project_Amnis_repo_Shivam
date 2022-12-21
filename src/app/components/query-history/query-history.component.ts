import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { ToastrService } from 'ngx-toastr';
import { DbService } from '../../services/db.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { QueryResultDialogComponent } from '../query-result-dialog/query-result-dialog.component';
import { LoginRequestService } from 'app/services/login-request.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-query-history',
  templateUrl: './query-history.component.html',
  styleUrls: ['./query-history.component.css']
})
export class QueryHistoryComponent implements OnInit{
  @Input() queryHistorydata:any;
  @Input() tableSchema:any;
  @Output() runQuery : EventEmitter<any> = new EventEmitter()
  pageSize = 10;
  currentPage = 1;
  filteredData:any;
  queryBuilderComponentRef:any
  constructor(private router: Router, private notification:ToastrService,private loginUser: LoginRequestService,public dialog: MatDialog,private dbService: DbService) {
   }
  ngOnInit(): void {
  }

  queryRunAndDisplay(queryData:any){ 
    // this.emit.onQueryRun(queryData.query);   
    this.runQuery.emit(queryData.query)
  }   
  copyToClipboard(sqlQuery:any){
    navigator.clipboard.writeText(sqlQuery.query);
    this.notification.success("Coppied to clipboard")
  }

  logout() {
    localStorage.removeItem('token');
    console.log("logout called");
    
    this.router.navigate(['login']);

  }
  

  openDialogDelete(queryData: any){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "fit-content"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result)
      this.deleteQuery(queryData)
    });
  }

  deleteQuery(queryData:any){
    console.log(queryData)
    this.dbService.runStoredProcedure({
      procedure:`${this.tableSchema}.deleteSqlNameQuery`,
      data:{queryName:queryData.queryName}
    }).subscribe(res => {
      console.log(res)
      this.queryHistorydata = this.queryHistorydata.filter( (item: { queryName: any; }) => item.queryName != queryData.queryName);
    })
  }
}
