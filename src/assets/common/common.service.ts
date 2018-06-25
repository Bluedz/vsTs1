import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {UrlConfig} from '../../assets/config/config.url'
@Injectable()

export class CommonService {
    constructor (private http: Http) {
        
    }

    public post (url: string, body: any, options?: RequestOptionsArgs):any {
        let promis = this.http.post(url,body,options).toPromise();
        
        promis.catch(function (error) {

        })
        return promis;
    }

    public callMethod (_method: string, _param: any) {
        var url = UrlConfig.getCallMethod();
        let param = {};
        param["_method"] = _method;
        param["_param"] =  _param;
        let p = this.post(url, JSON.stringify(param));
        return p;
    }
}