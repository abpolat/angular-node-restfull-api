import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    product: any = [];
    active = true;
    error = 'Product not found';

    constructor(private productsService: ProductsService,
                private route: ActivatedRoute) {}

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

}
