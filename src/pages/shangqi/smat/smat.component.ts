/**
 * Created by yaopengchao on 2017/5/16.
 * 物料查询
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonService } from '../../../assets/common/common.service';
import { SMatFormComponent } from './smatForm.component'
import { SMatSearchComponent } from './smatSearch.component'
@Component({
  templateUrl: 'smat-list.html',
  //styleUrls: ['../../../assets/css/default.scss'],
})
export class SMatComponent {
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
    //由于上汽项目比较特殊，物料是区分厂区的
    if (this.plant != '全部' && this.plant != null && this.plant != undefined && this.plant != '') {
      filter += " and MAT_FACTORYAREA = '" + this.plant + "'";
    }
    // let sText = this.searchText.toLocaleUpperCase();

    // if (this.searchText != "") {
    //   filter += " and ( " + "MAT_MATERIALNO like '%" + sText + "%' or MAT_DESCRIPTION like '%" + this.searchText + "%' or MAT_DESCRIPTIONEN like '%"
    //     + this.searchText + "%' or MAT_MODEL like '%"  + this.searchText + "%'  )";
    // }

    let sdsCode = this.filters.sdsCode;
    if (sdsCode != '' && sdsCode != undefined) {
      filter += " and upper(MAT_MATERIALNO) like upper('%" + sdsCode + "%')";
    }

    let maDesc = this.filters.maDesc;
    if (maDesc != '' && maDesc != undefined) {
      if (maDesc.indexOf('@') > -1) {
        let attrs: String[] = maDesc.split('@');
        for (var attr of attrs) {
          filter += " and (MAT_DESCRIPTION like '%" + attr + "%' " 
            + " or upper(MAT_DESCRIPTIONEN) like upper('%"+ attr +"%') " 
            + " or upper(MAT_MODEL) like upper('%" + attr + "%')) ";
        }
      } else {
        filter += " and (MAT_DESCRIPTION like '%" + maDesc + "%' " 
            + " or upper(MAT_DESCRIPTIONEN) like upper('%"+ maDesc +"%') " 
            + " or upper(MAT_MODEL) like upper('%" + maDesc + "%')) ";
      }
    }

    var _param = {
      "bizObj": "CSC_MATERIAL_SAIC",
      "service": "selectMore",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": this.pageInfo.currentPageIndex,
      "pageSize": this.pageInfo.pageSize,
      "orderList": [{field:'MAT_MATERIALNO',order:'asc'}]
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
      "bizObj": "CSC_MATERIAL_SAIC",
      "service": "selectCount",
      "fields": "*",
      "filter": filter,
      "currentPageIndex": 1,
      "pageSize": 10,
      "orderList": [{field:'MAT_MATERIALNO',order:'asc'}]
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
    this.navCtrl.push(SMatFormComponent, mat);
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
      this.navCtrl.push(SMatSearchComponent, filters);
  }
}
