import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  protected url_base= `${environment.URL_BASE}`;
  constructor(protected http:HttpClient) {
  }  
}
