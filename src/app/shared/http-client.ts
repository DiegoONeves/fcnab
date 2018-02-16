import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { ApiCallEnum } from './enums/api-call-enum';

@Injectable()
export class HttpClient {

    baseUrlOmie: string = environment.url_omie;
    baseUrlFCnab: string = environment.url_fcnab;
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) { }

    private getHeaders() {
        this.headers = new Headers({});
        this.headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });
        return this.options;
    }

    get(endPoint: string, filter: string = '', apiCallEnum: ApiCallEnum) {
        const headers = this.getHeaders();
        return this.http
            .get(apiCallEnum == ApiCallEnum.Omie ? this.baseUrlOmie : this.baseUrlFCnab + endPoint + filter, headers)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            })
            .toPromise();
    }

    post(endPoint: string, body, apiCallEnum: ApiCallEnum) {
        const headers = this.getHeaders();
        return this.http
            .post(apiCallEnum == ApiCallEnum.Omie ? this.baseUrlOmie + endPoint : this.baseUrlFCnab,
                JSON.stringify(body), headers)
            .map((res: Response) => res.json())
            .toPromise()
            .catch((error: any) => error || 'Server error');
    }

}