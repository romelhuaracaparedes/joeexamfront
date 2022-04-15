import { Injectable } from '@angular/core';
import { ServiceService } from './generic/service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../model/category-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ServiceService{

  url=`${this.url_base}categories`;
  constructor(protected http : HttpClient) { 
    super(http);
  }
  

  public listAll(): Observable<CategoryResponse>{
    return this.http.get<CategoryResponse>(this.url+"/list");
  }
}
