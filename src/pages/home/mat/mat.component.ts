/**
 * Created by yaopengchao on 2017/5/16.
 * 物料查询
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CommonService} from '../../../assets/common/common.service';
import { MatFormComponent } from  '../mat/matForm.component';
import { MatSearchComponent } from './matSearch.component';

@Component({
  templateUrl: 'mat-list.html',
  //styleUrls: ['../../../assets/css/default.scss'],
})
export class MatComponent {
  public matList = [];
  public pageInfo;
  public refresher = null;
  public infiniteScroll = null;
  public searchText = "";
  public isShowCancel = false;
  private filters = {
      sdsCode: '',
      maDesc: ''
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
    this.getMatList();
  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter:' + this.filters);
      this.searchText = '';                               // 清空基础查询条件
      this.reSet();
      this.getMatList();
  }

  getMatList () {
    var _method = "component.getListData";
    let filter:string = "1=1";
    let sText = this.searchText.toLocaleUpperCase();

    if (this.searchText != "") {
      filter += " and ( " + "MAT_MATERIALNO like '%" + sText + "%' or MAT_REMARK like '%" + this.searchText + "%' )"
    }

    let sdsCode = this.filters.sdsCode;
    if (sdsCode != '' && sdsCode != undefined) {
      filter += " and MAT_MATERIALNO like '%" + sdsCode + "%'";
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
      "bizObj": "CSC_MATERIAL",
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
          _this.matList.push(datas[i]);
        }
      }
    });
    this.getCount(filter);
  }

  getCount (filter) {
    var _method = "application.getGridPaginate";
    var _param = {
      "bizObj": "CSC_MATERIAL",
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

  itemClick (mat) {
    this.navCtrl.push(MatFormComponent, mat);
  }

  onCancel ($event) {
    //this.isShowCancel = false;
    this.searchText = "";
  }

  onClear ($event) {
    //this.isShowCancel = false;
    this.reSet();
    this.searchText = "";
    this.getMatList();
  }

  ionInput ($event) {
    //console.log($event);
    this.reSet();
    this.getMatList();
  }

  doInfinite (infiniteScroll) {
    if (this.pageInfo.currentPageIndex + 1 <= this.pageInfo.allPage) {
      this.pageInfo.currentPageIndex += 1;
      this.infiniteScroll = infiniteScroll;
      this.getMatList();
    } else {
      infiniteScroll.complete();
    }
    //infiniteScroll.complete();
  }

  doRefresh (refresher) {
    this.reSet();
    this.refresher = refresher;
    this.getMatList();
  }

  private reSet () {
    this.pageInfo.allPage = 0;
    this.pageInfo.currentPageIndex = 1;
    this.matList = [];
  }

  adSearch(filters) {
      this.navCtrl.push(MatSearchComponent, filters);
  }
}
