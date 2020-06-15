import { Component, ComponentFactoryResolver } from '@angular/core';
import { CustomerService } from './customer.service'
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http' ;
import { HttpHeaders} from '@angular/common/http' ;
import { Observable } from 'rxjs' ;
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerInformation';
  
  //constructor(private _customerService:CustomerService){}
  constructor(private httpClient:HttpClient) { }
  isDataSubmitted = false;
  radioDetailsupdate='';
  customerdetails = {
    name:'',
    address: '',
    phone:'',
    active:''
  };
  setValue(event) {
    const keyName = event.target.name;
    const value = event.target.value;
    this.customerdetails[keyName] = value;
  }
   selectedLink: string="add";        
  
  setradio(e: string): void   
{  

      this.selectedLink = e;  
        
}
  onSubmit(){
    for(const key in this.customerdetails){
      const val = this.customerdetails[key];
      if(val.trim().length == 0){
        
            alert("Field cannot be blank");
            return;
       
      }
    }
    console.log(this.customerdetails);
    console.log("button data "+this.selectedLink);
  //  this._customerService.updateDetails(this.customerdetails)
  //  .subscribe(
  //    data => console.log('Success!',data),
  //    error => console.error('Error!',error)
  //  )
   const headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': "Content-Type"
  }
  
  const requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(headerDict), 
  };
  if(this.selectedLink=="add"){
    const data = JSON.stringify(this.customerdetails);
    this.httpClient.post('http://13.232.8.125:8080/api/customers',data,requestOptions
   
    ).subscribe(
      (data:any) => {
        console.log('add operation');
      }
    )
  }
  if(this.selectedLink=="update"){
    const data = JSON.stringify(this.customerdetails);
    this.httpClient.put('http://13.232.8.125:8080/api/customer/update',data,requestOptions
   
    ).subscribe(
      (data:any) => {
       
        console.log('update operation');
      }
    )
  }
  if(this.selectedLink=="delete")
  {
    
    const data = JSON.stringify(this.customerdetails);
    let req = new HttpRequest('DELETE', 'http://13.232.8.125:8080/api/customer/delete');
let newReq = req.clone({body: data});
this.httpClient.request(newReq).subscribe((res) => {
    console.log("delete operation");
}, (err) => {
    console.log(err);
});


 }
  
    
  this.isDataSubmitted=true;
  
  }

  resetForm() {
    this.customerdetails = {
      name:'',
      address: '',
      phone:'',
      active:''
    };
    this.isDataSubmitted=false;
  }
}
