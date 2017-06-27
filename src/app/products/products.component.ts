import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Subject } from 'rxjs/Subject';

import {Product} from '../product';
import {ProductsService} from '../products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    products: Product[];
    allProducts: Product[];
    active = true;
    noResult = false;

    constructor(private router: Router,
                private productsService: ProductsService) {
    }

    ngOnInit() {
        this.getProducts();
    }

    search(term: string) {
        if(term.length === 0 || term.length < 2){
            this.products = this.allProducts;
            this.noResult = false;
        }else{
            this.products = this.searchProduct(term);
            if(this.products.length === 0){
                this.noResult = true;
            }
        }
    }

    searchProduct (str) {
        const result = [];
        for (var j=0; j<this.products.length; j++) {
            let regex = new RegExp(str,"i");
            if (regex.test(this.products[j].name)) result.push(this.products[j]);
        }
        return result;
    }

    getProducts(): void {
        this.productsService.getAllProducts().then(products => {
            if (typeof products === 'undefined' || products === null || products.length === 0) {
                this.active = false;
            } else {
                this.products = products;
                this.allProducts = products;
            }
        });
    }

    gotoDetail(product: Product): void {
        this.router.navigate(['product/detail', product._id]);
    }

    deleteProduct(product: Product): void {
        if (confirm('Please confirm to delete the product.')) {
            this.productsService
                .deleteProduct(product._id)
                .then(() => {
                    this.products = this.products.filter(h => h !== product);
                    this.allProducts = this.allProducts.filter(h => h !== product);
                    if (this.products.length === 0) {
                        if(this.allProducts.length === 0){
                            this.active = false;
                        }else{
                            this.products = this.allProducts;
                        }
                        
                    }
                });
        }
    }


}