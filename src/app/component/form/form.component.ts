import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/model/category';
import { Product } from '../../model/product';
import { Message } from '../../model/message';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  frmRegistro!: FormGroup;
  product:any;
  submitted = false;
  categories:Array<Category>=[];
  isAddMode: boolean;
  id: number;
  loading = false;

  constructor(private productService:ProductService,
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private categoryService:CategoryService,
    private router:Router) { }

  ngOnInit(): void {
    this.loadProduct();
    this.listCategories(),
    this.frmRegistro = this.formBuilder.group(
      {
        name : ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                  ]
                ],
        type:  ['',Validators.required],
        code : ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                  ]
                ],
        description : ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                  ]
                ],
        price : ['',
                  [
                    Validators.required,
                    Validators.pattern("^[0-9]+([.][0-9]+)?$"),
                  ]
                ]
      }
    );
    
    
  }

  listCategories(){
    this.categoryService.listAll().subscribe(
      res =>{
        this.categories= res.data;
      }
    );
  }

  loadProduct():void{
    this.activatedRoute.params.subscribe( params=>{
      this.id = params['id']
      this.isAddMode = !this.id;  
      if(this.id){
            this.findById(this.id);
        }
      }
    );
  }

  findById(id:number){
    this.productService.findById(id).subscribe(
      res=>{
        this.product=res.data;
        this.f().name.setValue(this.product.name);
        this.f().type.setValue(this.product.category.id);
        this.f().code.setValue(this.product.code);
        this.f().description.setValue(this.product.description);
        this.f().price.setValue(this.product.price);

      }
    );
  }

  onSubmit(){
    this.submitted = true;
    if (this.frmRegistro.valid) {
      const product:Product=new Product();
      product.name=this.f().name.value;
      product.code= this.f().code.value;
      product.price= this.f().price.value;
  
      const category:Category= new Category();
      category.id=this.f().type.value;
      product.category= category;
      product.description= this.f().description.value;
      this.loading = true;
      if (this.isAddMode) {
        this.save(product);
      } else {
        product.id=this.id;
        this.update(product);
      }
        
    }
        

  }

  save(product:Product){

    


    this.productService.save(product).subscribe(
      res=>{
        this.product=res.data;
        Swal.fire(
          'Éxito',
          `Se registró el producto "${product.name}" correctamente`,
          'success'
        )
        this.router.navigate(['products']);
      },
      err => {
        let message:Message=err.error.message.message;
        Swal.fire(
          'Error',
          `${message}`,
          'error'
        )
        this.loading = false;
      }
    );

  }

  update(product:Product){
    this.productService.update(product).subscribe(
      res=>{
        this.product=res.data;
        Swal.fire(
          'Éxito',
          `Se actualizó el producto "${product.name}" correctamente`,
          'success'
        )
        this.router.navigate(['products']);
      },
      err => {
        let message:Message=err.error.message.message;
        Swal.fire(
          'Error',
          `${message}`,
          'error'
        )
        this.loading = false;
      }
    );

  }

  delete(){
    Swal.fire({
      title: 'Aviso',
      text: '¿Desea eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.productService.delete(this.id).subscribe(
          res => {
            let message:Message=res.message;
            if(message.code===1){
              Swal.fire(
                'Éxito',
                `Se eliminó el producto correctamente`,
                'success'
              )
              this.router.navigate(['products']);
            }else{
              Swal.fire(
                'Error',
                'Ocurrió un problema al eliminar',
                'error'
              )
            }
          },
          err => {
            let message:Message=err.error.message;
            if(message.code===-1){
              Swal.fire(
                'Error',
                'Ocurrió un problema al eliminar',
                'error'
              )
            }
          }
        );
      }
    })

  }

  f(){
    return this.frmRegistro.controls;
  }

}
