import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpUtilService {

    constructor(private router: Router) { }

    private API_URL: string = 'http://localhost:5000/';


    url(path: string) {
        return this.API_URL + path;
    }

    headers() {
        let headersParams = new Headers({ 'Content-Type': 'application/json' });

        let options = new RequestOptions({ headers: headersParams });
        return options;
    }

    extrairDados(response: Response) {
        let data = response.json();
        console.log(data);
        return data || {};
    }
}