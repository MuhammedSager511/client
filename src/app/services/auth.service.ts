import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { ILogin, User } from '../models/login';
import { map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL:string=environment.baseURL;
  private currentUserSource=new ReplaySubject<User |null>(1);
  currentUser$=this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post<any>(this.baseURL+'Accounts/login',model).pipe(
      map((res)=>{
        const user=res;
        if(user){
          this.setCurrentUser(user);
          // localStorage.setItem('user',JSON.stringify(res));
          // this.currentUserSource.next(user)
        }
     
      })
    )
  }

  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user)
  }

  register(model:any)
  {
    return this.http.post<any>(this.baseURL+'Accounts/register',model).pipe(
      map((res:User)=>{
       if (res) {
        const user=res;
        this.setCurrentUser(user);
          // localStorage.setItem('user',JSON.stringify(res));
          // this.currentUserSource.next(user)
        
       }
  
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null)
  }


}
