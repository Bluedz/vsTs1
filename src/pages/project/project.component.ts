import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { plantComponent} from '../plant/plant.component';
import {UrlConfig} from '../../assets/config/config.url';
import {CommonService} from '../../assets/common/common.service';

/*
  Generated class for the Project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class projectComponent {

  public menuList = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public commonService:CommonService ) {
    this.getMenus();
  }

  gotoplat(event,project){
    this.navCtrl.push(plantComponent,{project:project});
    
  }


    /**
   * 根据当前登录的用户的ID获取菜单
   */
  getMenus () {
    this.menuList = [];
    let method = "CSC_MOBILEMENUCONF.getAppProject";
    //method = 'CSC_MOBILEMENUCONF.getAllMenus';
    let param = {};
    param["user_id"] = UrlConfig.userInfo.userId;
    let _this = this;
    this.commonService.callMethod(method, param).then(function (data) {
      var result = JSON.parse(data._body);
      if (result) {
        var menus = result.project;
        if (menus) {
          for (var i = 0; i < menus.length; i++) {
            _this.menuList.push(menus[i]);
          }
        }

      }
      //console.log(_this.menuList);
    });

  }
}
