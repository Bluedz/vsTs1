/**
 * 查看RFQ详细信息组件
 */
import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service'
//import {UrlConfig} from '../../../assets/config/config.url'
@Component({
  templateUrl: 'req-form.html'
})
export class ReqFormComponent {

  public reqInfo;
  constructor( public commonService: CommonService, public navParams : NavParams) {
    this.commonService = commonService;
    this.navParams = navParams;
    this.getReqInfo();
  }
  
  /**
   * 根据当前登录的用户的ID获取菜单
   */
  getReqInfo () {
    this.reqInfo = this.navParams.data;
  }
}
