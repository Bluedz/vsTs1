import { Component} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,Keyboard } from 'ionic-native';
import {LoginComponent} from '../pages/login/login.component';
import { AppService } from './app.service';
//import { CodePush, InstallMode } from '@ionic-native/code-push';
import { SyncStatus } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginComponent;


  messageText: string;
  private msg = 'msg';
  private pecent = '0';
  private loading;
  constructor(platform: Platform, public appService: AppService, private loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // private codePush: CodePush, 
      // alert(1);c
      // 检查版本更新
      //this.appService.checkVersion();

      // const downloadProgress = (progress) => {
      //   setTimeout(() => {
      //     // alert('msg is ' + this.msg);
      //     this.msg = progress.receivedBytes + ' of ' + progress.totalBytes;
      //     this.pecent = ((progress.receivedBytes / progress.totalBytes) * 100).toFixed(2);
          
      //     if (this.pecent == '100') {
      //       this.loading.dismiss();
      //     }
      //   }, 500);
      // }
      // this.codePush.sync({
      //   ignoreFailedUpdates: false,
      //   updateDialog: {
      //     updateTitle: '更新提示',
      //     optionalIgnoreButtonLabel: '忽略',
      //     optionalInstallButtonLabel: '安装',
      //     optionalUpdateMessage: '有一个可用的更新，是否需要更新?',
      //     mandatoryContinueButtonLabel: '升级',
      //     mandatoryUpdateMessage: '应用有新的版本可供更新.'
      //   }, 
      //   installMode: InstallMode.IMMEDIATE
      // }, downloadProgress).subscribe((syncStatus) => {

      //   console.log('Sync Status: ', syncStatus);

      //   if (syncStatus === SyncStatus.UP_TO_DATE) {
      //     alert("已经是最新版");
      //     // facing some zoning problems here !!
      //     // why ??

      //     // forcing to run in the ngzone
      //     // this.ngZone.run(() => {
      //     //   this.messageText = 'App is up to date !';
      //     //   this.events.publish('root:nav-to-home');
      //     // });
      //   }

      //   // not facing zoning issue here ?

      //   switch (syncStatus) {
      //     case SyncStatus.IN_PROGRESS:
      //       this.messageText = 'An update is in progress ..';
      //       alert(this.messageText);
      //       break;

      //     case SyncStatus.CHECKING_FOR_UPDATE:
      //       this.messageText = 'Checking for update ..';
      //       alert(this.messageText);
      //       break;

      //     case SyncStatus.DOWNLOADING_PACKAGE:
      //       this.messageText = 'Downloading package ..';
      //       // alert(this.messageText);
      //       this.loading = this.loadingCtrl.create({
      //         content : '已下载:' + this.msg + ", " + this.pecent + '%.'
      //       });
      //       this.loading.present();
      //       break;

      //     case SyncStatus.INSTALLING_UPDATE:
      //       this.messageText = 'Installing update ..';
      //       alert(this.messageText);
      //       alert(this.msg + ',' + this.pecent);
      //       break;

      //     case SyncStatus.UPDATE_INSTALLED:
      //       this.messageText = 'Installed the update ..';
      //       alert(this.messageText);
      //       // const alert = this.alertController.create({
      //       //   title: 'Update',
      //       //   message: 'A new update was installed and will be available on next app restart',
      //       //   buttons: ['OK']
      //       // });
      //       // alert.present();
      //       // alert.onDidDismiss(() => {
      //       //   this.events.publish('root:nav-to-home');
      //       // });
      //       break;

      //     case SyncStatus.ERROR:
      //       this.messageText = 'An error occurred :( ...';
      //       alert(this.messageText);
      //       break;

      //     default:
      //       this.messageText = 'An unhandled sync status ..';
      //       // alert(this.messageText + ",staus:" + syncStatus);
      //       break;
      //   }

      // });
      

      Keyboard.disableScroll(true);
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
