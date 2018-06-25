import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeComponent } from '../home/home.component';
import { SHomeComponent } from '../shangqi/shome.component';
import {UrlConfig} from '../../assets/config/config.url';
import {CommonService} from '../../assets/common/common.service';
import { THomeComponent } from '../tongyong/thome.component'
/*
  Generated class for the Plant page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-plant',
  templateUrl: 'plant.html'
})
export class plantComponent {

  public menuList = [];
  project:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public commonService:CommonService) {
    this.project = navParams.get("project");
    console.log(this.project);
    this.getMenus();

  }

  appcodeview(event,plant) {
    if(this.project=="大众项目"){
      this.navCtrl.push(HomeComponent,{
        plant: plant
      });
    } else if (this.project == '上汽项目') {
      this.navCtrl.push(SHomeComponent,{
        plant: plant
      });
    } else if (this.project == '通用项目') {
      this.navCtrl.push(THomeComponent,{
        plant: plant
      });
    }
   
  }


   /**
   * 根据当前登录的用户的ID获取菜单
   */
  getMenus () {
    this.menuList = [];
  
    let  method = "CSC_MOBILEMENUCONF.getAppPlant";
    
    
    //method = 'CSC_MOBILEMENUCONF.getAllMenus';
    let param = {};
    param["user_id"] = UrlConfig.userInfo.userId;
    param["project"] = this.project;
    let _this = this;
    this.commonService.callMethod(method, param).then(function (data) {
      var result = JSON.parse(data._body);
      if (result) {
        var menus = result.plant;
        if (menus) {
          for (var i = 0; i < menus.length; i++) {
            _this.menuList.push(menus[i]);
          }
        }

      }
      console.log(_this.menuList);
    });

  }
}
