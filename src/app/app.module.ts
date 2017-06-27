import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {ProductsComponent} from './products/products.component';
import {ProductsService} from './products.service';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {NotFoundComponent} from './not-found.component';
import {AppRoutingModule} from './app-routing.module';
@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductCreateComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [ProductsService], // Add the posts service
    bootstrap: [AppComponent]
})
export class AppModule {}
