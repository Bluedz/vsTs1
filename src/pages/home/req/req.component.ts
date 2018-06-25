import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service'
import { ReqFormComponent } from '../req/reqForm.compenent';
@Component({
  templateUrl: 'req-list.html'
})
/**
 * 申购单
 */
export class ReqComponent {

  public reqList = [];
  public pageInfo;
  public refresher = null;
  public infiniteScroll = null;
  public searchText = "";
  public isShowCancel = false;
  plant:any;
  constructor(public navCtrl: NavController, public commonService: CommonService,public navParams:NavParams) {
    this.navCtrl = navCtrl;
    this.pageInfo = {};
    this.pageInfo.pageSize = 10;
    this.pageInfo.currentPageIndex = 1;
    this.pageInfo.allList = 0;
    this.pageInfo.allPage = 0;
    this.plant = navParams.get('plant');
    console.log(this.plant);
    this.getReqList();
  }
  goSignupPage() {
    
  }
  /**
   * 根据当前登录的用户的ID获取菜单
   */
  getReqList () {
    
    var _method = "component.getListData";
    
    let filter:string = "";
    if(this.plant=="全部"){
      filter="1=1";
    }else{
      filter="REQ_PLANT ='"+this.plant+"'";
    }
    let sText = this.searchText.toLocaleUpperCase();
    if (this.searchText != "") {
      filter += " and ( " + "REQ_APPLYCODE like '%" + sText + "%' or REQ_DESCRIPTION like '%" + this.searchText + "%' or REQ_MATERIALNO like '%"
         + sText + " %' )"
    }
    var _param = {
      "bizObj": "CSC_PURCHASE_REQUISITION",
      "service": "selectMore",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": this.pageInfo.currentPageIndex,
      "pageSize": this.pageInfo.pageSize,
      "orderList": [{"field":"REQ_GENERATEDATE","order":"DESC"}]
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
          _this.reqList.push(datas[i]);
        }
      }
    });    
    this.getReqCount(filter);
  }

  getReqCount (filter) {
    var _method = "application.getGridPaginate";
    var _param = {
      "bizObj": "CSC_PURCHASE_REQUISITION",
      "service": "selectCount",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": 1,
      "pageSize": 10,
      "orderList": [{"field":"REQ_GENERATEDATE","order":"DESC"}]
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
  itemClick (req) {
    this.navCtrl.push(ReqFormComponent, req);
  }
  onCancel ($event) {
    //this.isShowCancel = false;
    this.searchText = "";
  }
  onClear ($event) {
    //this.isShowCancel = false;
    this.reSet();
    this.searchText = "";
    this.getReqList();
  }
  ionInput ($event) {
    //console.log($event);
    this.reSet();
    this.getReqList();
  }
  doInfinite (infiniteScroll) {
    if (this.pageInfo.currentPageIndex + 1 <= this.pageInfo.allPage) {
      this.pageInfo.currentPageIndex += 1;
      this.infiniteScroll = infiniteScroll;
      this.getReqList();
    } else {
      infiniteScroll.complete();
    }
    //infiniteScroll.complete();
  }
  doRefresh (refresher) {
    this.pageInfo.allPage = 0;
    this.pageInfo.currentPageIndex = 1;
    this.reqList = [];
    this.refresher = refresher;
    this.getReqList();
  }
  private reSet () {
    this.pageInfo.allPage = 0;
    this.pageInfo.currentPageIndex = 1;
    this.reqList = [];
  }
}
