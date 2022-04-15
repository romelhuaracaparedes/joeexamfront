import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/model/product';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Array<Product>=[];
  frmList!: FormGroup;
  hasChange: boolean = false;
  
  constructor(private productService:ProductService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
    this.listProducts();
   
    this.frmList = this.formBuilder.group(
      {
        name : ['']
      }
    );
    this.findByName();
  }

  listProducts(){
    this.productService.listAll().subscribe(
      res =>{
        this.products= res.data;
      }
    );
  }

  findByName(){

    this.f()['name'].valueChanges.subscribe(x => {
      this.productService.findByName(x).subscribe(
        res =>{
          this.products= res.data;
        }
      );
    })
    
  }

  limpiar(){
    this.f().name.setValue('');
    this.findByName();
  }

  f(){
    return this.frmList.controls;
  }

  
  

}
