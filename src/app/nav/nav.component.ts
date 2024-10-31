import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { environment } from 'src/assets/environments/environment';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{


  loginForm:FormGroup;
  loggedIn:boolean=false;
 

  // currentUser$!:Observable<User |null>;
  constructor(
    public authServices:AuthService,
    private fd:FormBuilder,
    private router:Router,
    private alert:AlertifyService
   )
  {
    this.loginForm=fd.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }



  ngOnInit(): void {
   
  // this.currentUser$=this.authServices.currentUser$;
  }

  login(){
    this.authServices.login(this.loginForm.value).subscribe({
      next:(res)=> {
       this.loggedIn=true;
       this.router.navigate(['/member']);
       this.alert.success(' login successfully');
       
      },
      error:(err)=> {
        this.alert.error(`${err.error.status} - ${err.error.title}`)
          console.log(err)
      },
      
    })
  }

  logout(){
    this.authServices.logout();
    this.router.navigate(['/'])    ;
    this.loggedIn=false;
    this.alert.warning('loged out !');
  }
}
