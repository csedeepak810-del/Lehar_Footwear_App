import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, Navbar, ModalController, Platform, Nav, App, Events } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import { PrimaryOrderMainPage } from '../primary-order-main/primary-order-main';
import { ConstantProvider } from '../../providers/constant/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CollectionPage } from '../collection/collection';
import {Device} from '@ionic-native/device'
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
declare let cordova: any;

/**
 * Generated class for the CollectionAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collection-add',
  templateUrl: 'collection-add.html',
})
export class CollectionAddPage {
  @ViewChild('distributorSelectable') distributorSelectable: IonicSelectableComponent;

  data: any = {};
  form: any = {};
  loader: boolean = false;
  drList: any = [];
  today_date = new Date().toISOString().slice(0, 10);
  btndisable: boolean = false;
  savingFlag:boolean=false

  constructor(
    public events: Events,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public service: MyserviceProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public openNativeSettings: OpenNativeSettings,
    public Device:Device,
    public diagnostic: Diagnostic,
    public storage: Storage,
    public modal: ModalController,
    public platform: Platform,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public constant: ConstantProvider,
    public appCtrl: App) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionAddPage');
    this.getAllNetworkType() 
  }


  allNetworkType: any = [];
  getAllNetworkType() {
      this.service.addData({}, "AppOrder/orderDrList")
          .then(resp => {
              if (resp['statusCode'] == 200) {
                  this.allNetworkType = resp['modules'];
              } else {
                  this.service.errorToast(resp['statusMsg'])

              }
          }, err => { })
  }

  
  distributors(data, masterSearch) {
    let type
    if (this.form.networkType) {
        type = this.form.networkType.type

    }
    this.loader = true;
    this.service.addData({ 'dr_type': type, 'master_search': masterSearch}, 'AppOrder/followupCustomer').then((result) => {
            if (result['statusCode'] == 200) {
                this.loader = false;
                this.drList = result['result'];
                if (this.navParams.get('from') && this.navParams.get('from') == 'DistPrimary') {
                    let existIndex
                    existIndex = this.drList.findIndex(row => row.id == this.data.type_name);
                    if (existIndex != -1) {
                        this.data.type_name.min_ton = this.drList[existIndex]['min_ton']
                        console.log(this.drList, "dr list")

                    }
                }
            } else {
                this.loader = false;
                this.service.errorToast(result['statusMsg'])
            }
    });

}

closeDealer() {
  this.distributorSelectable._searchText = '';
}


captureMedia(type) {
  console.log(type);

  let actionsheet = this.actionSheetController.create({
    title: "Upload Image",
    cssClass: 'cs-actionsheet',
    buttons: [{
      cssClass: 'sheet-m',
      text: 'Camera',
      icon: 'camera',
      handler: () => {
        this.takePhoto(type);
      }
    },
    {
      cssClass: 'sheet-m1',
      text: 'Gallery',
      icon: 'image',
      handler: () => {

        this.getImage(type);
      }
    },
    {
      cssClass: 'cs-cancel',
      text: 'Cancel',
      role: 'cancel',
      icon: 'cancel',
      handler: () => {

      }
    }
    ]
  });
  actionsheet.present();
}

image: any = '';
image_data: any = [];
takePhoto(type) {
  this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
  console.log(type);
  console.log('in take photo', this.image_data);
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 500,
    targetHeight: 400
  };

  if(this.Device.platform=='Android'){
    cordova.plugins.foregroundService.start('Advance Laminates', 'Your Camera Is Opened.');
  }
  this.camera.getPicture(options).then((imageData) => {
    this.image = 'data:image/jpeg;base64,' + imageData;
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    if (this.image) {
      // Assuming this.image_data is an array of objects with a 'travelClass' property
      this.fileChange(this.image,type);
    }
  }, (err) => {
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
  });
}).catch((error: any) => {
  this.presentConfirm('Error Occured', error);
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
fileChange(img,type) {
  this.image_data.push(img);
  this.image = '';
}

remove_image(i: any) {
  this.image_data.splice(i, 1);
}



showLimit() {
  console.log('Image Data', this.image_data)
  let alert = this.alertCtrl.create({
    title: 'Alert',
    subTitle: "You can upload only 1 bill images",
    cssClass: 'alert-modal',

    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      handler: () => {

      }
    }
    ]
  });
  alert.present();
}

getImage(type) {
  this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false,
    cameraDirection: 1,
    correctOrientation: true,
  };

  if(this.Device.platform=='Android'){
    cordova.plugins.foregroundService.start('Advance Laminates', 'Your Camera Is Opened.');
  }
  this.camera.getPicture(options).then((imageData) => {
    this.image = 'data:image/jpeg;base64,' + imageData;
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    if (this.image) {
      // Assuming this.image_data is an array of objects with a 'travelClass' property
      this.fileChange(this.image,type);
    }
  }, (err) => {
    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
  });
}).catch((error: any) => {
  this.presentConfirm('Error Occured', error);
});
}


submit(){
  this.savingFlag=true
  if(this.image_data){
    this.form.image=this.image_data
  }
  if(this.form.type_name){
    this.form.drId=this.form.type_name.id
    console.log(this.form.drId);
  }
  this.service.addData({'data':this.form}, "AppOrder/addCollection")
  .then(resp => {
      if (resp['statusCode'] == 200) {
        this.savingFlag = false;
        this.service.successToast(resp['statusMsg']);
        this.navCtrl.popTo(CollectionPage);
      } else {
          this.service.errorToast(resp['statusMsg'])
          this.savingFlag = false;
      }
  }, err => { })
}

}
