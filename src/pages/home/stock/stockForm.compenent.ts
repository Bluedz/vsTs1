/**
 * 查看RFQ详细信息组件
 */
import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service'
import {UrlConfig} from '../../../assets/config/config.url'
@Component({
  templateUrl: 'stock-form.html',
  //styleUrls: ['../../../assets/css/default.scss'],
})
export class StockFormComponent {

  public stockInfo;
  public imgInfoList;
  public factoryInfo: String;
  public imgUrlStr;
  
  constructor(public navCtrl: NavController, public commonService: CommonService, public navParams : NavParams) {
    this.commonService = commonService;
    this.navParams = navParams;
   // this.imgUrlStr = UrlConfig.getImgUrl()+"?imgFilePath=";
    this.getStockInfo();
    //this.getstockImgInfo();
  }
  
  /**
   * 获取库存信息
   */
  getStockInfo () {
    this.stockInfo = this.navParams.data;
    // this.getFactoryInfo();
  }

  //获取物料信息
  getstockImgInfo () {
    this.imgInfoList = [];
    let method = "CSC_MOBILEMENUCONF.getImgInfo";
    let param = {};
    param["sds_no"] = this.stockInfo.STO_SDSMETERIALNO;
    let _this = this;
    this.commonService.callMethod(method, param).then(function (data) {
      var result = JSON.parse(data._body);
      if (result) {
        var imgs = result.imgInfo;
        if (imgs) {
          for (var i = 0; i < imgs.length; i++) {
            //imgs[i].IMG_URL = UrlConfig.getImgUrl()+"?imgFilePath="+imgs[i].IMG_URL;
            _this.imgInfoList.push(imgs[i]);
          }
        }

      }
      console.log(_this.imgInfoList);
    });

  }


  private getFactoryInfo() {
    let position: String = this.stockInfo.STO_POSISTION;
    if (position.startsWith("N") || position.startsWith("M") || position.startsWith("K")) {        //以n m k开头的
      this.factoryInfo = '南京';
    } else if (position.startsWith("Y") || position.startsWith("Z")) {
      this.factoryInfo = '仪征';
    } else if (position.startsWith("Q") || position.startsWith("H")) {
      this.factoryInfo = '宁波';
    } else if (position.startsWith("U") || position.startsWith("V")) {
      this.factoryInfo = '新疆';
    } else if (position.startsWith("R") || position.startsWith("C")) {
      this.factoryInfo = '长沙';
    } else if (position.startsWith("B")) {
      this.factoryInfo = '宁波二期';
    } else {
      this.factoryInfo = '上海';
    }
  }
}
