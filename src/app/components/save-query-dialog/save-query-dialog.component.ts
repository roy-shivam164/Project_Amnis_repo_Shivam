import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-save-query-dialog',
  templateUrl: './save-query-dialog.component.html',
  styleUrls: ['./save-query-dialog.component.css']
})
export class SaveQueryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SaveQueryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  nameControl = new FormControl('')
  onDialogClose(){
    this.dialogRef.close();
  }

}
