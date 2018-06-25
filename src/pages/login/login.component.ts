import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsComponent } from '../tabs/tabs.component';
import {LoginService} from './login.service';
import {UrlConfig} from '../../assets/config/config.url';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';


@Component({
    templateUrl: 'login.html'
})

export class LoginComponent {
    password = "123";
    tes = {name:123,id:324};
    public loginForm = {};

    constructor(private nav: NavController, private loginService:LoginService,
        public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
            Keyboard.disableScroll(true);
            this.loginForm = UrlConfig.getLocalUserInfo();
            console.log(this.loginForm);
    }
    login(form) {

        let _this = this;
        let loader = this.loadingCtrl.create({
            content: "加载中..."
        });
        let alert = this.alertCtrl.create({
            title: '信息',
            subTitle: '登录',
            buttons: ['OK']
        });
        loader.present();

        this.loginService.login(_this.loginForm).then(function (data) {
            loader.dismiss();
            let result = JSON.parse(data._body);
            if (result.loginResut == "1") {
                UrlConfig.authKey = result.authKey;
                UrlConfig.userInfo = result.userInfo
                //alert(UrlConfig.authKey);
                _this.nav.setRoot(TabsComponent);
                //_this.nav.push(TabsComponent);
                UrlConfig.setLocalUserInfo(_this.loginForm);
            } else {
                alert.setSubTitle("用户名或密码错误!");
                alert.present();
            }
        }).catch(function (data) {
            console.log(data);
            loader.dismiss();
            alert.setSubTitle("服务器发生异常,请稍后重试!");
            alert.present();
        });

    }
}
