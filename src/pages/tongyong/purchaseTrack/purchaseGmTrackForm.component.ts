import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'purchaseGmTrack-form.html'
})

export class PurchaseGmTrackFormComponent {

    private purchaseTrack;
    constructor(private navCtrl: NavController, private navParams : NavParams) {
        this.purchaseTrack = navParams.data;
    }

}