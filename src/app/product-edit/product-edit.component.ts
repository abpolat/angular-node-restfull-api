import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../products.service';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {currency} from '../currency';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    product: any = [];
    active = true;
    error = 'Product not found';
    currencies = currency;

    constructor(private productsService: ProductsService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.productsService.getProduct(params['id']))
            .subscribe(product => {
                if (typeof product === 'undefined' || product === null) {
                    this.active = false;
                } else {
                    this.product = product;
                }
            });
    }

    onSubmit() {
        this.updateProduct(this.product);
    }

    updateProduct(product) {
        this.productsService
            .updateProduct(product)
            .then(() => {
                this.router.navigate(['product/detail', product._id]);
            });
    }

}
