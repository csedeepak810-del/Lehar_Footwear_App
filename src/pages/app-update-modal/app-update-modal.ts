

import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';
import { Device } from '@ionic-native/device';


@Component({
  selector: 'page-app-update-modal',
  templateUrl: 'app-update-modal.html',
})
export class AppUpdateModalPage {
  platformType: string = '';
  constructor(public Device: Device,private modalCtrl: ModalController,public viewcontrol: ViewController, ) {}

  dismiss() {
   this.viewcontrol.dismiss();
  }

  updateNow() {
    if (this.Device.platform=='Android') {
      window.open('market://details?id=com.Lehar FootwearSFABasiq360&hl=en', '_system', 'location=yes');
    } else {
      // Replace with actual iOS App Store ID
      window.open('https://apps.apple.com/app/id6751023903', '_system', 'location=yes');
    }
    this.viewcontrol.dismiss();
  }
}

