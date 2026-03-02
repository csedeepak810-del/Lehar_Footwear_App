import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, ViewController, NavParams, Navbar, ActionSheetController, PopoverController, ToastController, LoadingController, AlertController, Platform, Events, ModalController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { Geolocation } from '@ionic-native/geolocation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AddOrderPage } from '../../add-order/add-order';
import { PrimaryOrderAddPage } from '../../primary-order-add/primary-order-add';
import { SecondaryOrderAddPage } from '../../secondary-order-add/secondary-order-add';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { EnquiryserviceProvider } from '../../../providers/enquiryservice/enquiryservice';
import { ExpensePopoverPage } from '../../expense-popover/expense-popover';
import { FollowupAddPage } from '../../followup-add/followup-add';
import { VisitingCardAddPage } from '../../visiting-card/visiting-card-add/visiting-card-add';
import { PopGiftAddPage } from '../../sales-app/pop-gift/pop-gift-add/pop-gift-add';
import { LmsQuotationAddPage } from '../../sales-app/new-lead/lms-lead-quotation/lms-quotation-add/lms-quotation-add';
import { ContractorMeetAddPage } from '../../Contractor-Meet/contractor-meet-add/contractor-meet-add';
import { AddMultipleContactPage } from '../../add-multiple-contact/add-multiple-contact';
import { DashboardPage } from '../../dashboard/dashboard';
import { PrimaryOrderDetailPage } from '../../primary-order-detail/primary-order-detail';
import { SecondaryOrderDetailPage } from '../../secondary-order-detail/secondary-order-detail';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CheckinNewPage } from '../../checkin-new/checkin-new';
import { ConstantProvider } from '../../../providers/constant/constant';
import { SelectRegistrationTypePage } from '../../select-registration-type/select-registration-type';
import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CameraModalPage } from '../../camera-modal/camera-modal';
import { ProductSalePage } from '../../product-sale/product-sale';
declare let cordova: any;
declare var CacheClear: any;
@IonicPage()
@Component({
  selector: 'page-end-checkin',
  templateUrl: 'end-checkin.html',
})
export class EndCheckinPage {
  @ViewChild(Navbar) navBar: Navbar;

  state_list: any = []; city_list: any = [];
  city_name: any = [];
  data: any = {};
  checkin_data: any = [];
  orderType: any = '';
  checkin: any = {};
  checkinForm: FormGroup;
  checkinFormWithNewDealer: FormGroup;
  order_token: any = [];
  brand_assign: any = [];
  salesUserId: any;
  spinnerLoader: boolean = false;
  showEditRetailer: boolean = true;
  today_date = new Date().toISOString().slice(0, 10);
  pending_checkin_id: any;
  new_retailer_id: any;
  area_list: any = [];
  form1: any = {};
  update_retailer_flag: any = '0';
  check_gst: any = '';
  gst_details: any = [];
  check_mobile: any = '';
  district_list: any = [];
  image: any = '';
  image_data: any = [];
  videoId: any;
  flag_upload = true;
  flag_play = true;
  for_order: any = [];
  functionCalled: any = 0
  customerList:any=[];




  constructor(public Device: Device, public appCtrl: App,public callNumber:CallNumber, public events: Events, public constant: ConstantProvider, public viewCtrl: ViewController, public navCtrl: NavController, private camera: Camera, public popoverCtrl: PopoverController, public platform: Platform, public androidPermissions: AndroidPermissions, public navParams: NavParams, public actionSheetController: ActionSheetController, private mediaCapture: MediaCapture, public service: MyserviceProvider, public geolocation: Geolocation, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
    public locationAccuracy: LocationAccuracy, public openNativeSettings: OpenNativeSettings,
    public services: EnquiryserviceProvider,public modalCtrl: ModalController,
    public diagnostic: Diagnostic,

    public alertCtrl: AlertController, public storage: Storage) {


    this.checkin_data = this.navParams.get('data');
    this.checkinForm = this.formBuilder.group({
      description: ['', Validators.compose([Validators.required])],

    })
    this.checkin.dr_name = this.checkin_data.dr_name;
    this.checkin.name = this.checkin_data.name;
    this.checkin.dr_mobile = this.checkin_data.dr_mobile_no;

  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
       setTimeout(() => {
                    this.CacheClearFunction();
                }, 1000);
    this.pending_checkin();
    this.networkList(); 


    this.navBar.backButtonClick = () => {

      this.backAction('test button call')

    }

    this.salesUserId = this.checkin_data.created_by;
  }

  present_upload_document_alert() {
    let alert = this.alertCtrl.create({
      title: 'Document',
      subTitle: 'Upload Document is Mandatory',
      cssClass: 'action-close',

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


  backAction(test) {

    this.navCtrl.push(DashboardPage);
  }
      CacheClearFunction() {
        console.log('in')
        this.platform.ready().then(() => {
            if (typeof CacheClear !== 'undefined') {
                CacheClear(() => {
                    console.log('Success', 'Cache was cleared successfully.');
                    // this.service.successToast('Cache cleared successfully.');

                }, (err) => {
                    console.log('Error', 'Failed to clear cache: ' + err);
                });
            } else {
                console.log('Error', 'CacheClear plugin is not available.');
            }
        });
    }
  pending_checkin() {
    // this.service.presentLoading();
    this.service.addData({}, 'AppCheckin/pendingCheckin').then((result) => {
      if (result['statusCode'] == 200) {
        // this.service.dismissLoading();
        this.checkin_data = result['checkin_data'];
        this.orderType = result['order_type'];
        this.pending_checkin_id = this.checkin_data['checkin_id']
        this.new_retailer_id = this.checkin_data['dr_id']
        this.checkin.dr_name = this.checkin_data.dr_name;
        this.checkin.name = this.checkin_data.name;
        this.checkin.dr_mobile = this.checkin_data.dr_mobile_no;
        this.update_retailer_flag = this.checkin_data['update_retailer'];
        // this.service.dismissLoading();

      } else {
        this.service.dismissLoading();

        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.Error_msg(err);
      this.service.dismissLoading();

    })
  }
  // end_visit(checkin_id, description) {
  //   this.spinnerLoader = true;
  //   this.platform.ready().then(() => {
  //     if(this.Device.platform=='Android'){

  //       var whiteList = [];
  
  //       (<any>window).gpsmockchecker.check(whiteList, (result) => {
  
  //         if (result.isMock) {
  //           let alert = this.alertCtrl.create({
  //             title: 'Alert!',
  //             subTitle: 'Please Remove Thirt Party Location Apps',
  //             buttons: [
  //               {
  //                 text: 'Ok',
  //                 handler: () => {
  
  //                   this.service.addData({ 'app_name': result.mocks[0]['name'], 'package_name': result.mocks[0]['package'] }, 'Login/thirdPartyDisabled').then((result) => {
  //                     if (result['statusCode'] == 200) {
  //                       this.storage.set('token', '');
  //                       this.storage.set('role', '');
  //                       this.storage.set('displayName', '');
  //                       this.storage.set('role_id', '');
  //                       this.storage.set('name', '');
  //                       this.storage.set('type', '');
  //                       this.storage.set('token_value', '');
  //                       this.storage.set('userId', '');
  //                       this.storage.set('token_info', '');
  //                       this.constant.UserLoggedInData = {};
  //                       this.constant.UserLoggedInData.userLoggedInChk = false;
  //                       this.events.publish('data', '1', Date.now());
  //                       this.service.errorToast("Your account is blocked");
  //                       this.navCtrl.setRoot(SelectRegistrationTypePage);
  //                     } else {
  //                       this.service.errorToast(result['statusMsg'])
  //                     }
  //                   },
  //                     error => {
  //                       this.service.Error_msg(error);
  //                     })
  
  //                 }
  //               }
  //             ]
  //           });
  //           alert.present();
  
  //         }
  //         else {
  
  //           if (this.image_data.length < 1) {
  //             this.spinnerLoader = false;
  //             this.service.errorToast('Please Upload Images !!')
  //             return;
  //           }
  
  //           if (!description) {
  //             this.spinnerLoader = false;
  //             this.service.errorToast('Please Add Description Field !!')
  //             return;
  //           } 
  
           
  
  //           this.functionCalled = 1
  
  //           this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  //             () => {
  //               let options = { maximumAge: 10000, timeout: 15000, enableHighAccuracy: true };
  //               this.geolocation.getCurrentPosition(options).then((resp) => {
  
  //                 var lat = resp.coords.latitude;
  //                 var lng = resp.coords.longitude;
  //                 this.service.presentLoading();
  
  //                 this.service.addData({ 'lat': lat, 'lng': lng, 'checkin_id': checkin_id, 'description': description, imgarr: this.image_data, 'collection': this.checkin,'meet_status': this.checkin.meet_status}, 'AppCheckin/visitEnd').then((result) => {
  //                   if (result['statusCode'] == 200) {
  //                     this.spinnerLoader = false;
  //                     this.for_order = result['for_order'];
  //                     this.brand_assign = result['brand_assign'];
  //                     this.service.dismissLoading();
  //                     this.service.successToast(result['statusMsg']);
  //                     if (this.checkin_data.other_name == '') {
  //                       // this.viewCtrl.dismiss();
  //                       // this.appCtrl.getRootNav().push(CheckinNewPage);
  //                       if (this.navCtrl.getViews().length >= 2) {
  //                         this.navCtrl.remove(1, 1, { animate: false })
  //                         this.navCtrl.pop({ animate: false })
  //                       }
  //                       this.navCtrl.push(CheckinNewPage);
  //                     }
  //                     else {
  //                       if (this.navCtrl.getViews().length >= 2) {
  //                         this.navCtrl.remove(1, 1, { animate: false })
  //                         this.navCtrl.pop({ animate: false })
  //                       }
  //                       this.navCtrl.push(CheckinNewPage);
  //                       this.service.dismissLoading();
  //                     }
  //                   } else {
  //                     this.spinnerLoader = false;
  //                     this.service.errorToast(result['statusMsg'])
  //                     this.service.dismissLoading();
  //                   }
  //                 },
  //                   error => {
  //                     this.spinnerLoader = false;
  //                     this.service.Error_msg(error);
  //                     this.service.dismissLoading();
  //                   })
  
  //               }).catch((error) => {
  //                 this.spinnerLoader = false;
  //                 this.service.dismissLoading();
  //                 // this.presentConfirm('Turn On Location permisssion !', 'please go to <strong>Settings</strong> -> Location to turn on <strong>Location permission</strong>')
  //                 this.geolocation.watchPosition(options).subscribe((resp) => {
  
  //                   var lat = resp.coords.latitude;
  //                   var lng = resp.coords.longitude;
  //                   this.service.presentLoading();
  
  //                   this.service.addData({ 'lat': lat, 'lng': lng, 'checkin_id': checkin_id, 'description': description, imgarr: this.image_data, 'collection': this.checkin,'meet_status': this.checkin.meet_status }, 'AppCheckin/visitEnd').then((result) => {
  //                     if (result['statusCode'] == 200) {
  //                       this.spinnerLoader = false;
  //                       this.for_order = result['for_order'];
  //                       this.brand_assign = result['brand_assign'];
  //                       this.service.dismissLoading();
  //                       this.service.successToast(result['statusMsg']);
  //                       if (this.checkin_data.other_name == '') {
  //                         // this.viewCtrl.dismiss();
  //                         // this.appCtrl.getRootNav().push(CheckinNewPage);
  //                         if (this.navCtrl.getViews().length >= 2) {
  //                           this.navCtrl.remove(1, 1, { animate: false })
  //                           this.navCtrl.pop({ animate: false })
  //                         }
  //                         this.navCtrl.push(CheckinNewPage);
  //                       }
  //                       else {
  //                         if (this.navCtrl.getViews().length >= 2) {
  //                           this.navCtrl.remove(1, 1, { animate: false })
  //                           this.navCtrl.pop({ animate: false })
  //                         }
  //                         this.navCtrl.push(CheckinNewPage);
  //                         this.service.dismissLoading();
  //                       }
  //                     } else {
  //                       this.spinnerLoader = false;
  //                       this.service.errorToast(result['statusMsg'])
  //                       this.service.dismissLoading();
  //                     }
  //                   },
  //                     error => {
  //                       this.spinnerLoader = false;
  //                       this.service.Error_msg(error);
  //                       this.service.dismissLoading();
  //                     })
  
  //                 })
  
  //               });
  //             },
  //             error => {
  //               this.spinnerLoader = false;
  //               this.service.Error_msg(error);
  //               this.service.dismissLoading();
  //             });
  //         }
  
  
  
  //       }, (error) => this.service.errorToast(error));
  //     }else {
  
  //       if (this.image_data.length < 1) {
  //         this.spinnerLoader = false;
  //         this.service.errorToast('Please Upload Images !!')
  //         return;
  //       }

  //       if (!description) {
  //         this.spinnerLoader = false;
  //         this.service.errorToast('Please Add Description Field !!')
  //         return;
  //       } 

       

  //       this.functionCalled = 1

  //       this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  //         () => {
  //           let options = { maximumAge: 10000, timeout: 15000, enableHighAccuracy: true };
  //           this.geolocation.getCurrentPosition(options).then((resp) => {

  //             var lat = resp.coords.latitude;
  //             var lng = resp.coords.longitude;
  //             this.service.presentLoading();

  //             this.service.addData({ 'lat': lat, 'lng': lng, 'checkin_id': checkin_id, 'description': description, imgarr: this.image_data, 'collection': this.checkin,'meet_status': this.checkin.meet_status }, 'AppCheckin/visitEnd').then((result) => {
  //               if (result['statusCode'] == 200) {
  //                 this.spinnerLoader = false;
  //                 this.for_order = result['for_order'];
  //                 this.brand_assign = result['brand_assign'];
  //                 this.service.dismissLoading();
  //                 this.service.successToast(result['statusMsg']);
  //                 if (this.checkin_data.other_name == '') {
  //                   // this.viewCtrl.dismiss();
  //                   // this.appCtrl.getRootNav().push(CheckinNewPage);
  //                   if (this.navCtrl.getViews().length >= 2) {
  //                     this.navCtrl.remove(1, 1, { animate: false })
  //                     this.navCtrl.pop({ animate: false })
  //                   }
  //                   this.navCtrl.push(CheckinNewPage);
  //                 }
  //                 else {
  //                   if (this.navCtrl.getViews().length >= 2) {
  //                     this.navCtrl.remove(1, 1, { animate: false })
  //                     this.navCtrl.pop({ animate: false })
  //                   }
  //                   this.navCtrl.push(CheckinNewPage);
  //                   this.service.dismissLoading();
  //                 }
  //               } else {
  //                 this.spinnerLoader = false;
  //                 this.service.errorToast(result['statusMsg'])
  //                 this.service.dismissLoading();
  //               }
  //             },
  //               error => {
  //                 this.spinnerLoader = false;
  //                 this.service.Error_msg(error);
  //                 this.service.dismissLoading();
  //               })

  //           }).catch((error) => {
  //             this.spinnerLoader = false;
  //             this.service.dismissLoading();
  //             // this.presentConfirm('Turn On Location permisssion !', 'please go to <strong>Settings</strong> -> Location to turn on <strong>Location permission</strong>')
  //             this.geolocation.watchPosition(options).subscribe((resp) => {

  //               var lat = resp.coords.latitude;
  //               var lng = resp.coords.longitude;
  //               this.service.presentLoading();

  //               this.service.addData({ 'lat': lat, 'lng': lng, 'checkin_id': checkin_id, 'description': description, imgarr: this.image_data, 'collection': this.checkin,'meet_status': this.checkin.meet_status }, 'AppCheckin/visitEnd').then((result) => {
  //                 if (result['statusCode'] == 200) {
  //                   this.spinnerLoader = false;
  //                   this.for_order = result['for_order'];
  //                   this.brand_assign = result['brand_assign'];
  //                   this.service.dismissLoading();
  //                   this.service.successToast(result['statusMsg']);
  //                   if (this.checkin_data.other_name == '') {
  //                     // this.viewCtrl.dismiss();
  //                     // this.appCtrl.getRootNav().push(CheckinNewPage);
  //                     if (this.navCtrl.getViews().length >= 2) {
  //                       this.navCtrl.remove(1, 1, { animate: false })
  //                       this.navCtrl.pop({ animate: false })
  //                     }
  //                     this.navCtrl.push(CheckinNewPage);
  //                   }
  //                   else {
  //                     if (this.navCtrl.getViews().length >= 2) {
  //                       this.navCtrl.remove(1, 1, { animate: false })
  //                       this.navCtrl.pop({ animate: false })
  //                     }
  //                     this.navCtrl.push(CheckinNewPage);
  //                     this.service.dismissLoading();
  //                   }
  //                 } else {
  //                   this.spinnerLoader = false;
  //                   this.service.errorToast(result['statusMsg'])
  //                   this.service.dismissLoading();
  //                 }
  //               },
  //                 error => {
  //                   this.spinnerLoader = false;
  //                   this.service.Error_msg(error);
  //                   this.service.dismissLoading();
  //                 })

  //             })

  //           });
  //         },
  //         error => {
  //           this.spinnerLoader = false;
  //           this.service.Error_msg(error);
  //           this.service.dismissLoading();
  //         });
  //     }

  //   });








  // }

    end_visit(checkin_id, description) {
    this.spinnerLoader = true;

        if (this.image_data.length < 1) {
          this.spinnerLoader = false;
          this.service.errorToast('Please Upload Images !!')
          return;
        }

        if (!description) {
          this.spinnerLoader = false;
          this.service.errorToast('Please Add Description Field !!')
          return;
        } 

       

        this.functionCalled = 1

        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            let options = { maximumAge: 10000, timeout: 15000, enableHighAccuracy: true };
            this.geolocation.getCurrentPosition(options).then((resp) => {

              var lat = resp.coords.latitude;
              var lng = resp.coords.longitude;
              this.service.presentLoading();

              this.service.addData({ 'lat': lat, 'lng': lng, 'checkin_id': checkin_id, 'description': description, imgarr: this.image_data, 'collection': this.checkin,'meet_status': this.checkin.meet_status }, 'AppCheckin/visitEnd').then((result) => {
                if (result['statusCode'] == 200) {
                  this.spinnerLoader = false;
                  this.for_order = result['for_order'];
                  this.brand_assign = result['brand_assign'];
                  this.service.dismissLoading();
                  this.service.successToast(result['statusMsg']);
                  if (this.checkin_data.other_name == '') {
                   
                    if (this.navCtrl.getViews().length >= 2) {
                      this.navCtrl.remove(1, 1, { animate: false })
                      this.navCtrl.pop({ animate: false })
                    }
                    this.navCtrl.push(CheckinNewPage);
                  }
                  else {
                    if (this.navCtrl.getViews().length >= 2) {
                      this.navCtrl.remove(1, 1, { animate: false })
                      this.navCtrl.pop({ animate: false })
                    }
                    this.navCtrl.push(CheckinNewPage);
                    this.service.dismissLoading();
                  }
                } else {
                  this.spinnerLoader = false;
                  this.service.errorToast(result['statusMsg'])
                  this.service.dismissLoading();
                }
              },
                error => {
                  this.spinnerLoader = false;
                  this.service.Error_msg(error);
                  this.service.dismissLoading();
                })

            }).catch((error) => {
              this.spinnerLoader = false;
              this.service.dismissLoading();
              // this.presentConfirm('Turn On Location permisssion !', 'please go to <strong>Settings</strong> -> Location to turn on <strong>Location permission</strong>')
              this.geolocation.watchPosition(options).subscribe((resp) => {

                var lat = resp.coords.latitude;
                var lng = resp.coords.longitude;
                this.service.presentLoading();

                this.service.addData({ 'lat': lat, 'lng': lng, 'checkin_id': checkin_id, 'description': description, imgarr: this.image_data, 'collection': this.checkin,'meet_status': this.checkin.meet_status }, 'AppCheckin/visitEnd').then((result) => {
                  if (result['statusCode'] == 200) {
                    this.spinnerLoader = false;
                    this.for_order = result['for_order'];
                    this.brand_assign = result['brand_assign'];
                    this.service.dismissLoading();
                    this.service.successToast(result['statusMsg']);
                    if (this.checkin_data.other_name == '') {
                      // this.viewCtrl.dismiss();
                      // this.appCtrl.getRootNav().push(CheckinNewPage);
                      if (this.navCtrl.getViews().length >= 2) {
                        this.navCtrl.remove(1, 1, { animate: false })
                        this.navCtrl.pop({ animate: false })
                      }
                      this.navCtrl.push(CheckinNewPage);
                    }
                    else {
                      if (this.navCtrl.getViews().length >= 2) {
                        this.navCtrl.remove(1, 1, { animate: false })
                        this.navCtrl.pop({ animate: false })
                      }
                      this.navCtrl.push(CheckinNewPage);
                      this.service.dismissLoading();
                    }
                  } else {
                    this.spinnerLoader = false;
                    this.service.errorToast(result['statusMsg'])
                    this.service.dismissLoading();
                  }
                },
                  error => {
                    this.spinnerLoader = false;
                    this.service.Error_msg(error);
                    this.service.dismissLoading();
                  })

              })

            });
          },
          error => {
            this.spinnerLoader = false;
            this.service.Error_msg(error);
            this.service.dismissLoading();
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

  openDialer(dialnumber:any, e:any){
    e.stopPropagation();
    dialnumber = ''+dialnumber
    this.callNumber.callNumber(dialnumber, false) // Set to false to allow user to choose app
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
  }


  captureMedia() {
    let actionsheet = this.actionSheetController.create({
      title: "Upload Image",
      cssClass: 'cs-actionsheet',
      buttons: [{
        cssClass: 'sheet-m',
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          // this.takePhoto();
          this.cameraModal()
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
        icon: 'cancel',
        handler: () => {

        }
      }
      ]
    });
    actionsheet.present();
  }


  getImage() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
      console.log(isAvailable);
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
              this.fileChange(this.image);
          }
      },
          (err) => {
              if(this.Device.platform=='Android'){
cordova.plugins.foregroundService.stop();
}
              if (err == 20) {
                  this.presentConfirm('Turn On Camera & Media permisssion !', 'Go to <strong>Settings</strong> -> to turn on <strong>Camera permission</strong> & <stong>Files and  media</strong>')
              } else {
                  this.presentConfirm('Error Occured', err);
              }
          });
  })
  }
  takePhoto() {
    this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
      console.log(isAvailable);
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: this.camera.Direction.FRONT,
        targetWidth: 800,
        targetHeight: 600,
        correctOrientation: true,
  
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
              this.fileChange(this.image);
          }
      },
          (err) => {
              if(this.Device.platform=='Android'){
cordova.plugins.foregroundService.stop();
}
              if (err == 20) {
                  this.presentConfirm('Turn On Camera & Media permisssion !', 'Go to <strong>Settings</strong> -> to turn on <strong>Camera permission</strong> & <stong>Files and  media</strong>')
              } else {
                  this.presentConfirm('Error Occured', err);
              }
          });
  })
  }
  fileChange(img) {
    // this.image_data=[];
    this.image_data.push(img);
    this.image = '';
  }


  remove_image(i: any) {
    this.image_data.splice(i, 1);
  }



  presentPopover(myEvent, type) {
    let popover = this.popoverCtrl.create(ExpensePopoverPage, { 'via': 'checkin', 'checkInData': this.checkin_data, 'showEditRetailer': this.showEditRetailer, 'type': type });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(resultData => {
      if (resultData['Retailer'] == 'Show') {
        this.showEditRetailer = true;
      }
      else if (resultData['Retailer'] == 'Hide') {
        this.showEditRetailer = false;
      }
    })
  }

  showLimit() {
    console.log('Image Data', this.image_data)
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: "You can upload only 6 document images",
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

  distributor_list: any = []
  goPrimaryOrderDetail(id) {
    this.navCtrl.push(PrimaryOrderDetailPage, { id: id, login: 'Employee' })
  }

  goSecondaryOrderDetail(id) {
    this.navCtrl.push(SecondaryOrderDetailPage, { id: id, login: 'Employee' })
  }

  goTo(where, event: Event) {
    event.preventDefault();

    if (where == 'Primary') {
      this.navCtrl.push(ProductSalePage, { 'dr_type': this.checkin_data.dr_type, 'checkin_id': this.checkin_data.checkin_id, 'id': this.checkin_data.dr_id, 'dr_name': this.checkin_data.dr_name, 'order_type': 'Primary' });
    }
    else if (where == 'Secondary') {
      console.log('Secondary', this.checkin_data.dr_type)
      this.navCtrl.push(ProductSalePage, { 'dr_type': this.checkin_data.dr_type, 'networkType': this.checkin_data.dr_type, 'id': this.checkin_data.dr_id, 'checkin_id': this.checkin_data.checkin_id, 'dr_name': this.checkin_data.dr_name, 'order_type': 'Secondary' });
    }
    else if (where == 'FollowUp') {
      this.navCtrl.push(FollowupAddPage, { 'dr_id': this.checkin_data.dr_id, 'dr_name': this.checkin_data.dr_name, 'dr_type': this.checkin_data.dr_type, 'dr_type_name': this.checkin_data.dr_type_name, 'checkin_id': this.checkin_data.checkin_id });
    }

    else if (where == 'VisitingCard') {
      this.navCtrl.push(VisitingCardAddPage, { 'dr_type': this.checkin_data.dr_type, 'checkin_id': this.checkin_data.checkin_id, 'dr_name': this.checkin_data.dr_name });
    }
    else if (where == 'quotation') {
      this.navCtrl.push(LmsQuotationAddPage, { 'dr_type': this.checkin_data.dr_type, 'checkin_id': this.checkin_data.checkin_id, 'dr_name': this.checkin_data.dr_name })
    }
    else if (where == 'MEET') {
      this.navCtrl.push(ContractorMeetAddPage, { 'dr_type': this.checkin_data.dr_type, 'checkin_id': this.checkin_data.checkin_id, 'dr_name': this.checkin_data.dr_name, 'checkinUserID': this.salesUserId })
    }
    else if (where == 'UPLOAD') {
      this.captureMedia();
    }
    else if (where == 'Contacts') {
      this.navCtrl.push(AddMultipleContactPage, { 'dr_id': this.checkin_data.dr_id, 'checkin_id': this.checkin_data.checkin_id, 'dr_name': this.checkin_data.dr_name })
    }
  }

  networkList() {
    this.service.addData({},  'AppCustomerNetwork/get_users').then((result) => {
      if(result['statusCode']==200){
        this.customerList = result['data'];
        
      }else{
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    }, err => {
      this.service.dismissLoading();
      this.service.errorToast('Something went wrong')
    });
  }

   cameraModal() {
    let modal = this.modalCtrl.create(CameraModalPage,{'type':'camera'});

    modal.onDidDismiss(data => {
      
      if (data != undefined && data != null) {
        this.image=data;
         if (this.image) {
              this.fileChange(this.image);
          }
    }
    
    
      
    });

    modal.present();
  }
}
