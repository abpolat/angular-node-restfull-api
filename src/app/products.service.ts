import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Product} from './product';

@Injectable()
export class ProductsService {

    private productsUrl = 'api/products';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Get all posts from the API
    getAllProducts(): Promise<Product[]> {
        return this.http.get(this.productsUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Product[])
            .catch(this.handleError);
    }

    getProduct(id: string): Promise<Product> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Product)
            .catch(this.handleError);
    }

    deleteProduct(id: string): Promise<void> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    updateProduct(product: Product): Promise<Product> {
        const url = `${this.productsUrl}/${product._id}`;
        return this.http
            .patch(url, JSON.stringify(product), {headers: this.headers})
            .toPromise()
            .then(() => product)
            .catch(this.handleError);
    }


    createProduct(name: string, description: string, price: number, currency: string): Promise<Product> {
        return this.http
            .post(this.productsUrl, JSON.stringify({name, description, price, currency}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Product)
            .catch(this.handleError);
    }
}