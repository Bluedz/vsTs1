/**
 * Created by Administrator on 2017/5/20.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions } from '@ionic-native/themeable-browser';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AppConfig } from './app.config';
import { UrlConfig } from '../assets/config/config.url';

@Injectable()

export class AppService {
  public curVersion: String;
  public aKey: String;
  public viewAppGroupUrl: string = 'http://www.pgyer.com/apiv1/app/viewGroup';
  public headers: Headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});

  constructor (public http: Http, private alert: AlertController, public appVersion: AppVersion,
               private platform: Platform,
               public  appBrowser: InAppBrowser, public themeBrowser: ThemeableBrowser,
               public  fileTransfer: TransferObject, private file: File, private transfer: Transfer,
               private fileOpener: FileOpener, private loadingCtrl: LoadingController) {
  }

  private isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  public isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  public  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  public listAppGroup(url: string, param: String) {
    return this.http.post(url, param, {
      headers: this.headers
    }).toPromise();
  }

  public installApp(url: string) {
    console.log(url);
    return this.http.get(url, {
      headers: this.headers
    }).toPromise();
  }

  public openUrlByBrowser(url:string):void {
    this.appBrowser.create(url, '_system');
  }

  public downloadApp(url: string) {
    const fileTransfer: TransferObject = this.transfer.create();
    const apk = this.file.externalRootDirectory + 'cscApp.apk'; //apk保存的目录

    if (this.isAndroid()) {
      let alertCtrl = this.alert.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      });
      alertCtrl.present();

      // alert('apk:::' + apk);
      fileTransfer.download(url, apk).then(() => {
        // alert('download');
        this.fileOpener.open(apk, 'application/vnd.android.package-archive').then(function(){
          // alert('11sss')
          console.log('over')
        },function(err){
          alert('安装失败' + err.code + "," + err.error);
        })
      }).catch(error => {
          alert('下载失败：' + error.error + "," + error.code);
      });

      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {
          alertCtrl.dismiss();
        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    } else if (this.isIos()) {
      this.openUrlByBrowser(url);
    }
  }

  public getCurrentVersion() {
    return this.appVersion.getVersionNumber();
  }

  public checkUpdate(isAuto?: String) {
    // 获取APP当前的版本号
    this.getCurrentVersion().then((value: string) => {
      this.curVersion = value;
      AppConfig.setVersion(value);

      if (this.isAndroid()) {
        // 查询是否需要升级
        let baseUrl: string = UrlConfig.getBaseUrl();
        let url = baseUrl + '/appService/checkUpdate?authKey=' + UrlConfig.authKey;
        let filter = 'curVersion=' + this.curVersion;
        this.http.post(url, filter, {
          headers: this.headers
        }).toPromise().then((response) => {
          let data = response.json();
          if (data.needUpdate == '1') {     // 需要更新
            let alert = this.alert.create({
              title: '应用更新',
              message: '检测到有新的更新，请前往应用商店进行更新.',
              enableBackdropDismiss: false,
              buttons: [{
                text :'确定',
                handler: () => {
                  return false;
                }
              }]
            });
            alert.present();
          } else {
            if (isAuto) {             // 检查更新,需要提示无更新
              let alertUpdate = this.alert.create({
                title: '版本检测',
                message: '您的版本已经是最新的版本',
                buttons: [
                  {
                    text: '确定'
                  }
                ]
              });
              alertUpdate.present();
            }
          }
        });
      }
    }).catch(err => {
      console.log('getVersionNumber:' + err);
    });

  }

  public checkVersion(isAuto?: String) {
    // 获取最新的版本号
    this.getCurrentVersion();
    let needUpdate: boolean = false;
    let thisObj = this;
    let _param:String = 'aId=a5045156201079e12682ccd506b5494a&_api_key=4c2382ab2585a1239d317fa9f7400474';
    this.listAppGroup(this.viewAppGroupUrl, _param).then( function(response)  {
      return response.json().data;
    }).then(function (data) {
      for (let appInfo of data) {
        let isLastest = appInfo.appIsLastest;
        if (isLastest == '1') {                      // 最新版
          let appVersion = appInfo.appVersion;
          if (appVersion != thisObj.curVersion) {
            needUpdate = true;
            let alertDialog = thisObj.alert.create({
              title: '版本更新',
              message: '系统检测到有新的版本，请更新.',
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: '更新',
                  handler: () => {
                    let url = 'http://www.pgyer.com/apiv1/app/install?aKey=' + appInfo.appKey + '&_api_key=4c2382ab2585a1239d317fa9f7400474&password=csc';
                    thisObj.downloadApp(url);
                  }
                }
              ]
            });
            alertDialog.present();
          }
          break;
        }
      }
      if (!needUpdate) {          // 不需要更新
        if (isAuto) {             // 检查更新,需要提示无更新
          let alertUpdate = thisObj.alert.create({
            title: '版本检测',
            message: '您的版本已经是最新的版本',
            buttons: [
              {
                text: '确定'
              }
            ]
          });
          alertUpdate.present();
        }
      }
    }).then(function(result){
      console.log('success->',result);
    })
    .catch(function(error){
      console.log('something gose wrong->',error);
    });
  }

}
