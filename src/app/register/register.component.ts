import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() cancelRegister=new EventEmitter<boolean>();
  
  regisrterForm:FormGroup;
constructor(
      private auth:AuthService,
      private fd:FormBuilder,
      private router:Router,
      private alert:AlertifyService
    )
{
  this.regisrterForm=fd.group({
    userName:['',[Validators.required]],
    email:['',[Validators.required]],
  
    password:['',[Validators.required]],
  })
}
register(){
 this.auth.register(this.regisrterForm.value).subscribe({
  next:(res)=> {
  
    // console.log(res)    ;
    this.alert.success(' register successfully');
    this.router.navigate(['/member'])    ;
   this.cancel();
    
  },
  error:(err)=> {
      console.log(err)
       this.alert.error(`${err.error}`)
  },
  
})
}
cancel(){
  this.cancelRegister.emit(false);
}
}
