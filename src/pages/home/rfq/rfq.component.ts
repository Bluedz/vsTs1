import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service'
//import {UrlConfig} from '../../../assets/config/config.url'
import { RfqFormComponent } from '../rfqform/rfqForm.compenent';
@Component({
  templateUrl: 'rfq-list.html'
})
/**
 * 查询 RFQ
 */
export class RfqComponent {

  public rfqList = [];
  public pageInfo;
  public refresher = null;
  public infiniteScroll = null;
  public searchText = "";
  public isShowCancel = false;
  constructor(public navCtrl: NavController, public commonService: CommonService) {
    this.navCtrl = navCtrl;
    this.pageInfo = {};
    this.pageInfo.pageSize = 10;
    this.pageInfo.currentPageIndex = 1;
    this.pageInfo.allList = 0;
    this.pageInfo.allPage = 0;
    this.getRfqList();
  }
  goSignupPage() {
    
  }
  /**
   * 根据当前登录的用户的ID获取菜单
   */
  getRfqList () {
    
    var _method = "component.getListData";
    let filter:string = "1=1";
    let sText = this.searchText.toLocaleUpperCase();
    if (this.searchText != "") {
      filter += " and ( " + "RFQ_CODE like '%" + sText + "%' or RFQ_NAME like '%" + this.searchText + "%' or RFQ_BUYER like '%"
         + this.searchText + " %' )"
    }
    var _param = {
      "bizObj": "CSC_RFQ_MAIN",
      "service": "selectRfqMore",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": this.pageInfo.currentPageIndex,
      "pageSize": this.pageInfo.pageSize,
      "orderList": [{"field":"RFQ_ID","order":"DESC"}]
    };
    let _this = this;
    this.commonService.callMethod(_method, _param).then(function (data) {
      if (_this.infiniteScroll != null) {
        _this.infiniteScroll.complete();
        _this.infiniteScroll = null;
      }
      if (_this.refresher != null) {
        _this.refresher.complete();
        _this.refresher = null;
      }
      var result = JSON.parse(data._body);
      if (result) {
        var datas = result.datas;
        for (var i = 0; i < datas.length; i++) {
          _this.rfqList.push(datas[i]);
        }
      }
    });    
    this.getRfqCount(filter);
  }

  getRfqCount (filter) {
    var _method = "application.getGridPaginate";
    var _param = {
      "bizObj": "CSC_RFQ_MAIN",
      "service": "selectCount",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": 1,
      "pageSize": 10,
      "orderList": [{"field":"RFQ_ID","order":"DESC"}]
    };
    let _this = this;
    this.commonService.callMethod(_method, _param).then(function (data) {
      var result = JSON.parse(data._body);
      if (result) {
        var paginate = result.paginate;
        _this.pageInfo.allList = paginate.allList;
        _this.pageInfo.allPage = paginate.allPage;
      }
    });    
  }
  itemClick (rfq) {
    this.navCtrl.push(RfqFormComponent, rfq);
  }
  onCancel ($event) {
    //this.isShowCancel = false;
    this.searchText = "";
  }
  onClear ($event) {
    //this.isShowCancel = false;
    this.reSet();
    this.searchText = "";
    this.getRfqList();
  }
  ionInput ($event) {
    //console.log($event);
    this.reSet();
    this.getRfqList();
  }
  doInfinite (infiniteScroll) {
    if (this.pageInfo.currentPageIndex + 1 <= this.pageInfo.allPage) {
      this.pageInfo.currentPageIndex += 1;
      this.infiniteScroll = infiniteScroll;
      this.getRfqList();
    } else {
      infiniteScroll.complete();
    }
    //infiniteScroll.complete();
  }
  doRefresh (refresher) {
    this.pageInfo.allPage = 0;
    this.pageInfo.currentPageIndex = 1;
    this.rfqList = [];
    this.refresher = refresher;
    this.getRfqList();
  }
  private reSet () {
    this.pageInfo.allPage = 0;
    this.pageInfo.currentPageIndex = 1;
    this.rfqList = [];
  }
}
