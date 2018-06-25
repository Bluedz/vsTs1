/**
 * 查看RFQ详细信息组件
 */
import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service'
//import {UrlConfig} from '../../../assets/config/config.url'
@Component({
  templateUrl: 'rfq-form.html',
  styleUrls: ['assets/css/default.scss'],
})
export class RfqFormComponent {

  public rfqInfo;
  constructor( public commonService: CommonService, public navParams : NavParams) {
    this.commonService = commonService;
    this.navParams = navParams;
    this.getRfqInfo();
  }
  
  /**
   * 根据当前登录的用户的ID获取菜单
   */
  getRfqInfo () {
    console.log(this.navParams.data)
    this.rfqInfo = this.navParams.data;
    // this.rfqInfo.RFQ_CODE = this.navParams.get("RFQ_CODE");
    // this.rfqInfo.RFQ_NAME = this.navParams.get("RFQ_NAME");
    // this.rfqInfo.RFQ_CREATEDATE = this.navParams.get("RFQ_CREATEDATE");
    // this.rfqInfo.RFQ_BUYER = this.navParams.get("RFQ_BUYER");
    // this.rfqInfo.RFQ_STATUS = this.navParams.get("RFQ_STATUS");
    // this.rfqInfo.RFQ_TYPE = this.navParams.get("RFQ_TYPE");
    // this.rfqInfo.RFQ_ISFRAME = this.navParams.get("RFQ_ISFRAME");
    console.log(this.rfqInfo);
    // var _method = "component.getListData";
    // var _param = {
    //   "bizObj": "CSC_RFQ_MAIN",
    //   "service": "selectOne",
    //   "fields": "*",
    //   "filter": "1=1",
    //   "currentPageIndex": 1,
    //   "pageSize": 1,
    //   "orderList": []
    // };
    // let _this = this;
    // this.commonService.callMethod(_method, _param).then(function (data) {
      
    //   var result = JSON.parse(data._body);
    //   if (result) {
        
    //   }
    // });    
    
  }
}
