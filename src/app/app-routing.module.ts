import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { NotFoundComponent } from './not-found.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product/create',
        component: ProductCreateComponent
    },
    {
        path: 'product/detail/:id',
        component: ProductDetailComponent
    },
    {
        path: 'product/edit/:id',
        component: ProductEditComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
