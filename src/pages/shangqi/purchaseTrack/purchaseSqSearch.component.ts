import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'purchaseTrackSq-search.html'
})

export class PurchaseSqSearchComponent {

    private filters;
    constructor(private navCtrl: NavController, private navParams : NavParams) {
        this.filters = navParams.data;
    }

    adSearch() {
        this.navCtrl.pop(this.filters);
    }
    
}