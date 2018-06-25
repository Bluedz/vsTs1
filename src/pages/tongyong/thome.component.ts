import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import {CommonService} from '../../assets/common/common.service'
import {UrlConfig} from '../../assets/config/config.url'
import {TMatComponent} from './tmat/tmat.component'
import { TStockComponent } from './tstock/tstock.component';
import { PurchaseTrackGmComponent } from './purchaseTrack/purchaseTrackGm.component';

@Component({
  selector: 'page-thome',
  templateUrl: 'thome.html'
})
export class THomeComponent {

  plant:any;
  public menuList = [];
  constructor(public navCtrl: NavController, public commonService: CommonService,public navParams:NavParams) {
    this.plant = navParams.get('plant');
    console.log(this.plant);
    this.navCtrl = navCtrl;
    this.getMenusNew();
  }
  goSignupPage() {

  }
  
  getMenusNew () {
    this.menuList = [];
    let method = "CSC_MOBILEMENUCONF.getTongYongAppMenus";
    let param = {};
    param["user_id"] = UrlConfig.userInfo.userId;
    let _this = this;
    this.commonService.callMethod(method, param).then(function (data) {
      var result = JSON.parse(data._body);
      if (result) {
        var menus = result.menu;
        if (menus) {
          for (var i = 0; i < menus.length; i++) {
            _this.menuList.push(menus[i]);
          }
        }

      }
      console.log(_this.menuList);
    });

  }

  goTo (event, menu) {
    //console.log(event);
    let page = null;
    if (menu.MMC_ACTION == "/matlist") {
      page = TMatComponent;
    } else if (menu.MMC_ACTION == "/stock") {
      page = TStockComponent;
    } else if (menu.MMC_ACTION == "/purchaseTrack") {
      page = PurchaseTrackGmComponent;
    }
    //console.log(menu.MMC_ACTION)
    if (page != null) {
      this.navCtrl.push(page,{plant:this.plant});
    }
  }
}
