import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginRequestService } from 'app/services/login-request.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-query-result-dialog',
  templateUrl: './query-result-dialog.component.html',
  styleUrls: ['./query-result-dialog.component.css']
})
export class QueryResultDialogComponent implements OnInit {

  constructor(private router: Router, private loginUser: LoginRequestService, public dialogRef: MatDialogRef<QueryResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any=[]) { }
    columns:any[]=[]
    dataSource :any;
  ngOnInit(): void {
    this.columns = Object.keys(this.data[0])
    this.dataSource = this.data
    if (this.loginUser.isTokenExpired()) {
      this.logout();
      // call logout method/dispatch logout event
    }
  }
  copyRowData(rowData:any){
    navigator.clipboard.writeText(JSON.stringify(rowData));

  }

  logout() {
    localStorage.removeItem('token');
    console.log("logout called");
    
    this.router.navigate(['login']);

  }
  
}