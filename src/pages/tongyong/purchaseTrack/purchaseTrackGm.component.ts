import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { List } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { PurchaseServiceGm } from './purchaseGm.service';
import { PurchaseGmTrackFormComponent } from './purchaseGmTrackForm.component';
import { PurchaseGmSearchComponent } from './purchaseGmSearch.component';

@Component({
    templateUrl: 'purchaseTrackGm-list.html'
})

export class PurchaseTrackGmComponent {

    public purchaseList = [];
    public pageInfo;
    public refresher = null;
    public infiniteScroll = null;
    public searchText = "";
    public isShowCancel = false;
    private currentPage = 1;
    private pageSize = 10;
    private totalPages;
    plant:any;

    @ViewChild(List) list: List;

    private filters = {
        applyCode: '',
        sdsCode: '',
        svwCode: '',
        maDesc: '',
        proj: ''
    };
    constructor(private loadingCtrl: LoadingController, private navCtrl: NavController, private navParams : NavParams, private purchaseService: PurchaseServiceGm) {
        // this.getPurchaseList();
        this.filters = navParams.data;
        this.plant = navParams.get("plant");
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter:' + this.filters);
        this.searchText = '';                               // 清空基础查询条件
        this.reSet();
        this.getPurchaseList();
    }

    getPurchaseList() {
        let _this = this;
        let filter = 'currentPage=' + _this.currentPage + '&pageSize=' + _this.pageSize + '&searchText=' + _this.searchText;
        if (_this.filters.applyCode) {
            filter += '&applyCode=' + _this.filters.applyCode;
        }
        if (_this.filters.sdsCode) {
            filter += '&sdsCode=' + _this.filters.sdsCode;
        }
        if (_this.filters.svwCode) {
            filter += '&svwCode=' + _this.filters.svwCode;
        }
        if (_this.filters.maDesc) {
            filter += '&maDesc=' + _this.filters.maDesc;
        }
        if(this.plant!="全部"){
            filter += "&proj="+this.plant+"";
        }

        console.log(filter);
        this.purchaseService.list(filter).then(response => {
            let res = response.json();
            let datas = res.data;
            _this.totalPages = res.totalPages;
            for (var i = 0; i < datas.length; i++) {
                _this.purchaseList.push(datas[i]);
            }
            console.log(_this.purchaseList);
        });

        if (_this.refresher != null) {
            _this.refresher.complete();
        }

        if (_this.infiniteScroll != null) {
            _this.infiniteScroll.complete();
        }
    }

    doInfinite (infiniteScroll) {
        if (this.currentPage + 1 <= this.totalPages) {
            this.currentPage += 1;
            this.infiniteScroll = infiniteScroll;
            this.getPurchaseList();
        } else {
            infiniteScroll.complete();
        }
        this.infiniteScroll = infiniteScroll;
        //infiniteScroll.complete();
    }

    doRefresh (refresher) {
        this.reSet();
        this.refresher = refresher;
        this.getPurchaseList();
        this.refresher.complete();
    }

    private reSet () {
        this.totalPages = 0;
        this.currentPage = 1;
        this.purchaseList = [];
    }

    onCancel ($event) {
        //this.isShowCancel = false;
        this.searchText = "";
    }

    onClear ($event) {
        //this.isShowCancel = false;
        this.reSet();
        this.searchText = ""; 
        this.getPurchaseList();
    }

    ionInput ($event) {
        //console.log($event);
        this.reSet();
        this.getPurchaseList();
    }

    itemClick(purchase) {
        this.navCtrl.push(PurchaseGmTrackFormComponent, purchase);
    }

    adSearch(filters) {
        this.navCtrl.push(PurchaseGmSearchComponent, filters);
    }

    // 关注
    attention(purchase) {
        let filter = "applyCode=" + purchase.applyCode;
        this.purchaseService.attention(filter).then(response => {
            let res = response.json();
            let isSuc = res.isSuc;
            if (isSuc && isSuc == '1') {
                this.list.closeSlidingItems();
            }
            let loader = this.loadingCtrl.create({
                content: res.msg,
                duration: 1000
            });
            loader.present();
            this.reSet();
            this.getPurchaseList();
        });
    }

    // 取消关注
    deAttention(purchase) {
        let filter = "applyCode=" + purchase.applyCode;
        this.purchaseService.deAttention(filter).then(response => {
            let res = response.json();
            let isSuc = res.isSuc;
            if (isSuc && isSuc == '1') {
                this.list.closeSlidingItems();
            }
            let loader = this.loadingCtrl.create({
                content: res.msg,
                duration: 1000
            });
            loader.present();
            this.reSet();
            this.getPurchaseList();
        });
    }

}