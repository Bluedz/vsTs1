import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'stock-search.html'
})

export class StockSearchComponent {

    private filters;
    private proj;

    constructor(private navCtrl: NavController, private navParams : NavParams) {
        this.filters = navParams.data;
    }

    adSearch() {
        this.navCtrl.pop(this.filters);
    }
    
}