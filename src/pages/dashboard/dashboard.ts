import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Events, Platform, MenuController, ModalCmp, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';
import moment from 'moment';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { OCR, OCRSourceType } from '@ionic-native/ocr/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { MainDistributorListPage } from '../sales-app/main-distributor-list/main-distributor-list';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { GeolocationserviceProvider } from '../../providers/geolocationservice/geolocationservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { WorkTypeModalPage } from '../work-type-modal/work-type-modal';
import { Network } from '@ionic-native/network';
import { ExpenseListPage } from '../expense-list/expense-list';
import { LmsLeadListPage } from '../sales-app/new-lead/lms-lead-list/lms-lead-list';
import { ContractorMeetListPage } from '../Contractor-Meet/contractor-meet-list/contractor-meet-list';
import { FollowupListPage } from '../followup-list/followup-list'
import { AnnouncementListPage } from '../announcement/announcement-list/announcement-list';
import { EndCheckinPage } from '../sales-app/end-checkin/end-checkin';
import { CheckinNewPage } from '../checkin-new/checkin-new';
import { LeaveListPage } from '../leave-list/leave-list';
import { TravelListNewPage } from '../travel-list-new/travel-list-new';
import { RetailerListPage } from '../retailer-list/retailer-list';
import { FollowupAddPage } from '../followup-add/followup-add';
import { ExpenseAddPage } from '../expense-add/expense-add';
import { PrimaryOrderMainPage } from '../primary-order-main/primary-order-main';
import { SecondaryOrderMainPage } from '../secondary-order-main/secondary-order-main';
import { AttendenceNewPage } from '../attendence-new/attendence-new'
import { TargetPage } from '../target/target';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DashboardNewPage } from '../dashboard-new/dashboard-new';
import { ProfilePage } from '../profile/profile';
import { SurveyListPage } from '../survey/survey-list/survey-list';
import { PopGiftListPage } from '../sales-app/pop-gift/pop-gift-list/pop-gift-list';
import { TaskListPage } from '../task-list/task-list';
import { SiteListPage } from '../loyalty/site-list/site-list';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ScanningPage } from '../scanning/scanning';
import { ProductsPage } from '../products/products';
import { LoyaltyCataloguePage } from '../loyalty-catalogue/loyalty-catalogue';
import { NotificationPage } from '../notification/notification';
import { AnnouncementNoticesListPage } from '../announcement-notices-list/announcement-notices-list';
import { HolidayListPage } from '../holiday-list/holiday-list';
import { LoyaltyFaqPage } from '../loyalty-faq/loyalty-faq';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SelectRegistrationTypePage } from '../select-registration-type/select-registration-type';
import { SecondaryTargetReportPage } from '../secondary-target-report/secondary-target-report';
import BackgroundGeolocation, {
    State, Config, Location, LocationError, Geofence, HttpEvent, MotionActivityEvent, ProviderChangeEvent, MotionChangeEvent, GeofenceEvent, GeofencesChangeEvent, HeartbeatEvent,
    ConnectivityChangeEvent,
    DeviceSettingsRequest
} from "cordova-background-geolocation-lt";
import { BackgroundTrackListPage } from '../background-track-list/background-track-list';
import { ProminentDisclosureModalPage } from '../prominent-disclosure-modal/prominent-disclosure-modal';
import OneSignal from 'onesignal-cordova-plugin';
import { BatteryOptimizationModalPage } from '../battery-optimization-modal/battery-optimization-modal';
import { ContactPage } from '../contact/contact';
import { Device } from '@ionic-native/device';
import {Market} from '@ionic-native/market'
import { SchemeIncentiveListPage } from '../DMS/Scheme_Incentive/scheme-incentive-list/scheme-incentive-list';
import { Subscription } from 'rxjs/Subscription';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { PrimaryOrderAddPage } from '../primary-order-add/primary-order-add';
import { SecondaryOrderAddPage } from '../secondary-order-add/secondary-order-add';
import { SiteProjectListPage } from '../site-project/site-project-list/site-project-list';
import { SfaShortcutPage } from '../sfa-shortcut/sfa-shortcut';
declare let cordova: any;
declare var CacheClear: any;
import { Slides } from 'ionic-angular';
import { CameraModalPage } from '../camera-modal/camera-modal';
import { CallNumber } from '@ionic-native/call-number';
import { CallLog } from '@ionic-native/call-log';
import { LmsQuotationListPage } from '../sales-app/new-lead/lms-lead-quotation/lms-quotation-list/lms-quotation-list';
import { OrderCatalogueListPage } from '../order-catalogue-list/order-catalogue-list';
declare var MyKotlinPlugin: any;
@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
    
})
export class DashboardPage {
    
      @ViewChild('bannerSlides') slides: Slides;

      currentSlide: number = 0;

    attend_id: any = '';
     private listenSub: Subscription;
    currentTime: any = '';
    checkinMode: any = {};
    attendanceMode: any = '';
    user_id: any = '';
    doughnutChart: any;
    qr_code: any;
    checkinChart: any;
      imagePath: string;
  extractedText: string = '';
    followupChart: any;
    skLoading: boolean = true
    spinner: boolean = false
    attendence_data: any = [];
    appbanner: any = [];
    announcementCount: any;
    enquiry_count: number;
    checkin_data: any = [];
    timer;
    checkin_out: any = ''
    today_date = new Date().toISOString().slice(0, 10);
    checkedToggle: any = '';
    subscription: any;
    vehicle: any = '';
    last_attendence_data: any = {};
    today_count: any = {};
    user_data: any = {};
    today_checkin: any = [];
    total_dealer: any = [];
    total_distributor: any = [];
    total_direct_dealer: any = [];
    user_logged_in: boolean;
    start_attend_time: any;
    stop_attend_time: any;
    total_primary_order: any = [];
    total_secondary_order: any = [];
    primary_order_sum: number;
    secondary_order_sum: number;
    targetVsAchievement: any = {};
    dr_credit_details: any = {};
    today_followup: any = [];
    image: any = '';
    image_data: any = [];
    bannerURL: any = '';
    influencerUser: any = [];
    Authtoken:any;
    test_flag: any = 0;
    device_unique_id: any = ''
    greeting: string;
    suggestionList: any=[];
    isBottomSheetOpen: boolean= false;
    data: any;
    checkinData: any={};
    spinnerLoader: boolean=false;
      searchQuery: string = '';
  searchPlaceholder: string = 'Search employees, tasks, reports...';
  isListening: boolean = false;
  diwaliFlag: any = 0;
   rakhiFlag: any = 0;
  dussheraFlag: any = 0;
  nationalFlag: any = 0;
  christmasFlag: any = 0;
 holiFlag: any = 0; 
 notificationToken: any ='';
  
  // Array of dynamic placeholder messages
  private placeholderMessages: string[] = [
    'Search employees, tasks, reports...',
    'Find attendance records...',
    'Look up team members...',
    'Search by name or ID...',
    'Find reports and analytics...',
    'Search anything...'
  ];
  
  private placeholderIndex: number = 0;
  private placeholderInterval: any;
    commandType: string='Order';
    bannerData: any =[];
    


    constructor(private network: Network,
        public navCtrl: NavController,
        private ocr: OCR,
        public diagnostic: Diagnostic,
        public Market:Market,
          private callLog: CallLog,
        private speech: SpeechRecognition,
        public Device: Device,
        private zone: NgZone,
        public loadingCtrl: LoadingController,
        private androidPermissions: AndroidPermissions,
        public callNumber:CallNumber,
        public geolocation: Geolocation
        , private storage: Storage
        , public attendence_serv: AttendenceserviceProvider
        , public toastCtrl: ToastController
        , public alertCtrl: AlertController
        , public events: Events
        , public locationAccuracy: LocationAccuracy
        ,private tts: TextToSpeech
        , public platform: Platform
        , public push: Push
        , public service: MyserviceProvider
        , public track: GeolocationserviceProvider
        , public menu: MenuController
        , public constant: ConstantProvider
        , public modal: ModalController
        , private camera: Camera
        , public modalCtrl: ModalController
        , public openNativeSettings: OpenNativeSettings
        , private barcodeScanner: BarcodeScanner) {
        // this.getNetworkType()
        this.platform.ready().then(() => 
        {
            
            this.storage.get('token').then((value) => {
                this.Authtoken = value;
            })
    
     
        })
        this.bannerURL = this.constant.upload_url1 + 'banner/';
          this.startPlaceholderRotation();
          document.body.classList.add('dark-mode');

           this.storage.get('onesigalToken').then((val) => {
                this.notificationToken = val;
            });
            setTimeout(() => {
                this.OneSignalInit();
            }, 2000);

    }


      // Dynamic placeholder rotation
  startPlaceholderRotation() {
    this.placeholderInterval = setInterval(() => {
      this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholderMessages.length;
      this.searchPlaceholder = this.placeholderMessages[this.placeholderIndex];
    }, 3000); // Change every 3 seconds

     this.startAutoPlay();
  }


    ionViewWillEnter() {
        

        this.platform.resume.subscribe(() => {
            this.checkBatteryOptimizations();
        });
      
        //   this.checkinSuggestion('Test'); 
        this.pending_checkin();
        this.last_attendence();
        this.events.publish('current_page', 'Dashboard');
        this.storage.get('token').then((token) => {
            if (typeof (token) !== 'undefined' && token) {
                this.user_logged_in = true;

            }
        });
        this.storage.get('userId').then((id) => {
            if (typeof (id) !== 'undefined' && id) {
                this.user_id = id;

            }
        });

        this.platform.ready().then(() => {
            this.network.onConnect().subscribe(() => {
                this.constant.connectionChk = 'online;'
            });
            this.network.onDisconnect().subscribe(() => {
                this.constant.connectionChk = 'offline';
            });

        });

        this.bannerDetail();


    }
    leave: any = []


    ionViewDidLeave() {
        this.events.publish('current_page', '');
    }

        CacheClearFunction() {
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

    getInfluencer() {
        this.service.addData({}, 'AppInfluencer/influencerList').then(result => {
            if (result['statusCode'] == 200) {
                this.influencerUser = result['result'];
            }
            else {
                this.service.errorToast(result['statusMsg'])
            }
        }, err => {
            this.service.Error_msg(err);
            this.service.dismiss();
        });
    }

    takePhoto(type) {
                this.platform.ready().then(() => {
                    if(this.Device.platform=='Android'){

                        var whiteList = [''];
                        (<any>window).gpsmockchecker.check(whiteList, (result) => {
                            if (result.isMock) {
    
                                let alert = this.alertCtrl.create({
                                    title: 'Alert!',
                                    subTitle: 'Please Remove Third Party Location Apps',
                                    buttons: [
                                        {
                                            text: 'Ok',
                                            handler: () => {
                                                this.service.addData({ 'app_name': result.mocks[0]['name'], 'package_name': result.mocks[0]['package'] }, 'Login/thirdPartyDisabled').then((result) => {
                                                    if (result['statusCode'] == 200) {
                                                        this.storage.set('token', '');
                                                        this.storage.set('role', '');
                                                        this.storage.set('displayName', '');
                                                        this.storage.set('role_id', '');
                                                        this.storage.set('name', '');
                                                        this.storage.set('type', '');
                                                        this.storage.set('token_value', '');
                                                        this.storage.set('userId', '');
                                                        this.storage.set('token_info', '');
                                                        this.constant.UserLoggedInData = {};
                                                        this.constant.UserLoggedInData.userLoggedInChk = false;
                                                        this.events.publish('data', '1', Date.now());
                                                        this.service.errorToast("Your account is blocked");
                                                        this.navCtrl.setRoot(SelectRegistrationTypePage);
    
                                                    } else {
                                                        this.service.errorToast(result['statusMsg'])
                                                    }
                                                },
                                                    error => {
                                                        this.service.Error_msg(error);
                                                    })
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            }
                            else {
                                this.spinner = true
                                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((res) => {
                                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((result) => {
                                        let options = { maximumAge: 3000, timeout: 15000, enableHighAccuracy: false };
                                        this.geolocation.getCurrentPosition(options).then((resp) => {
    
                                            var lat = resp.coords.latitude
                                            var lng = resp.coords.longitude
                                            this.spinner = false;
                                            if (this.user_data.camera_flag == 0) {
                                                this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
                                                    const options: CameraOptions =
                                                    {
                                                        quality: 80,
                                                        destinationType: this.camera.DestinationType.DATA_URL,
                                                        targetWidth: 800,
                                                        targetHeight: 600,
                                                        allowEdit: false
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
                                                            this.openModal(type)
                                                        }
                                                    },
                                                        (err) => {
                                                            if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
                                                            this.spinner = false
                                                            if (err == 20) {
                                                                this.presentConfirm('Turn On Camera & Media permisssion !', 'Go to <strong>Settings</strong> -> to turn on <strong>Camera permission</strong> & <stong>Files and  media</strong>')
                                                            } else {
                                                                this.presentConfirm('Error Occured', err);
                                                            }
                                                        });
                                                })
                                            } else {
                                                this.openModal(type)
                                            }
                                        }).catch((error) => {
                                            this.spinner = false
                                            if (this.user_data.camera_flag == 0) {
                                                this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
                                                    const options: CameraOptions =
                                                    {
                                                        quality: 80,
                                                        destinationType: this.camera.DestinationType.DATA_URL,
                                                        targetWidth: 800,
                                                        targetHeight: 600,
                                                        allowEdit: false
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
                                                            this.openModal(type)
                                                        }
                                                    },
                                                        (err) => {
                                                            if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
    
                                                            this.spinner = false
                                                            if (err == 20) {
                                                                this.presentConfirm('Turn On Camera & Media permisssion !', 'Go to <strong>Settings</strong> -> to turn on <strong>Camera permission</strong> & <stong>Files and  media</strong>')
                                                            } else {
                                                                this.presentConfirm('Error Occured', err);
                                                            }
                                                        });
                                                }).catch((error: any) => {
                                                    this.presentConfirm('Error Occured', error);
                                                });
                                            } else {
                                                this.openModal(type)
                                            }
                                        });
                                    }).catch((error) => {
                                        this.spinner = false
                                        // this.presentConfirm('Turn On Location permisssion !', 'please go to <strong>Settings</strong> -> Location to turn on <strong>Location permission</strong>')
                                        this.presentConfirm('Turn On Location permisssion !', JSON.stringify(error));
    
                                    })
                                },
                                    error => {
                                        this.spinner = false
                                        this.service.errorToast('Please Allow Location!!')
                                    });
                            }
    
                        });
                    }else {
                        this.spinner = true
                        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((res) => {
                            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((result) => {
                                let options = { maximumAge: 3000, timeout: 15000, enableHighAccuracy: false };
                                this.geolocation.getCurrentPosition(options).then((resp) => {

                                    var lat = resp.coords.latitude
                                    var lng = resp.coords.longitude
                                    this.spinner = false;
                                    if (this.user_data.camera_flag == 0) {
                                        this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
                                            const options: CameraOptions =
                                            {
                                                quality: 80,
                                                destinationType: this.camera.DestinationType.DATA_URL,
                                                targetWidth: 800,
                                                targetHeight: 600,
                                                allowEdit: false
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
                                                    this.openModal(type)
                                                }
                                            },
                                                (err) => {
                                                    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
                                                    this.spinner = false
                                                    if (err == 20) {
                                                        this.presentConfirm('Turn On Camera & Media permisssion !', 'Go to <strong>Settings</strong> -> to turn on <strong>Camera permission</strong> & <stong>Files and  media</strong>')
                                                    } else {
                                                        this.presentConfirm('Error Occured', err);
                                                    }
                                                });
                                        })
                                    } else {
                                        this.openModal(type)
                                    }
                                }).catch((error) => {
                                    this.spinner = false
                                    if (this.user_data.camera_flag == 0) {
                                        this.diagnostic.requestCameraAuthorization().then((isAvailable: any) => {
                                            const options: CameraOptions =
                                            {
                                                quality: 80,
                                                destinationType: this.camera.DestinationType.DATA_URL,
                                                targetWidth: 800,
                                                targetHeight: 600,
                                                allowEdit: false
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
                                                    this.openModal(type)
                                                }
                                            },
                                                (err) => {
                                                    if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }

                                                    this.spinner = false
                                                    if (err == 20) {
                                                        this.presentConfirm('Turn On Camera & Media permisssion !', 'Go to <strong>Settings</strong> -> to turn on <strong>Camera permission</strong> & <stong>Files and  media</strong>')
                                                    } else {
                                                        this.presentConfirm('Error Occured', err);
                                                    }
                                                });
                                        }).catch((error: any) => {
                                            this.presentConfirm('Error Occured', error);
                                        });
                                    } else {
                                        this.openModal(type)
                                    }
                                });
                            }).catch((error) => {
                                this.spinner = false
                                // this.presentConfirm('Turn On Location permisssion !', 'please go to <strong>Settings</strong> -> Location to turn on <strong>Location permission</strong>')
                                this.presentConfirm('Turn On Location permisssion !', JSON.stringify(error));

                            })
                        },
                            error => {
                                this.spinner = false
                                this.service.errorToast('Please Allow Location!!')
                            });
                    }
                })
    }

    fileChange(img) {
        this.image_data.push(img);
        this.image = '';
    }
    openModal(type) { 
        let workTypeModal = this.modal.create(WorkTypeModalPage, { 'type': type, 'id': this.last_attendence_data.attend_id, 'camera_flag': this.user_data.camera_flag, 'image': this.image, 'image_data': this.image_data });

        workTypeModal.onDidDismiss(data => {
            this.image_data = []
            this.events.publish('user:login');
            this.last_attendence();
        });

        workTypeModal.present();

        //   });

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
    pending_checkin() {
        this.service.addData({}, 'AppCheckin/pendingCheckin').then((result) => {
            if (result['statusCode'] == 200) {
                this.checkin_data = result['checkin_data'];
            } else {
                this.service.errorToast(result['statusMsg'])
            }
        }, err => {
            this.service.Error_msg(err);
            this.service.dismiss();
        })
    }
    bannerDetail() {
        // this.service.addData({}, 'AppInfluencer/bannerList').then((r) => {
        //     if (r['statusCode'] == 200) {
        //         this.appbanner = r['banner_list'];
        //     }
        //     else {
        //         this.service.errorToast(r['statusMsg']);
        //     }
        // });
    }


    stop_attend() {

        const options: CameraOptions =
        {
            quality: 80,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 800,
            targetHeight: 600,
            allowEdit: false
        }
        cordova.plugins.foregroundService.start('Lehar Footwear', 'Camera Works..');
        this.camera.getPicture(options).then((imageData) => {
            this.image = 'data:image/jpeg;base64,' + imageData;
            if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
            if (this.image) {
                this.image_data = [];
                this.fileChange(this.image);
                this.service.presentLoading();
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
                    let options = { maximumAge: 10000, timeout: 15000, enableHighAccuracy: true };
                    this.geolocation.getCurrentPosition(options).then((resp) => {
                        var lat = resp.coords.latitude
                        var lng = resp.coords.longitude
                        this.service.addData({ 'lat': lat, 'lng': lng, 'attendence_id': this.last_attendence_data.attend_id, 'image': this.image_data }, "AppAttendence/stopAttendence").then((result) => {
                            if (result['statusCode'] == 200) {
                                this.service.dismissLoading()
                                this.service.successToast(result['statusMsg']);
                                this.stopBackgroundGeolocation();
                                this.last_attendence()
                            } else {
                                this.service.dismissLoading()
                                this.service.errorToast(result['statusMsg']);
                                this.last_attendence()
                            }
                        }, err => {
                            this.service.Error_msg(err);
                            this.service.dismissLoading()

                        })

                    }).catch((error) => {
                        this.service.dismissLoading()
                        this.presentConfirm('Turn On Location permisssion !', 'please go to  <strong>Settings</strong> -> Location to turn on <strong>Location permission</strong>')
                    });
                },
                    error => {
                        this.service.dismissLoading()
                        this.service.presentToast('Please Allow Location !!')
                    });
            }
        },
            (err) => {
                if(this.Device.platform=='Android'){
      cordova.plugins.foregroundService.stop();
      }
                this.spinner = false
                if (err == 20) {
                    this.presentConfirm('Turn On Camera & Media permisssion !', 'Go to <strong>Settings</strong> -> to turn on <strong>Camera permission</strong> & <stong>Files and  media</strong>')
                } else {
                    this.presentConfirm('Error Occured', err);
                }
            });



    }

    stopBackgroundGeolocation() {
        BackgroundGeolocation.stop();
    }

    goToTeamMember() {
        this.navCtrl.push(BackgroundTrackListPage, { 'page_type': 'manual' })
    }

    stopAttendanceAlert() {
        this.spinner = true

        if (this.checkin_data.length == 0 || this.checkin_data == null) {
            this.platform.ready().then(() => {
                if(this.Device.platform=='Android'){

                    var whiteList = ['com.package.example', 'com.package.example2'];
    
                    (<any>window).gpsmockchecker.check(whiteList, (result) => {
    
    
                        if (result.isMock) {
                            this.spinner = false
                            let alert = this.alertCtrl.create({
                                title: 'Alert!',
                                subTitle: 'Please Remove Third Party Location Apps',
                                buttons: [
                                    {
                                        text: 'Ok',
                                        handler: () => {
                                            this.service.addData({ 'app_name': result.mocks[0]['name'], 'package_name': result.mocks[0]['package'] }, 'Login/thirdPartyDisabled').then((result) => {
                                                if (result['statusCode'] == 200) {
                                                    this.storage.set('token', '');
                                                    this.storage.set('role', '');
                                                    this.storage.set('displayName', '');
                                                    this.storage.set('role_id', '');
                                                    this.storage.set('name', '');
                                                    this.storage.set('type', '');
                                                    this.storage.set('token_value', '');
                                                    this.storage.set('userId', '');
                                                    this.storage.set('token_info', '');
                                                    this.constant.UserLoggedInData = {};
                                                    this.constant.UserLoggedInData.userLoggedInChk = false;
                                                    this.events.publish('data', '1', Date.now());
                                                    this.service.errorToast("Your account is blocked");
                                                    this.navCtrl.setRoot(SelectRegistrationTypePage);
                                                } else {
                                                    this.service.errorToast(result['statusMsg'])
                                                }
                                            },
                                                error => {
                                                    this.service.Error_msg(error);
                                                })
                                        }
                                    }
                                ]
                            });
                            alert.present();
                        }
                        else {
                            this.spinner = false
                            let alert = this.alertCtrl.create({
                                title: 'Stop Time',
                                message: 'Do you want to stop work time?',
                                cssClass: 'alert-modal',
                                buttons: [
                                    {
                                        text: 'No',
                                        role: 'cancel',
                                        handler: () => {
    
                                        }
                                    },
                                    {
                                        text: 'Yes',
                                        handler: () => {
                                            // this.stop_attend();
                                            this.openModal('stop');
    
                                        }
                                    }
    
    
                                ]
                            });
                            alert.present();
                        }
    
    
                    });
                }else {
                    this.spinner = false
                    let alert = this.alertCtrl.create({
                        title: 'Stop Time',
                        message: 'Do you want to stop work time?',
                        cssClass: 'alert-modal',
                        buttons: [
                            {
                                text: 'No',
                                role: 'cancel',
                                handler: () => {

                                }
                            },
                            {
                                text: 'Yes',
                                handler: () => {
                                    this.stop_attend();

                                }
                            }


                        ]
                    });
                    alert.present();
                }

            });
        } else {
            this.spinner = false
            this.service.errorToast('Please Check Out First')
        }

    }


    Approval_array: any;
    eventCount: any;
    expense: any;
    secondaryOrder: any;
    primaryOrder: any;
    leaveany: any
    team_count: any
    flag: boolean = false
    login_status: any = '';

configureBackgroundGeolocation() {


        BackgroundGeolocation.onLocation(this.onLocation.bind(this));
        BackgroundGeolocation.onMotionChange(this.onMotionChange.bind(this));
        BackgroundGeolocation.onActivityChange(this.onActivityChange.bind(this));
        BackgroundGeolocation.onHttp(this.onHttp.bind(this));
        BackgroundGeolocation.onEnabledChange(this.onEnabledChange.bind(this));
        BackgroundGeolocation.onConnectivityChange(this.onConnectivityChange.bind(this));
        const headers = {
            'Authorization': 'Bearer ' + this.Authtoken,
            'Content-Type': 'application/json'
        };
        BackgroundGeolocation.ready({
            reset: true,
            debug: false,
            logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 50,
            url: this.constant.backgroundLocationUrl,
            headers: headers,
            extras: {
                user_id: this.user_id,
                device_id: this.Device.uuid
            },
    
            autoSync: true,
    
            stopOnTerminate: false,
            startOnBoot: true,
    
            preventSuspend: true,
            heartbeatInterval: 60,
            backgroundPermissionRationale: {
                title: "Allow Lehar Footwear to access this device's location all the time ?",
                message: "To show tracked activities on map, Lehar Footwear App collects location data even when closed or not in use.",
                positiveAction: "Change to 'Allow all the time'",
                negativeAction: "Cancel"
            }
    
        }, (state) => {
            console.warn('[ready] BackgroundGeolocation is ready to use', state);
            if (!state.enabled) {
                BackgroundGeolocation.start();
            } else {
    
            }
    
        });
    }


    onLocation(location: Location) {
        // console.log('[location] -', location);
    }
    onMotionChange(event: MotionChangeEvent) {
        // console.log('[motionchange] -', event.isMoving, event.location);
    }
    onActivityChange(event: MotionActivityEvent) {
        // console.log('[activitychange] -', event.activity, event.confidence);
    }
    onHttp(event: HttpEvent) {
        // console.log('[http] -', event.success, event.status, event.responseText);
    }
    onEnabledChange(enabled: boolean) {
        // console.log('[enabledchange] - enabled? ', enabled);
    }
    onConnectivityChange(event: ConnectivityChangeEvent) {
        // console.log('[connectivitychange] - connected?', event.connected);
    }

    last_attendence() {
        this.skLoading = true
        this.service.addData({}, 'login/login_data').then((result) => {
            if (result['statusCode'] == 200) {
                this.skLoading = false
                this.getNetworkType();
                this.last_attendence_data = result['loginData']['attendence_data'];
                this.today_count = result['loginData']['today_count'];
                this.team_count = result['loginData']['team_count'];
                this.diwaliFlag = result['loginData']['festival_flag']['diwali'];
                this.nationalFlag = result['loginData']['festival_flag']['national'];
                this.holiFlag = result['loginData']['festival_flag']['holi'];
                this.rakhiFlag = result['loginData']['festival_flag']['rakshaBhandan'];
                this.dussheraFlag = result['loginData']['festival_flag']['dusherra'];
                this.christmasFlag = result['loginData']['festival_flag']['chirstmas'];
                this.storage.set('team_count', this.team_count);
                this.announcementCount = result['loginData']['chk_announcement'];
                this.enquiry_count = result['loginData']['unread_enquiry_count'];
                this.Approval_array = result['loginData']['Approval_array']['PendingTravelPlan'];
                this.expense = result['loginData']['Approval_array']['expense'];
                this.secondaryOrder = result['loginData']['Approval_array']['secondaryOrder'];
                this.primaryOrder = result['loginData']['Approval_array']['primary'];
                this.eventCount = result['loginData']['Approval_array']['eventCount'];
                this.leaveany = result['loginData']['Approval_array']['leave'];
                this.user_data = result['loginData']['user_data'];
                this.login_status = result['loginData']['login_status'];
                this.device_unique_id = result['loginData']['user_data']['device_unique_id'];
                this.test_flag = result['loginData']['user_data']['test_user_flag'];
                this.service.userData = this.user_data;
                if(this.test_flag != 1){
                    if ((this.device_unique_id != this.Device.uuid) && this.device_unique_id != '') {
                        this.storage.set('token', '');
                        this.storage.set('role', '');
                        this.storage.set('displayName', '');
                        this.storage.set('role_id', '');
                        this.storage.set('name', '');
                        this.storage.set('type', '');
                        this.storage.set('token_value', '');
                        this.storage.set('one_signal_external_id', '');
                        this.storage.set('userId', '');
                        this.storage.set('token_info', '');
                        this.constant.UserLoggedInData = {};
                        this.constant.UserLoggedInData.userLoggedInChk = false;
                        this.events.publish('data', '1', Date.now());
                        this.service.errorToast("Your account is automatically logged out.");
                        this.navCtrl.setRoot(SelectRegistrationTypePage);
                    }
                }

                   setTimeout(() => {
                    this.CacheClearFunction();
                }, 1000);
                   this.setGreeting()
                if (((this.last_attendence_data.stop_time == '00:00:00' || this.last_attendence_data.stop_time == '') && (this.last_attendence_data.start_time != '' || this.last_attendence_data.start_time == '00:00:00'))) {

                    this.storage.get('prominentModal').then((prominentModal) => {
                        if (prominentModal == true) {
                            this.platform.ready().then(this.configureBackgroundGeolocation.bind(this))
                        } else {
                            this.openProminentModal("punchout")
                        }
                    })
                }

                if (this.login_status.trim().toLowerCase() == 'inactive') {
                    this.logout();
                }
                if (this.last_attendence_data.start_time != '') {
                    var dt = moment("12:15 AM", ["h:mm A"]).format("HH:mm");
                    var H = +this.last_attendence_data.start_time.substr(0, 2);
                    var h = (H % 12) || 12;
                    var ampm = H < 12 ? "AM" : "PM";
                    this.start_attend_time = h + this.last_attendence_data.start_time.substr(2, 3) + ' ' + ampm;
                }
                if (this.last_attendence_data.stop_time != '') {
                    var dt = moment("12:15 AM", ["h:mm A"]).format("HH:mm");
                    var H = +this.last_attendence_data.stop_time.substr(0, 2);
                    var h = (H % 12) || 12;
                    var ampm = H < 12 ? "AM" : "PM";
                    this.stop_attend_time = h + this.last_attendence_data.stop_time.substr(2, 3) + ' ' + ampm;
                }
            } else {
                this.skLoading = false
                this.service.errorToast(result['statusMsg'])
            }
        }, error => {
            this.skLoading = false;
            this.service.Error_msg(error);
        })
    }


    goSiteListPage(moduleName, scanRight, pointsRight, type) {
        this.navCtrl.push(SiteListPage, { 'userType': this.user_data.user_type, 'moduleName': moduleName, 'scanRight': scanRight, 'type': type, 'pointsRight': pointsRight })
    }

    goToCheckin() {
        if (this.checkin_data.length == 0) {

            this.navCtrl.push(CheckinNewPage);
        } else {
            this.navCtrl.push(EndCheckinPage, { 'data': this.checkin_data })
        }

    }
    openProminentModal(type) {
        let workTypeModal = this.modal.create(ProminentDisclosureModalPage, { "fromType": type });

        workTypeModal.onDidDismiss(data => {
            if (data == 'punchout') {
                this.platform.ready().then(this.configureBackgroundGeolocation.bind(this))
            } else if (data == 'punchin') {
                this.takePhoto('start')
            }
        });

        workTypeModal.present();

    }
    goToEvent() {

        this.navCtrl.push(CheckinNewPage);

    }
    scanProduct() {

        const options: BarcodeScannerOptions = {
            prompt: ""
        };
        this.barcodeScanner.scan(options).then(resp => {
            this.qr_code = resp.text;
            if (resp.text != '') {
                this.service.presentLoading()
                this.service.addData({ 'coupon_code': this.qr_code, }, 'AppCouponScan/fetchProduct').then((r: any) => {
                    if (r['statusCode'] == 200) {
                        let result;
                        result = r['result']
                        setTimeout(() => {
                            this.service.dismissLoading()
                            this.navCtrl.push(ScanningPage, { 'product_detail': result, 'page_type': 'scan' })
                        }, 600);
                    }
                    else {
                        setTimeout(() => {
                            this.service.dismissLoading()
                            this.service.errorToast(r['statusMsg'])
                        }, 600);
                    }
                },
                    err => {
                        this.service.dismissLoading();
                        this.service.Error_msg(err);
                    });
            }
            else {
            }
        }, err => {
            this.presentConfirm('Turn On Camera permisssion !', 'please go to <strong>Settings</strong> -> Camera to turn on <strong>Camera permission</strong>')
        })

    }

    manualProduct() {
        this.navCtrl.push(ScanningPage, { 'page_type': 'manual' })
    }

    goToLead() {
        this.navCtrl.push(LmsLeadListPage);

    }
    goTopop() {
        this.navCtrl.push(PopGiftListPage)
    }
    goToAttendence() {
        this.navCtrl.push(AttendenceNewPage);
    }
    goToTask() {
        this.navCtrl.push(TaskListPage);
    }

    goToFollowupAdd() {
        this.navCtrl.push(FollowupAddPage);
    }
    goToFollowup() {
        this.navCtrl.push(FollowupListPage);
    }


    goToLeave(type) {
        this.navCtrl.push(LeaveListPage, { 'from': type });
    }
    goToExpense(type) {
        this.navCtrl.push(ExpenseListPage, { 'view_type': type });
    }
    goToTravel(type) {
        this.navCtrl.push(TravelListNewPage, { 'view_type': type });
    }
    goToOrderCatalogue(type) {
        this.navCtrl.push(OrderCatalogueListPage, { 'view_type': type });
    }
    GoToProfile() {
        this.navCtrl.push(ProfilePage,);
    }
    goToDashboard() {
        this.navCtrl.push(DashboardNewPage, { 'user_data': this.user_data });
    }
    goToenquiry() {
        this.navCtrl.push(LmsLeadListPage)
    }
    goToExpenseAdd() {
        this.navCtrl.push(ExpenseAddPage, { from: 'expense', view_type: 'Team'});
    }

    goToevent() {
        this.navCtrl.push(ContractorMeetListPage);
    }

    goToSurvey() {
        this.navCtrl.push(SurveyListPage);
    }

    goToMainDistributorListPage(type) {
        if (type == 3) {
            this.navCtrl.push(RetailerListPage, { 'type': type })
        }
        else {
            this.navCtrl.push(MainDistributorListPage, { 'type': type })
        }

    }
    goToPrimaryOrders(type) {
        this.navCtrl.push(PrimaryOrderMainPage, { 'type': type });
    }
    goToSecondaryOrders(type) {
        this.navCtrl.push(SecondaryOrderMainPage, { 'type': type });
    }
    goOnProductPage() {
        this.navCtrl.push(ProductsPage, { 'mode': 'home' });
    }
    viewSecTarget() {
        this.navCtrl.push(SecondaryTargetReportPage)
    }

    viewAchievement() {
        this.navCtrl.push(TargetPage, { 'user_data': this.user_data })
    }
    goOnDigitalcatPage() {
        this.navCtrl.push(LoyaltyCataloguePage)
    }
    goOnfaqPage() {
        this.navCtrl.push(LoyaltyFaqPage)
      }

    announcementModal() {
        this.navCtrl.push(AnnouncementNoticesListPage);
    }
    gotoHolidayList() {
        this.navCtrl.push(HolidayListPage);
    }

    goOnContactPage() {
        this.navCtrl.push(ContactPage);
    }
    announcementList() {
        this.navCtrl.push(AnnouncementListPage)
    }

    networkType: any = []
    getNetworkType() {
        this.service.addData('', "AppCustomerNetwork/distributionNetworkModule").then(result => {
            this.networkType = result['modules'];
        }, err => {
            this.service.Error_msg(err);
            this.service.dismiss();
        })
    }
    doRefresh(refresher) {

        this.last_attendence();
        this.pending_checkin();
        this.bannerDetail();
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }


    logout() {
        this.storage.set('token', '');
        this.storage.set('role', '');
        this.storage.set('displayName', '');
        this.storage.set('role_id', '');
        this.storage.set('name', '');
        this.storage.set('type', '');
        this.storage.set('token_value', '');
        this.storage.set('userId', '');
        this.storage.set('token_info', '');
        OneSignal.logout();
        this.constant.UserLoggedInData = {};
        this.constant.UserLoggedInData.userLoggedInChk = false;
        this.events.publish('data', '1', Date.now());
        this.service.errorToast("You Are Currently In Active, Contact To Admin.");
        this.navCtrl.setRoot(SelectRegistrationTypePage);

    }
    OneSignalInit(): void {
        // OneSignal.logout()
        setTimeout(() => {
            OneSignal.initialize("da93e19c-cee3-46aa-b180-dd045fbb7345"); //this is onesignal app id
            if (this.notificationToken) {
                OneSignal.login(this.notificationToken)
            }
            let self = this;
            let myClickListener = async function (event) {




                let notificationData = event;
                let page = notificationData.notification.additionalData.page
                let params = notificationData.notification.additionalData
                self.navCtrl.push(page, params);
            };
            OneSignal.Notifications.addEventListener("click", myClickListener);
            OneSignal.Notifications.requestPermission(true)
        }, 300);
    }
    updateNow() {
        if(this.Device.platform=='Android'){
            window.open('market://details?id=com.basiq360.leharfootwear&hl=en', '_system', 'location=yes');
            }else{
                this.Market.open("6755510117")
            }
    }

    async checkBatteryOptimizations() {
        cordova.plugins.DozeOptimize.IsIgnoringBatteryOptimizations(function (responce) {
            if (responce == "false") {
                cordova.plugins.DozeOptimize.RequestOptimizations(function (responce) {
                }, function (error) {
                });
            }
            else {
            }
        }, function (error) {
        });
    }
    openBatteryOptimization(message, request) {
        let OptimizationModal = this.modal.create(BatteryOptimizationModalPage, { "message": message, 'request': request });

        OptimizationModal.onDidDismiss(data => {
            if (data == false) {
                this.checkBatteryOptimizations()
            }
        });

        OptimizationModal.present();

    }

    goToSchemeIncentive(type) {
        this.navCtrl.push(SchemeIncentiveListPage, { 'from': type });
    }

      setGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) { // 5:00 AM to 11:59 AM
      this.greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) { // 12:00 PM to 4:59 PM
      this.greeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) { // 5:00 PM to 8:59 PM
      this.greeting = 'Good Evening';
    } else { // 9:00 PM to 4:59 AM
      this.greeting = 'Hello'; // Or any other preferred fallback greeting
    }
  }


    async initSpeech() {
    // 1 Check + request permission (Android 6+ & iOS)
    const hasPerm = await this.speech.hasPermission();
    if (!hasPerm) {
      await this.speech.requestPermission();
    }

   
    this.listenSub = this.speech.startListening({
      language: this.platform.is('ios') ? 'en-US' : 'en-AU',
      matches: 1,                // top transcription only
      showPartial: true,         // get live transcription
      prompt: 'Say a command',   // Android prompt
    }).subscribe(
      (matches: string[]) => this.onVoice(matches[0]),   // take first result
      err => console.error('Speech err', err)
    );
  }

  stopSpeech() {
    if (this.listenSub) { this.listenSub.unsubscribe(); }
    this.speech.stopListening();
  }

  onVoice(text: string) {
       this.isBottomSheetOpen = false;
      this.suggestionList = [];
  const command = text.toLowerCase().trim();
  
  // Check if command contains the keyword (more flexible matching)
  if (command.includes('expense')) {
    this.navCtrl.push(ExpenseListPage, { 'view_type': 'My' });
      this.speak('Opening expense page');
  } 
  else if (command.includes('leave')) {
    this.navCtrl.push(LeaveListPage, { 'from': 'My' });
   this.speak('लीव पेज ओपन हो रहा है');
  } 

   else if (command.includes('Team')) {
   this.navCtrl.push(BackgroundTrackListPage, { 'page_type': 'manual' })
    
  } 
   else if (command.includes('holiday')) {
    this.navCtrl.push(HolidayListPage);
     this.speak('Opening Holiday Page');
    
  } 
   else if (command.includes('survey')) {
  this.navCtrl.push(SurveyListPage);
  this.speak('Opening Survey Page');
    
  } 
  else if (command.includes('product')) {
 this.navCtrl.push(ProductsPage, { 'mode': 'home' });
 this.speak('Opening product Page');
    
  } 
  else if (command.includes('catalogue')) {
  this.navCtrl.push(LoyaltyCataloguePage)
  this.speak('Opening catalogue');
    
  } 
    else if (command.includes('task')) {
   this.navCtrl.push(TaskListPage);
   this.speak('Opening Target');
    
  } 
   else if (command.includes('quotation')) {
  this.navCtrl.push(LmsQuotationListPage);
     this.speak('Opening quotation List');
  } 
  
   else if (command.includes('enquiry') ||command.includes('lead')) {
    this.navCtrl.push(LmsLeadListPage);
    this.speak('Opening Enquiry Page');
    
  } 
    else if (command.includes('stop attendance') ) {
  this.stopAttendanceAlert()
  this.speak('Stoping Your Attendance , Please Wait');
    
  }
  else if (command.includes('start attendance') ) {
  this.takePhoto('start')
  this.speak('Starting Your Attendance , Please Wait');
    
  } 
    else if (command.includes('expense')) {
 this.navCtrl.push(ExpenseListPage, { 'view_type': 'My' });
     this.speak('Opening Expense List');
  } 

   else if (command.includes('check')||command.includes('checkin')||command.includes('check in')||command.includes('checking')) {
  const extractedName = this.extractNameFromCheckinCommand(command);
    if (extractedName) {
      this.checkinSuggestion(extractedName);
      this.commandType="Checkin"
        this.speak('Kindly Select Party Name To checkin');
    } 
 

   
  } 
       else if (command.includes('order')) {
         const extractedName = this.extractNameFromOrderCommand(command);
     if (extractedName) {
      this.checkinSuggestion(extractedName);
      this.commandType="Order"
        this.speak('Kindly Select Party Name To Create Order');
    }else{
        this.navCtrl.push(PrimaryOrderMainPage);
         this.speak('Opening Primary Order Page');
    } 
  } 
 else if (command.includes('call')) {
  const name = command.replace('call', '').trim().toLowerCase(); // e.g., 'ajay'
  this.callFromLogByName(name);
}
  else {
   
    // this.speak('Try Again');
    setTimeout(() => {
         this.initSpeech()
    }, 2000);
   
   
  }
}
callFromLogByName(name: string) {
  this.platform.ready().then(() => {
    this.callLog.hasReadPermission().then(hasPermission => {
      if (!hasPermission) {
        this.callLog.requestReadPermission().then(() => {
          this.searchAndCall(name);
        }).catch(err => {
          console.error('Permission denied for call log', err);
        });
      } else {
        this.searchAndCall(name);
      }
    });
  });
}
searchAndCall(name: string) {
  this.callLog.getCallLog([]).then(results => {
    const calls = JSON.parse(JSON.stringify(results));

    // Search call logs where the name matches
    const match = calls.find(c =>
      c.name && c.name.toLowerCase().includes(name)
    );

    if (match) {
      this.callNumber.callNumber(match.number, true)
        .then(() => console.log('Calling', match.number))
        .catch(err => console.error('Error calling number', err));
    } else {
      console.log('No match found in call log for:', name);
    }
  }).catch(err => {
    console.error('Failed to get call log', err);
  });
}
speak(text: string) {
  this.tts.speak({
    text: text,
    // locale: 'en-US',
    locale: 'hi-IN',
    rate: 0.85
  }).then(() => console.log("Spoken: ", text))
    .catch(err => console.error("TTS error:", err));
}
    
closeBottomSheet(){
   this.suggestionList=[]
}
checkinSuggestion(text) {
        this.service.addData({'search':text}, "AppCheckin/checkinSuggestionBoxAccToVoiceAssist").then(result => {
              this.zone.run(() => {
            this.suggestionList = result['result'];
             this.isBottomSheetOpen = true;
              });
        }, err => {
            this.service.Error_msg(err);
            this.service.dismiss();
        })
    }

     customerAddToList(data) {
        this.spinnerLoader=true
this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
  let options = { maximumAge: 10000, timeout: 15000, enableHighAccuracy: true };
  this.geolocation.getCurrentPosition(options).then((resp) => {
    try {
      const lat = resp.coords.latitude;
      const lng = resp.coords.longitude;

      this.checkinData.dr_id = data.id;
      this.checkinData.dr_name = data.name;
      this.checkinData.display_name = data.display_name;
      this.checkinData.dr_type_name = data.type_name;
      this.checkinData.type_name = 'Dr';
      this.checkinData.lat = lat;
      this.checkinData.lng = lng;
      this.checkinData.dr_type = data.type || '';

      const payload = {
        lat: this.checkinData.lat,
        lng: this.checkinData.lng,
        dr_type_name: this.checkinData.dr_type_name,
        type_name: this.checkinData.type_name,
        dr_type: this.checkinData.dr_type,
        activity_type: this.checkinData.activity_type,
        dr_id: this.checkinData.dr_id,
        new_counter: this.checkinData.new_counter,
        display_name: this.checkinData.display_name,
      };

      this.service.addData(payload, 'AppCheckin/startVisitNew').then((result) => {
        if (result['statusCode'] === 200) {
          if (this.navCtrl.getViews().length >= 2) {
            this.navCtrl.remove(1, 1, { animate: false });
            this.navCtrl.pop({ animate: false });
          }
          this.checkin_data = result['data'] || {};
          this.navCtrl.push(EndCheckinPage, { data: this.checkin_data });
            this.isBottomSheetOpen = false;
              this.suggestionList=[]
            this.spinnerLoader=false

          this.service.successToast(result['statusMsg']);
        } else {
          this.service.errorToast(result['statusMsg']);
           this.spinnerLoader=false
        }
      }).catch(error => {
        this.service.Error_msg(error);
          this.spinnerLoader=false
      });

    } catch (err) {
          this.spinnerLoader=false
      console.error("Internal error in geolocation success block:", err);
      this.service.errorToast('Something went wrong during check-in.');
    }

  }).catch(() => {
      this.spinnerLoader=false
    this.service.errorToast('Unable to get location. Please enable location services in settings.');
  });

}).catch(() => {
    //   this.spinnerLoader=false
  this.service.errorToast('Allow Location Permission');
});

}

extractNameFromCheckinCommand(command: string): string {
  // Remove checkin-related words and common grammar words
  let cleanedCommand = command
    .replace(/\b(i|want|to|do|checkin|check|in|checking|at|with|the|a|an|is|am|are|was|were|be|been|being|have|has|had|will|would|could|should|can|may|might|must|shall|please|thanks|thank|you|me|my|mine|your|yours|his|her|hers|its|our|ours|their|theirs|this|that|these|those|here|there|now|then|today|yesterday|tomorrow|and|or|but|so|if|when|where|why|how|what|who|which)\b/g, '')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  // Split by common separators and filter out empty strings
  const words = cleanedCommand.split(/[,.\-_\s]+/).filter(word => word.length > 0);
  
  // Join remaining words as the name (assuming it's a person's name)
  const extractedName = words.join(' ').trim();
  
  // Return the name if it exists and looks valid (at least 2 characters)
  return extractedName.length >= 2 ? extractedName : '';
}
extractNameFromOrderCommand(command: string): string {
  // Remove checkin-related words and common grammar words
  let cleanedCommand = command
    .replace(/\b(for|i|want|to|do|order|in|create|creating|at|with|the|a|an|is|am|are|was|were|be|been|being|have|has|had|will|would|could|should|can|may|might|must|shall|please|thanks|thank|you|me|my|mine|your|yours|his|her|hers|its|our|ours|their|theirs|this|that|these|those|here|there|now|then|today|yesterday|tomorrow|and|or|but|so|if|when|where|why|how|what|who|which)\b/g, '')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  // Split by common separators and filter out empty strings
  const words = cleanedCommand.split(/[,.\-_\s]+/).filter(word => word.length > 0);
  
  // Join remaining words as the name (assuming it's a person's name)
  const extractedName = words.join(' ').trim();
  
  // Return the name if it exists and looks valid (at least 2 characters)
  return extractedName.length >= 2 ? extractedName : '';
}

createOrder(data){

       if (data.type =='1'|| data.type =='7') {
          this.navCtrl.push(PrimaryOrderAddPage, { 'checkin_id': '0','dr_type': data.type, 'id': data.id, 'dr_name': data.company_name, 'order_type': 'Primary' });
        }
        else if (data.type =='3') {
          this.navCtrl.push(SecondaryOrderAddPage, {'checkin_id': '0', 'dr_type': data.type, 'networkType': data.type,  'id': data.id, 'dr_name': data.company_name, 'order_type': 'Secondary' });
        }
}
isMenuOpen: boolean = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

closeMenu() {
  this.isMenuOpen = false;
}

 goToSite() {
        this.navCtrl.push(SiteProjectListPage);
    }
 viewAll() {
        this.navCtrl.push(SfaShortcutPage); 
    } 
    onSlideChange() {
    if (this.slides) {
      const index = this.slides.getActiveIndex();
      this.currentSlide = index % this.bannerData.length;
    }
  }

  goToSlide(index: number) {
    if (this.slides) {
      this.slides.slideTo(index);
      this.currentSlide = index;
    }
  }

  startAutoPlay() {
    if (this.slides) {
      this.slides.startAutoplay();
    }
  }

  stopAutoPlay() {
    if (this.slides) {
      this.slides.stopAutoplay();
    }
  }


  // Method to update slides dynamically (for Salesforce integration)
  updateBanners(newBanners: any[]) {
    this.bannerData = newBanners;
    if (this.slides) {
      this.slides.update();
    }
  }

  // Method to get current promotion data (for Salesforce tracking)
  getCurrentPromotion() {
    return this.bannerData[this.currentSlide];
  }

    cameraModal(type) {
         this.spinner = true
            if (this.checkin_data.length == 0 || this.checkin_data == null) {
        
    let modal = this.modalCtrl.create(CameraModalPage,{'type':'camera'});

    modal.onDidDismiss(data => {
     
      if (data != undefined && data != null) { 
       this.fileChange(data);
       this.openModal(type)
       this.spinner = false
    }
    
    
      
    });

    modal.present();
}  else {
            this.spinner = false
            this.service.errorToast('Please Check Out First')
        }

  }
  triggerAutoCheckout() {

  this.service.successToast("Auto Checkout inside triger");

  
}
getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Radius of Earth in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
  goToQuotationList() {
          this.navCtrl.push(LmsQuotationListPage);
      }



}
