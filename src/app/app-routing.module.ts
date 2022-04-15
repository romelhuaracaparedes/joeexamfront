import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { FormComponent } from './component/form/form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products/form', component: FormComponent },
  { path: 'products/form/:id', component: FormComponent },
  { path: 'products', component: ProductComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
