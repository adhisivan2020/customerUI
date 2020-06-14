import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http' ;
import { HttpHeaders} from '@angular/common/http' ;
import { Observable } from 'rxjs' ;
import { customerdetails } from './customerdetails'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  _url:'http://localHost:1564/cutomerDetails';
  
  constructor(private httpClient:HttpClient) { }
  updateDetails(user: customerdetails){
    return this.httpClient.post<any>(this._url,user);
  }
}
