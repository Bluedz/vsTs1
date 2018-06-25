import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {UrlConfig} from '../../assets/config/config.url'
import { AlertController } from 'ionic-angular';
import {CommonService} from '../../assets/common/common.service'
@Injectable()
export class LoginService {
    //private headers = new Headers({'Content-Type': 'application/json'});
    constructor (public http:Http,public alertCtrl: AlertController,
                public commonService:CommonService
    ) {

    }
    public login (loginInfo) {
        let url:string = UrlConfig.getLoginUrl();
        //let _this = this;
        // this.http.post(url,JSON.stringify(loginInfo),{headers:this.headers}).toPromise()
        // .then(function(data){
        //     console.log(data);
        //     _this.showAlert();
        // });
        return this.commonService.post(url,JSON.stringify(loginInfo));
    }
    showAlert() { 
        let alert = this.alertCtrl.create({ 
            title: 'New Friend!', 
            subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!', 
            buttons: ['OK'],
            cssClass : 'alert-ios'
        }); 
        alert.present(); 
    } 
}