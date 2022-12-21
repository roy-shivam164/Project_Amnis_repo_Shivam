// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   styleUrls: ["./login.component.css"],
// })
// export class LoginComponent implements OnInit {
//   type: string = "password";
//   isText: boolean = false;
//   eyeIcon: string = "fa-eye-slash";
//   loginForm!: FormGroup;
//   constructor(private fb: FormBuilder) {}
//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       UserEmail: ["", Validators.required],
//       Password: ["", Validators.required],
//     });
//   }
//   hideShowPass() {
//     this.isText = !this.isText;
//     this.isText ? (this.eyeIcon = "fa-eye") : (this.eyeIcon = "fa-eye-slash");
//     this.isText ? (this.type = "text") : (this.type = "password");
//   }
//   // onSubmit(){
//   //   if
//   // }
// }
import { Routes, RouterModule, RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,  } from '@angular/forms';
import { LoginRequestService } from 'app/services/login-request.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginRequestService]
})
export class LoginComponent implements OnInit {
  jwtRecieved:string = ""
  loginresult: boolean;
  type: string = "password";
  AuthValue: boolean ;

  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginUser: LoginRequestService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserEmail: ['',[Validators.required,Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Password: ['',[Validators.required, Validators.minLength(6)]]
    });
      if (this.loginUser.isLoggedIn()) {
        this.router.navigate(['dashboard']);
      }

  }

  
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

//  async loginAuth(encodedCredentials){
//        this.loginUser
//       .authUsers(encodedCredentials)
//       .subscribe( async(result)=>{
        
//         console.log(result);
//         this.loginresult =  await result['isValid'];
//         console.log(this.loginresult);
//       });
//       console.log(this.loginresult);
     
//    }
//  loginAuth(){
   
//   console.log()
//    this.loginUser.subscribe( (result)=>{
     
//      console.log(result);
//      this.loginresult =  result['isValid'];
//      console.log(this.loginresult);
//    });
//    console.log(this.loginresult);
  
// } 
setAuthToken(token: string): void {
  localStorage.setItem('authToken', token);
}

setRefreshToken(token: string): void {
  localStorage.setItem('refreshToken', token);
}




// logout() {
//   localStorage.removeItem('token');
//   this.router.navigate(['login']);
// }

   onSubmit() {
     if(this.loginForm.valid){
      

      //console.log(this.loginForm.value)
      //console.log(this.loginForm.value.UserEmail)
      const combined = this.loginForm.value.UserEmail  + ":" + this.loginForm.value.Password;
      const encodedCredentials = btoa(combined);
      console.log(encodedCredentials)
      //  this.loginAuth(encodedCredentials);
      //console.log(this.loginresult);
      // console.log(atob(btoa(combined)))

       this.loginUser
       .authUsers(encodedCredentials).subscribe((result)=>{
          
        console.log(result);
        this.loginresult =  result['isValid'];
        console.log(this.loginresult)
        if(this.loginresult == true){
          this.setAuthToken(result['authToken']);
          this.setRefreshToken(result['refreshToken']);
          this.loginUser.sessionTimeOut();
          this.router.navigate(['dashboard']);
        }
        else{
          alert('Invalid Credentials');
        }
        //this.router.navigate(['/dashboard']);
      // },
      // (err: Error) => {
      //   console.log(err.message);
        //console.log(result);
        //this.loginresult =  result['isValid'];
        //console.log(this.loginresult);
        //this.router.navigate(['dashboard'])
        //  if(this.loginresult == true){
        
        //    this.router.navigate(['dashboard'])
        //  }else{
        //    alert('Invalid credentials')
        //    this.router.navigate([''])
        //  }
      });

     // console.log(this.loginresult);

      

      // .subscribe((result)=>{
        
      //   console.log(result);
      //   this.loginresult = result['isValid'];
      //   console.log(this.loginresult);
      // });
      // console.log(this.loginresult);
      
      
    //  }else{

      //console.log("Form is not valid");
      // this.validateAllFormFields(this.loginForm);
      // alert("Your form is invalid")
     }
   }
  

 
   private validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf:true})
      } else if (control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
   }

}

