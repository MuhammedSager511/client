import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 registerModel:boolean=false;


 constructor() {
  
 }

 RegisterTogle(){
  this.registerModel=!this.registerModel;
 }
 cancelRegisterMode(e:boolean){
  this.registerModel=e;
 }
}
