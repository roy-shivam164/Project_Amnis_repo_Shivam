import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-query-result-dialog',
  templateUrl: './query-result-dialog.component.html',
  styleUrls: ['./query-result-dialog.component.css']
})
export class QueryResultDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QueryResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any=[]) { }
    columns:any[]=[]
    dataSource :any;
  ngOnInit(): void {
    this.columns = Object.keys(this.data[0])
    this.dataSource = this.data
  }
  copyRowData(rowData:any){
    navigator.clipboard.writeText(JSON.stringify(rowData));

  }
}