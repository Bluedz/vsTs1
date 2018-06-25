import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AppService } from '../../app/app.service'
import { LoginComponent } from '../../pages/login/login.component';
import { Events } from 'ionic-angular';
import { AppConfig } from '../../app/app.config';
import { App } from 'ionic-angular'; 

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private currentVersion: String = "0.1.5";

  constructor(public navCtrl: NavController, private appService: AppService, private events: Events, private platfrom: Platform,private app:App) {
    if (this.platfrom.is("cordova")) {
      appService.getCurrentVersion().then((value: string) => {
        this.currentVersion = value;
      });
    }
  }

  public checkUpdate() {
    this.appService.checkUpdate('1');
  }

  public logOut() {
    this.platfrom.exitApp();
  }

  public suAccount () {
    //this.navCtrl.popAll();
    this.navCtrl.popToRoot();
    //this.navCtrl.setRoot(LoginComponent);
    //window.location.reload();其实这种方法最直接，直接刷新整个页面
    //this.navCtrl.goToRoot();
    //this.events.publish('user:created', "uss");
    //此处赋值为空，是防止在真机环境中，按返回键可以直接回到主页
    this.navCtrl.parent = null;
    this.app.getRootNav().push(LoginComponent);
  }
}
