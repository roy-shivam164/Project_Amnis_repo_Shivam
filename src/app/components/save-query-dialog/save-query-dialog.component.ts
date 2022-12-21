import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginRequestService } from 'app/services/login-request.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

 constructor(private router: Router, private loginUser: LoginRequestService, public dialogRef: MatDialogRef<SaveQueryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.loginUser.isTokenExpired()) {
      this.logout();
      // call logout method/dispatch logout event
    }
  }
  nameControl = new FormControl('')
  onDialogClose(){
    this.dialogRef.close();
  }

  logout() {
    localStorage.removeItem('token');
    console.log("logout called");
    
    this.router.navigate(['login']);

  }

}
