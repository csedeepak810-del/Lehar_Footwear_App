import { Component, ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController, IonicPage, ModalController, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { IonicSelectableComponent } from 'ionic-selectable';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { ConstantProvider } from '../../providers/constant/constant';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-loyalty-enter-coupon-code',
  templateUrl: 'loyalty-enter-coupon-code.html',
})
export class LoyaltyEnterCouponCodePage {
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  qr_code: any = '';
  data: any = {};
  flag: boolean = true;
  couponFlag: boolean = true;
  spinnerLoader: boolean = false;
  userType: any;
  lang:any='en';
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public modalCtrl: ModalController, public toastCtrl: ToastController, public navParams: NavParams, public service: MyserviceProvider, public alertCtrl: AlertController,
    public locationAccuracy: LocationAccuracy, public geolocation: Geolocation, public platform: Platform, public Constant: ConstantProvider, public openNativeSettings: OpenNativeSettings,public  translate:TranslateService,public storage: Storage) {
    this.userType = this.navParams.data;
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.get_user_lang();


  }

  ionViewDidLoad() {
  }

  lat:any;
  lng:any;
  scan_tips()
  {

    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
    .then(() => {
      let options = {
        maximumAge: 10000, timeout: 15000, enableHighAccuracy: true
      };
      this.geolocation.getCurrentPosition(options)
      .then((resp) => {
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
        console.log(this.lat + 'lat');
        console.log(this.lat + 'long');
        
        
        if(this.lat == null && this.lng == null){
          console.log("null lat",this.lat);
          
        }
        else{
          this.submit();
          
        }
        
        
      },
      error => {
        console.log('Error requesting location permissions', error);
        if(error){
          let alert = this.alertCtrl.create({
            title:'Alert!',
            cssClass:'action-close',
            subTitle:"Enable to get your location so, can't scan",
            buttons: ['OK']
          });
          alert.present();  
        }
        
      });
    });
  }



  submit() {

    if (this.data.code == undefined ||(this.data.code.length < 16)) {
      this.service.errorToast('Please Enter Coupon Code');
      return;
    }
    else {
      this.platform.ready().then(() => {
        this.spinnerLoader = true;
        this.service.addData({ 'coupon_code': this.data.code, 'is_mobile_manual_scan': 1 ,'lat': this.lat, 'lng': this.lng }, 'AppCouponScan/couponCodeScan').then((r: any) => {
          if (r['statusCode'] == 200 && r['bonus_point'] > 0) {
            this.spinnerLoader = false;
            this.data.code = '';
            this.service.successToast((r['coupon_point'] + r['bonus_point']) + " points has been added into your wallet");
          }
          else if (r['statusCode'] == 200) {
            this.spinnerLoader = false;
            this.data.code = '';
            this.service.successToast(r['coupon_point'] + " points has been added into your wallet");
          }
          else {
            this.spinnerLoader = false;
            this.data.code = '';
            this.service.errorToast(r['statusMsg']);
          }
        },
          error => {
            this.spinnerLoader = false;
            this.service.dismissLoading();
            this.service.Error_msg(error);
          });

      });
    }

  }

  presentConfirm(title, msg) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: title,
      message: msg,
      cssClass: 'alert-modal',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Settings',
          handler: () => {
            this.openSettings()
          }
        }
      ]
    });
    alert.present();
  }
  openSettings() {
    this.openNativeSettings.open("application_details")
  }


  tokenInfo:any={};
  get_user_lang()
  {
    this.storage.get("token")
    .then(resp=>{
      this.tokenInfo = this.getDecodedAccessToken(resp );
      console.log(this.tokenInfo)
      
      this.service.addData({"login_id":this.Constant.UserLoggedInData.id}, 'Login/userLanguage').then(result => {
        if (result['statusCode'] == 200) {
          this.lang = result['result']['app_language'];
          if(this.lang == "")
          {
            this.lang = "en";
          }
          this.translate.use(this.lang);
        }
        else {
          this.service.errorToast(result['statusMsg']);
          this.service.dismissLoading();
        }
      })
    })
  }

 
  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }


}