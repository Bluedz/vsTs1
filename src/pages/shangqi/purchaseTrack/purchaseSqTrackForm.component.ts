import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'purchaseSqTrack-form.html'
})

export class PurchaseSqTrackFromComponent {

    private purchaseTrack;
    constructor(private navCtrl: NavController, private navParams : NavParams) {
        this.purchaseTrack = navParams.data;
    }

}