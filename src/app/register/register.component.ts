// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AlertifyService } from '../services/alertify.service';
// import { max } from 'rxjs';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {

//   @Output() cancelRegister=new EventEmitter<boolean>();
  
//   regisrterForm:FormGroup;
 

// constructor(
//       private auth:AuthService,
//       private fd:FormBuilder,
//       private router:Router,
//       private alert:AlertifyService
//     )
// {
//   this.regisrterForm=fd.group({
//     gender:['male'],
//     KnownAs:['',[Validators.required,Validators.maxLength(5),,Validators.minLength(3)]],
//     dateOfBirth:['',Validators.required],
//     country:[,Validators.required],
//     city:[,Validators.required],
//     userName:['',[Validators.required,Validators.minLength(3)]],
//     email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
//     password:['',[Validators.required,Validators.minLength(8)]],
//     confirmPassword:['',[Validators.required,this.matchValues('password')]]
//   })
// } 
// ngOnInit(): void {

// }


// matchValues(matchTo:string):ValidatorFn{
//  return(control:AbstractControl |any)=>{
//    return control?.value===control?.parent?.controls[matchTo]?.value?null
//    :{isMatching:true}
//  }
// }
// register(){
//  this.auth.register(this.regisrterForm.value).subscribe({
//   next:(res)=> {
  
//     // console.log(res)    ;
//     this.alert.success(' register successfully');
//     this.router.navigate(['/member'])    ;
//    this.cancel();
    
//   },
//   error:(err)=> {
//       console.log(err)
//        this.alert.error(`${err.error}`)
//   },
  
// })
// }

// cancel(){
//   this.cancelRegister.emit(false);
// }
// get _gender(){
//   return this.regisrterForm.get('gender')
// }
// get _KnownAs(){
//   return this.regisrterForm.get('KnownAs')
// }
// get _dateOfBirth(){
//   return this.regisrterForm.get('dateOfBirth')
// }
// get _country(){
//   return this.regisrterForm.get('country')
// }
// get _city(){
//   return this.regisrterForm.get('city')
// }
// get _userName(){
//   return this.regisrterForm.get('userName')
// }
// get _email(){
//   return this.regisrterForm.get('email')
// }
// get _password(){
//   return this.regisrterForm.get('password')
// }
// get _confirmPassword(){
//   return this.regisrterForm.get('confirmPassword')
// }
// }


import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  
  regisrterForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertifyService
  ) {
    this.regisrterForm = fb.group({
      gender: ['male'],
      KnownAs: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]], // إضافة دالة التحقق هنا
      country: ['', Validators.required],
      city: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  ngOnInit(): void {}

  validateDateOfBirth(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    const inputDate = new Date(control.value);
    
    // تحقق مما إذا كان التاريخ أكبر من تاريخ اليوم
    if (inputDate > today) {
      return { dateInvalid: true }; // إرجاع خطأ إذا كان التاريخ غير صالح
    }

    // هنا يمكنك تعيين العمر إلى 10 إذا كان التاريخ أكبر من تاريخ اليوم
    const age = today.getFullYear() - inputDate.getFullYear();
    if (age < 10) {
      control.setValue(new Date(today.setFullYear(today.getFullYear() - 10)).toISOString().split('T')[0]); // تعيين العمر إلى 10
    }

    return null; // إذا كان التاريخ صحيحًا
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo]?.value ? null : { isMatching: true };
    }
  }

  register() {
    if (this.regisrterForm.valid) { // التأكد من صحة النموذج قبل التسجيل
      this.auth.register(this.regisrterForm.value).subscribe({
        next: (res) => {
          this.alert.success('Register successfully');
          this.router.navigate(['/member']);
          this.cancel();
        },
        error: (err) => {
          console.log(err);
          this.alert.error(`${err.error}`);
        },
      });
    } else {
      this.alert.error('Please fill all required fields correctly.');    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  get _gender() {
    return this.regisrterForm.get('gender');
  }
  get _KnownAs() {
    return this.regisrterForm.get('KnownAs');
  }
  get _dateOfBirth() {
    return this.regisrterForm.get('dateOfBirth');
  }
  get _country() {
    return this.regisrterForm.get('country');
  }
  get _city() {
    return this.regisrterForm.get('city');
  }
  get _userName() {
    return this.regisrterForm.get('userName');
  }
  get _email() {
    return this.regisrterForm.get('email');
  }
  get _password() {
    return this.regisrterForm.get('password');
  }
  get _confirmPassword() {
    return this.regisrterForm.get('confirmPassword');
  }
}
