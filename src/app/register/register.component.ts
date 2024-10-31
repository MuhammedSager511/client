import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { max } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister=new EventEmitter<boolean>();
  
  regisrterForm:FormGroup;
  maxDate!:Date;
constructor(
      private auth:AuthService,
      private fd:FormBuilder,
      private router:Router,
      private alert:AlertifyService
    )
{
  this.regisrterForm=fd.group({
    gender:['male'],
    KnownAs:['',[Validators.required,Validators.maxLength(5),,Validators.minLength(3)]],
    dateOfBith:[,Validators.required],
    country:[,Validators.required],
    city:[,Validators.required],
    userName:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:['',[Validators.required,this.matchValues('password')]]
  })
}
  ngOnInit(): void {
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-15)
  }

matchValues(matchTo:string):ValidatorFn{
 return(control:AbstractControl |any)=>{
   return control?.value===control?.parent?.controls[matchTo]?.value?null
   :{isMatching:true}
 }
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
get _gender(){
  return this.regisrterForm.get('gender')
}
get _KnownAs(){
  return this.regisrterForm.get('KnownAs')
}
get _dateOfBith(){
  return this.regisrterForm.get('dateOfBith')
}
get _country(){
  return this.regisrterForm.get('country')
}
get _city(){
  return this.regisrterForm.get('city')
}
get _userName(){
  return this.regisrterForm.get('userName')
}
get _email(){
  return this.regisrterForm.get('email')
}
get _password(){
  return this.regisrterForm.get('password')
}
get _confirmPassword(){
  return this.regisrterForm.get('confirmPassword')
}
}
