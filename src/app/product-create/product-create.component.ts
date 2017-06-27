import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../products.service';
import {currency} from '../currency';

const INITIAL_PRODUCT = {
    name: '',
    description: '',
    price: null,
    currency: ''
};

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    product: any = [];
    currencies = currency;

    constructor(private router: Router,
                private productsService: ProductsService) {
        this.product = INITIAL_PRODUCT;
    }
    
    ngOnInit() {
    }

    onSubmit() {
        this.addProduct(this.product);
    }

    addProduct(product) {

        this.productsService
            .createProduct(product.name, product.description, product.price, product.currency)
            .then(response => {
                this.router.navigate(['product/detail', response._id]);
            });
    }

}
