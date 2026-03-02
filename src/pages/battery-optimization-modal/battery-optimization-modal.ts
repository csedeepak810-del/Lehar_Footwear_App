import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import BackgroundGeolocation, { DeviceSettingsRequest } from "cordova-background-geolocation-lt";
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the BatteryOptimizationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-battery-optimization-modal',
  templateUrl: 'battery-optimization-modal.html',
})
export class BatteryOptimizationModalPage {
  navData: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public iab: InAppBrowser, public viewcontrol: ViewController, private platform: Platform) {
    this.navData.message = navParams.get('message')
    this.navData.request = navParams.get('request')
  }


  ionViewWillEnter() {
    this.platform.resume.subscribe(() => {
      this.checkBatteryOptimizations();
    });
  }
  async checkBatteryOptimizations() {
    let isIgnoring = await BackgroundGeolocation.deviceSettings.isIgnoringBatteryOptimizations();
    console.log(isIgnoring, 'checkBatteryOptimizations')
    if (isIgnoring == true) {
      this.viewcontrol.dismiss(true);
    } else {
      return
    }

  }
  goToSetting() {
    BackgroundGeolocation.deviceSettings.show(this.navData.request);
    this.viewcontrol.dismiss(false);
  }
  goToDonotlkillmyapp() {
    this.iab.create('https://dontkillmyapp.com/', '_system');
  }
}
