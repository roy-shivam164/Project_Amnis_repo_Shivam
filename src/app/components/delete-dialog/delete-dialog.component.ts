import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginRequestService } from 'app/services/login-request.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private router: Router, private loginUser: LoginRequestService,public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.loginUser.isTokenExpired()) {
      this.logout();
      // call logout method/dispatch logout event
    }
  }

  logout() {
    localStorage.removeItem('token');
    console.log("logout called");
    
    this.router.navigate(['login']);

  }
  onDialogClose(){
    this.dialogRef.close(false);
  }

}
