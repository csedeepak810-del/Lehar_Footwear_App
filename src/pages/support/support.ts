import { Component } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';
import { ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SupportListPage } from '../support-list/support-list';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";
import { Device } from '@ionic-native/device';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  data: any = {};
  selectImage: any = [];
  typeSupport: any = [];
  savingFlag: boolean = false;
  spinnerLoader: boolean = false;
  lang: any = 'en';
image:any=''
  constructor(public Device:Device, public storage: Storage, public constant: ConstantProvider, public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public actionSheetController: ActionSheetController, private camera: Camera, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public translate: TranslateService, public diagnostic: Diagnostic,
    public openNativeSettings: OpenNativeSettings,) {
    this.lang = this.navParams.get("lang");
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.get_user_lang();
    this.service.presentLoading();
  }

  ionViewWillEnter() {
    this.getSupport();

  }


  getSupport() {
    this.service.addData({}, 'AppSupport/getSupportcategory').then((result) => {

      if (result['statusCode'] == 200) {
        this.typeSupport = result['data'];
        this.service.dismissLoading();
      }
      else {
        this.service.errorToast(result['statusMsg']);
        this.service.dismissLoading();
      }
    });
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


  onUploadChange(evt: any) {
    let actionsheet = this.actionSheetController.create({
      title: 'Upload File',
      cssClass: 'cs-actionsheet',

      buttons: [{
        cssClass: 'sheet-m',
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.takePhoto();
        }
      },
      {
        cssClass: 'sheet-m1',
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.getImage();
        }
      },
      {
        cssClass: 'cs-cancel',
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.selectImage = [];
        }
      }]
    });
    actionsheet.present();
  }
  takePhoto() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 400
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      if (imageData.startsWith('data:image')) {
        this.image = imageData;
      } else {
        this.image = 'data:image/jpeg;base64,' + imageData;
      }
      this.selectImage.push(this.image);
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    this.presentConfirm('Error Occured', error);
  });
  }

  getImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      var image = 'data:image/jpeg;base64,' + imageData;
        if (imageData.startsWith('data:image')) {
        image = imageData;
      } else {
        image = 'data:image/jpeg;base64,' + imageData;
      }
      this.selectImage.push(image);
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }).catch((error: any) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    this.presentConfirm('Error Occured', error);
  });
  }

  delete_img(index) {
    this.selectImage.splice(index, 1);
  }


  submit() {
    this.data.image = this.selectImage;
    this.savingFlag == true;
    this.spinnerLoader = true;
    this.service.addData({ 'data': this.data }, 'AppSupport/addSupport')
      .then((result) => {

        if (result['statusCode'] == 200) {
          this.spinnerLoader = true;

          this.navCtrl.popTo(SupportListPage);
          this.service.successToast(result['statusMsg']);
          this.savingFlag == false;
        }
        else {
          this.service.errorToast(result['statusMsg']);
          this.savingFlag == false;
        }

      }, error => {
        this.savingFlag == false;

        this.service.Error_msg(error);
        this.service.dismiss();
      });
  }

  tokenInfo: any = {};
  get_user_lang() {
    this.storage.get("token")
      .then(resp => {
        this.tokenInfo = this.getDecodedAccessToken(resp);

        this.service.addData({ "login_id": this.constant.UserLoggedInData.id }, 'Login/userLanguage').then(result => {
          if (result['statusCode'] == 200) {
            this.lang = result['result']['app_language'];
            if (this.lang == "") {
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
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
}
