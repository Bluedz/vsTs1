import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import { LoginComponent } from '../login/login.component';
import {CommonService} from '../../assets/common/common.service'
import {UrlConfig} from '../../assets/config/config.url'
import { RfqComponent } from './rfq/rfq.component';
import { StockComponent } from './stock/stock.component';
import { ReqComponent } from './req/req.component';
import { MatComponent } from './mat/mat.component';
import { PurchaseTrackComponent } from './purchaseTrack/purchaseTrack.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomeComponent {

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
  /**
   * 根据当前登录的用户的ID获取菜单
   */
  getMenus () {
    this.menuList = [];
    let method = "CSC_MOBILEMENUCONF.getAppMenus";
    //method = 'CSC_MOBILEMENUCONF.getAllMenus';
    let param = {};
    param["user_id"] = UrlConfig.userInfo.userId;
    let _this = this;
    this.commonService.callMethod(method, param).then(function (data) {
      var result = JSON.parse(data._body);
      if (result) {
        var menus = result.menu;
        if (menus) {
          for (var i = 0; i < menus.length; i++) {
            if ((i % 3) == 0) {
              var temp = [];
              temp.push(menus[i]);
              _this.menuList.push(temp);
            } else {
              let l = _this.menuList.length - 1;
              if (l >= 0) {
                _this.menuList[l].push(menus[i]);
              }
            }
          }
        }

      }
      console.log(_this.menuList);
    });

  }

  getMenusNew () {
    this.menuList = [];
    let method = "CSC_MOBILEMENUCONF.getAppMenus";
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
    console.log(event);
    let page = null;
    if (menu.MMC_ACTION == "/rfqlist") {
      page = RfqComponent;
    } else if (menu.MMC_ACTION == "/stock") {
      page = StockComponent;
    } else if (menu.MMC_ACTION == "/reqlist") {
      page = ReqComponent;
    } else if (menu.MMC_ACTION == '/matlist') {
      page = MatComponent;
    } else if (menu.MMC_ACTION == '/purchaseTrack') {
      page = PurchaseTrackComponent;
    }
    console.log(menu.MMC_ACTION)
    if (page != null) {
      this.navCtrl.push(page,{plant:this.plant});
    }
  }
}
