import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'purchaseTrack-form.html'
})

export class PurchaseTrackFromComponent {

    private purchaseTrack;
    constructor(private navCtrl: NavController, private navParams : NavParams) {
        this.purchaseTrack = navParams.data;
    }

}