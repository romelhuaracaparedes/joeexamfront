import { Injectable } from '@angular/core';
import { ServiceService } from './generic/service.service';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../model/product-response';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ServiceService{

  url=`${this.url_base}products`;
  constructor(protected http : HttpClient) { 
    super(http);
  }
  

  public listAll(): Observable<ProductResponse>{
    return this.http.get<ProductResponse>(this.url+"/list");
  }
  public findByName(name:string): Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.url}/name/${name}`);
  }

  public findById(id:number): Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.url}/${id}`);
  }

  public save(product:Product): Observable<ProductResponse>{
    return this.http.post<ProductResponse>(this.url,product);
  }

  public update(producto:Product): Observable<ProductResponse>{
    return this.http.put<ProductResponse>(`${this.url}/${producto.id}`,producto);
  }

  public delete(id:number): Observable<ProductResponse>{
    return this.http.delete<ProductResponse>(`${this.url}/${id}`);
  }

}
