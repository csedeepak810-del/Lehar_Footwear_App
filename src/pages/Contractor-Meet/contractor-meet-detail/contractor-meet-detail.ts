import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';

import { CameraOptions, Camera } from '@ionic-native/camera';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ModalController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { DbserviceProvider } from '../../../providers/dbservice/dbservice';
import { ConstantProvider } from '../../../providers/constant/constant';
import { Device } from '@ionic-native/device';
import { ContractorMeetListPage } from '../contractor-meet-list/contractor-meet-list';
import { ContractorModalPage } from '../contractor-modal/contractor-modal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CameraModalPage } from '../../camera-modal/camera-modal';

declare let cordova:any;

declare var DocumentViewer: any;

@IonicPage()
@Component({
  selector: 'page-contractor-meet-detail',
  templateUrl: 'contractor-meet-detail.html',
})
export class ContractorMeetDetailPage {



  data: any = {};
  prod_id: any = '';
  id: any = '';
  data1: any = {};
  allcount: any = [];
  ParticipantData: any = []
  start: any = 0;
  details: any = {};
  formData = new FormData();
  rootUrl2 = this.constant.rootUrl2;
  img_url: any = '';
  TabType: any;
  prodstatus: any;
  isInfoVisible : boolean = false;
  data2: any = {};
  data3: any = {};
  image: any = [];
  image_bill: any = [];
  image_gift: any = [];
  image_plumber: any = [];
  imageData: any = [];
  image_data: any = [];
  complete_C_M_participants = [];
  checkin_id: any
  checkin_data: any
  AddToList_Dsiable: boolean = false
  url2: string;

  constructor(public Device:Device, public iab:InAppBrowser, public alertCtrl: AlertController, public camera: Camera, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public modalCtrl: ModalController, public service1: MyserviceProvider, public service: DbserviceProvider, public serve: DbserviceProvider, public constant: ConstantProvider, private videoPlayer: VideoPlayer, public loadingCtrl: LoadingController) {

    this.checkin_data = this.navParams.get('data');
    this.img_url = constant.upload_url1 + 'event_file/'
    this.prod_id = this.navParams.get('meeting_id');
    this.TabType = 1
    this.prodstatus = this.navParams.get('status');
    this.url2 = this.constant.upload_url1 + 'doc_catalogue/'

    if (this.navParams.get('dr_type') && this.navParams.get('dr_name') && this.navParams.get('checkinUserID')) {
      this.checkin_id = this.navParams.get('checkin_id');
      this.id = this.navParams.get('checkinUserID');
    }
    this.getContractorMeetDetail();
  }

  ionViewDidLoad() {
    this.prod_id = this.navParams.get('meeting_id');


  }

  getContractorMeetDetail() {
    this.service1.presentLoading();
    this.service1.addData({ event_id: this.prod_id }, 'AppEvent/eventDetail').then((response) => {
      if (response['statusCode'] == 200) {
        this.service1.dismissLoading();
        this.details = response['result'];
        this.data3 = this.details.participents.length;
      } else {
        this.service1.dismissLoading();
        this.service1.errorToast(response['statusMsg'])
      }

    }, error => {
      this.service1.Error_msg(error);
      this.service1.dismiss();
    });
  }

  openDocument(imageSource) {
    this.modalCtrl.create(ContractorModalPage, { "img": imageSource }).present();
  }


  deletePerson(id, index) {
    let updateAlert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure ?',
      buttons: [
        { text: 'No', },
        {
          text: 'Yes',
          handler: () => {
            this.service1.addData({ 'id': id }, 'AppEvent/deleteEventParticipent').then((response) => {
              if (response['statusCode'] == 200) {
                this.details.participents.splice(index, 1)

                this.service1.successToast(response['statusMsg'])
                this.getContractorMeetDetail()
              } else {
                this.service1.dismissLoading();
                this.service1.errorToast(response['statusMsg'])
              }

            }, er => {
              this.service1.dismissLoading();
              this.service1.errorToast('Something went wrong')
            });
          }
        }
      ]
    });
    updateAlert.present();
  }


  addParticipants() {
    let arr = []
    this.AddToList_Dsiable = true
    if (this.ParticipantData.length == 0) {
      arr.push(this.data1)
      this.ParticipantData = arr
      this.service1.addData({ 'event_id': this.prod_id, 'contact_list': [this.data1] }, 'AppEvent/addContactToEvent').then((response) => {
        this.data1.participent_mobile = '';
        this.data1.participent_name = '';
        this.data1.partcipantType = '';
        if (response['statusCode'] == 200) {
          this.service1.successToast(response['statusMsg'])
          this.AddToList_Dsiable = false
          this.getContractorMeetDetail();

        } else {
          this.AddToList_Dsiable = false
          this.service1.errorToast(response['statusMsg'])
          this.getContractorMeetDetail();
        }
      }, err => {
        this.service1.dismissLoading();
        this.service1.errorToast('Something went wrong')
      })
    } else {
      let mobileIndex = this.details.participents.findIndex(row => row.participent_mobile == this.data1.participent_mobile);
      if (mobileIndex === -1) {
        this.service1.addData({ 'event_id': this.prod_id, 'contact_list': [this.data1] }, 'AppEvent/addContactToEvent').then((response) => {
          this.data1.participent_mobile = '';
          this.data1.participent_name = '';
          this.data1.partcipantType = '';
          this.getContractorMeetDetail();

          if (response['statusCode'] == 200) {
            this.service1.successToast(response['statusMsg'])
            this.AddToList_Dsiable = false

          } else {
            this.service1.errorToast(response['statusMsg'])
            this.AddToList_Dsiable = false
          }
        })
      } else {

        this.service1.errorToast('"Mobile Number Already Exist!"')
        this.data1.participent_mobile = '';
        this.data1.participent_name = '';
        this.data1.partcipantType = '';
        this.AddToList_Dsiable = false
      }
    }

  }

  name(event: any) {
    const pattern = /[A-Z\+\-\a-z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }

  takePhoto(type, type_img) {
    this.image = [];

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 700,
      // targetHeight: 400
    }

    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Service');
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
      // if(type_img=='bill'){
      //   this.image_bill.push(this.image)
      //   console.log(this.image_bill)
      //   }else if(type_img=='gift')
      //   {
      //     this.image_gift.push(this.image)
      //     console.log(this.image_gift)
      //   }
      //   else{
      //     this.image_plumber.push(this.image)
      //     console.log(this.image_plumber)
      //   }

      this.service1.addData({ 'image': this.image, 'image_type': type_img, 'event_id': this.prod_id }, 'AppEvent/uploadEventFile')
        .then((result: any) => {
          if (result['statusCode'] == 200) {
            this.getContractorMeetDetail();
          } else {
            this.service1.errorToast(result['statusMsg'])
          }
        }, err => {
          this.service1.errorToast('Something went wrong')
        })

    }, (err) => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
      this.service1.presentToast('Image Failed to upload');

    });
  }

  getImage(type, type_img) {
    this.image = [];

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
      this.image = 'data:image/jpeg;base64,' + imageData;
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
      if (this.image) {
        this.image_data.push(this.image)
      }
      this.service1.addData({ 'image': this.image, 'image_type': type_img, 'event_id': this.prod_id }, 'AppEvent/uploadEventFile')
        .then((result: any) => {
          if (result['statusCode'] == 200) {
            this.getContractorMeetDetail();
          } else {
            this.service1.errorToast(result['statusMsg'])
          }
        }, err => {
          this.service1.errorToast('Something went wrong')
        })


    }, err => {
      if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    });
  }

  presentActionSheet(type, type_img) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Albums',
      buttons: [
        {
          text: 'Gallery',
          role: 'Gallery',
          icon: 'image',
          handler: () => {

            this.getImage(type, type_img);

          }
        }, {
          text: 'Camera',
          icon: 'camera',
          handler: () => {

            // this.takePhoto(type, type_img);
            this.cameraModal(type, type_img)

          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();

  }

  submitbutton(status) {
    this.data2.id = this.prod_id;
    this.data2.status = status;

    // if(!this.image_bill.length){
    //   this.service1.errorToast("Bill image is missing")
    //   return;
    // }
    // if(!this.image_plumber.length){
    //   this.service1.errorToast("plumber meet image is missing")
    //   return;
    // }
    // if(!this.image_gift.length){
    //   this.service1.errorToast("Gift image is missing")
    //   return;
    // }
    let updateAlert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure ?',
      buttons: [
        { text: 'No', },
        {
          text: 'Yes',
          handler: () => {

            this.service1.addData({ 'id': this.details.created_by, 'name': this.details.created_by_name, 'data': this.data2 }, "AppEvent/eventStatusChange")
              .then((result: any) => {

                if (result['statusCode'] == 200) {
                  this.service1.successToast(result['statusMsg'])
                  this.navCtrl.pop();

                } else {
                  this.service1.errorToast(result['statusMsg'])
                  this.getContractorMeetDetail()
                }
              })
          }
        }
      ]
    });
    updateAlert.present();

  }

  delete_image(id, index) {
    let updateAlert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure ?',
      buttons: [
        { text: 'No', },
        {
          text: 'Yes',
          handler: () => {

            this.service1.addData({ "id": id }, "AppEvent/deleteEventImage")
              .then(resp => {
                if (resp['statusCode'] == 200) {
                  this.service1.successToast(resp['statusMsg'])
                  this.details.uploads.splice(index, 1);
                  this.getContractorMeetDetail();
                } else {
                  this.service1.errorToast(resp['statusMsg'])
                }
              }, err => {
                this.service1.errorToast('Something went wrong')
              })
          }
        }
      ]
    });
    updateAlert.present();
  }

  openCatelogue(url2) {
    if(this.Device.platform=='Android'){
    var upload_url = url2;
    this.isInfoVisible = true;
    DocumentViewer.previewFileFromUrlOrPath(
        function () {

        }, function (error) {
        if (error == 53) {
            this.service.Error_msg('No app that handles this file type.');
        } else if (error == 2) {
            this.service.Error_msg('Invalid link');
        }
    },
        upload_url, 'pdf', 'application/pdf');
    setTimeout(() => {
        this.isInfoVisible = false;
    }, 2000);
  }else{
    this.iab.create(url2, "_system")
  }
}
  cameraModal(type, type_img) {
     this.image = [];
    let modal = this.modalCtrl.create(CameraModalPage,{'type':'camera'});

    modal.onDidDismiss(data => {
      
      if (data != undefined && data != null) {
        this.image=data;
           this.service1.addData({ 'image': this.image, 'image_type': type_img, 'event_id': this.prod_id }, 'AppEvent/uploadEventFile')
        .then((result: any) => {
          if (result['statusCode'] == 200) {
            this.getContractorMeetDetail();
          } else {
            this.service1.errorToast(result['statusMsg'])
          }
        }, err => {
          this.service1.errorToast('Something went wrong')
        })

    
    }
    
    
      
    });

    modal.present();
  }

}