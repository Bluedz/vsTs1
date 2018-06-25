/**
 * Created by yaopengchao on 2017/5/16.
 * 查看物料详细信息
 */
import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service'
@Component({
  templateUrl: 'sstock-form.html',
})
export class SStockFormComponent {

  public stockInfo;

  constructor( public commonService: CommonService, public navParams : NavParams) {
    this.commonService = commonService;
    this.navParams = navParams;
    this.getStockInfo();
  }

  /**
   * 根据当前登录的用户的ID获取菜单
   */
  getStockInfo () {
    this.stockInfo = this.navParams.data;
  }
}
