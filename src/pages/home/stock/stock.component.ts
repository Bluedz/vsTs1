/**
 * 库存查询组件
 */
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service'
//import {UrlConfig} from '../../../assets/config/config.url'
import { StockFormComponent } from '../stock/stockForm.compenent';
import { StockSearchComponent } from './stockSearch.component';

@Component({
  templateUrl: 'stock-list.html',
  //styleUrls: ['../../../assets/css/default.scss'],
})
export class StockComponent {

  public stockList = [];
  public pageInfo;
  public refresher = null;
  public infiniteScroll = null;
  public searchText = "";
  public isShowCancel = false;
  private filters = {
      sdsCode: '',
      maDesc: '',
      proj: ''
  };
  plant:any;

  constructor(public navCtrl: NavController, public commonService: CommonService, private navParams : NavParams) {
    this.navCtrl = navCtrl;
    this.pageInfo = {};
    this.pageInfo.pageSize = 10;
    this.pageInfo.currentPageIndex = 1;
    this.pageInfo.allList = 0;
    this.pageInfo.allPage = 0;
    this.filters = navParams.data;
    this.plant = navParams.get("plant");
    this.getStockList();
  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter:' + this.filters);
      this.searchText = '';                               // 清空基础查询条件
      this.reSet();
      this.getStockList();
  }

  goSignupPage() {
    
  }
  /**
   * 根据当前登录的用户的ID获取菜单
   */
  getStockList () {
    
    var _method = "component.getListData";
    let filter:string = "1=1";
    let sText = this.searchText.toLocaleUpperCase();

    if(this.plant!="全部"){
      filter += " and STO_FACTORYINFO='"+this.plant+"'";
    }

    if (this.searchText != "") {
      filter += " and ( " + "STO_SDSMETERIALNO like '%" + sText + "%' or MAT_REMARK like '%" + this.searchText + "%' )"
    }

    let proj = this.filters.proj;
    if (proj != '' && proj != undefined) {
      if (proj != '01') {                      // 不是查全部
        if (proj == '02') {                    // 宁波
          filter += " and STO_FACTORYINFO = '宁波'";
        } else if (proj == '03') {             // 长沙
          filter += " and STO_FACTORYINFO = '长沙'";
        } else if (proj == '04') {             // 仪征
          filter += " and STO_FACTORYINFO = '仪征'";
        } else if (proj == '05') {             // 上海
          filter += " and STO_FACTORYINFO = '上海'";
        } else if (proj == '06') {             // 南京
          filter += " and STO_FACTORYINFO = '南京'";
        } else if (proj == '07') {             // 新疆
          filter += " and STO_FACTORYINFO = '新疆'";
        }
      }
    }

    let sdsCode = this.filters.sdsCode;
    if (sdsCode != '' && sdsCode != undefined) {
      filter += " and STO_SDSMETERIALNO like '%" + sdsCode + "%'";
    }

    let maDesc = this.filters.maDesc;
    if (maDesc != '' && maDesc != undefined) {
      if (maDesc.indexOf('@') > -1) {
        filter += " and MAT_REMARK like '%";
        let attrs: String[] = maDesc.split('@');
        for (var attr of attrs) {
          filter += attr + "%";
        }
        filter += "'";
      } else {
        filter += " and MAT_REMARK like '%" + maDesc + "%'";
      }
    }

    var _param = {
      "bizObj": "CSC_STORAGE",
      "service": "selectMore",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": this.pageInfo.currentPageIndex,
      "pageSize": this.pageInfo.pageSize,
      "orderList": []
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
          _this.stockList.push(datas[i]);
        }
      }
    });    
    this.getCount(filter);
  }

  getCount (filter) {
    var _method = "application.getGridPaginate";
    var _param = {
      "bizObj": "CSC_STORAGE",
      "service": "selectCount",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": 1,
      "pageSize": 10,
      "orderList": []
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
  itemClick (stock) {
    this.navCtrl.push(StockFormComponent, stock);
  }
  onCancel ($event) {
    //this.isShowCancel = false;
    this.searchText = "";
  }
  onClear ($event) {
    //this.isShowCancel = false;
    this.reSet();
    this.searchText = "";
    this.getStockList();
  }
  ionInput ($event) {
    //console.log($event);
    this.reSet();
    this.getStockList();
  }
  doInfinite (infiniteScroll) {
    if (this.pageInfo.currentPageIndex + 1 <= this.pageInfo.allPage) {
      this.pageInfo.currentPageIndex += 1;
      this.infiniteScroll = infiniteScroll;
      this.getStockList();
    } else {
      infiniteScroll.complete();
    }
    //infiniteScroll.complete();
  }
  doRefresh (refresher) {
    this.reSet();
    this.refresher = refresher;
    this.getStockList();
  }
  private reSet () {
    this.pageInfo.allPage = 0;
    this.pageInfo.currentPageIndex = 1;
    this.stockList = [];
  }

  adSearch(filters) {
      this.navCtrl.push(StockSearchComponent, filters);
  }
}
