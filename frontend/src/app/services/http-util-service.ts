import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import { Response, Headers, RequestOptions } from '@angular/http';
import { Response, RequestOptions } from '@angular/http';

@Injectable()
export class HttpUtilService {

    constructor() { }

    private API_URL: string = 'http://200.238.253.12:5000/';


    url(path: string) {
        return this.API_URL + path;
    }

    headers() {
        let headersParams = new HttpHeaders({ 'Content-Type': 'application/json' });
        // let headersParams = new Headers({ 'Content-Type': 'application/json' });

        // let options = new RequestOptions({ headers: headersParams });
        return {headers: headersParams};
        // return { ['Content-Type': 'application/json' ]};
        // return 
    }

    extrairDados(response: Response) {
        let data = response.json();
        console.log(data);
        return data || {};
    }
}