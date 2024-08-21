import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  baseURL:string ="https://localhost:7002/api/";
  Message:any;


  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
      this.getMessage();
  }




  getMessage(){
    return this.http.get(this.baseURL+'Messages').subscribe({
      next:(res)=>{
        this.Message=res;
        console.log(res);
      },
       error:(err)=>{
        console.error(err);
       }
    })
  }
}
