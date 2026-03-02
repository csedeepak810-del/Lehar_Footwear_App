import { Component, ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController, IonicPage, Loading, LoadingController, ModalController, Events, NavController, NavParams, Platform, ActionSheetController, Nav } from 'ionic-angular';
import { ConstantProvider } from '../../../providers/constant/constant';
import { DbserviceProvider } from '../../../providers/dbservice/dbservice';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { BonusPointPage } from '../../bonus-point/bonus-point';
import { LoyaltyCataloguePage } from '../../loyalty-catalogue/loyalty-catalogue';
import { LoyaltyEnterCouponCodePage } from '../../loyalty-enter-coupon-code/loyalty-enter-coupon-code';
import { SupportListPage } from '../../support-list/support-list';
import { SurveyListPage } from '../../survey/survey-list/survey-list';
import { LoyaltyAboutPage } from '../loyalty-about/loyalty-about';
import { LoyaltyContactPage } from '../loyalty-contact/loyalty-contact';
import { LoyaltyGiftGalleryPage } from '../loyalty-gift-gallery/loyalty-gift-gallery';
import { LoyaltyGiftTrackerPage } from '../loyalty-gift-tracker/loyalty-gift-tracker';
import { LoyaltyPointHistoryPage } from '../loyalty-point-history/loyalty-point-history';
import { LoyaltyProfilePage } from '../loyalty-profile/loyalty-profile';
import { LoyaltyVideoPage } from '../loyalty-video/loyalty-video';
import { SiteListPage } from '../site-list/site-list';
import { Storage } from '@ionic/storage';
import { SelectRegistrationTypePage } from '../../select-registration-type/select-registration-type';
import { IonicSelectableComponent } from 'ionic-selectable';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { AnnouncementNoticesListPage } from '../../announcement-notices-list/announcement-notices-list';
import { ViewProfilePage } from '../../view-profile/view-profile';
import { ProductsPage } from '../../products/products';
import { LoyaltyGiftGalleryDetailPage } from '../loyalty-gift-gallery-detail/loyalty-gift-gallery-detail';
import { PointCategoryPage } from '../../point-category/point-category';
import zingchart from 'zingchart'
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";
import { ContactPage } from '../../contact/contact';
import OneSignal from 'onesignal-cordova-plugin';
import { CallNumber } from '@ionic-native/call-number';
import { PointDetailImgPage } from '../../point-detail-img/point-detail-img';
import { LoyaltyPurchaseListPage } from '../../loyalty-purchase-list/loyalty-purchase-list';
import { LoyaltyFaqPage } from '../../loyalty-faq/loyalty-faq';
import { AnnouncementListPage } from '../../announcement/announcement-list/announcement-list';




@IonicPage()
@Component({
  selector: 'page-loyalty-home',
  templateUrl: 'loyalty-home.html',
})
export class LoyaltyHomePage {
  @ViewChild(Nav) nav: Nav;

  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  
  influencer_detail: any = {}
  loading: Loading;
  bannerURL: any;
  appbanner: any = [];
  qr_code: any = '';
  influencerUser: any = [];
  uploadurl: any = ''
  skLoading: any = true;
  filter: any = {};
  giftMasterList: any = [];
  contact: any = {};
  notificationToken: any;

 
  lang:any = 'en';
  constructor(public navCtrl: NavController,public callNumber:CallNumber, public events: Events, public modalCtrl: ModalController,
    public storage: Storage, public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner,
    public service: MyserviceProvider, public loadingCtrl: LoadingController, public db: DbserviceProvider,
    public constant: ConstantProvider, public navParams: NavParams, public platform: Platform,
    public actionsheet: ActionSheetController,
    public openNativeSettings: OpenNativeSettings, public locationAccuracy: LocationAccuracy, public geolocation: Geolocation,public  translate:TranslateService,) {
      this.uploadurl = constant.upload_url1 + 'influencer_doc/';
      this.bannerURL = constant.upload_url1 + 'banner/';
     
    }
    
    ionViewWillEnter() {
      this.influencerDetail();
      this.contactDetails();
      this.getGiftList('');
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
      this.get_user_lang();
      this.platform.ready().then(() => {
        this.storage.get('onesignaltoken').then((val) => {
            console.log(val, 'this is user token');
            this.notificationToken = val;
        });
        setTimeout(() => {
            this.OneSignalInit()
        }, 1500);
    })

     
      
     
      
    }
    
    
    
    doRefresh(refresher) {
      this.influencerDetail();
      this.getGiftList('');
      refresher.complete();
    }
    
    
    contactDetails() {
      this.service.presentLoading();
      this.service.addData({}, 'AppContactUs/contactDetail').then((result) => {
        if (result['statusCode'] == 200) {
          this.contact = result['contact_detail'];
          this.service.dismissLoading();
        }
        else {
          this.service.errorToast(result['statusMsg']);
          this.service.dismissLoading();
        }
      });
    }
    pointRight: any = {};
    
    
    meter(cashValue){
      let minValue = 0;
      let maxValue = cashValue;
      
      let divideValue = maxValue/2
      
      setTimeout(() => {
        let salesReportMeter: any = {
          type: 'gauge',
          globals: {
            fontSize: '18px',
          },
          plot: {
            tooltip: {
              borderRadius: '5px',
              fontSize: '10px'
            },
            valueBox: {
              text: this.pointRight.wallet_point,
              fontSize: '10px',
              placement: 'center',
              rules: [
                {
                  text: this.pointRight.wallet_point + '<br>Points',
                  rule: '%v <= 30',
                },
              ],
            },
            size: '100%',
            animation: {
              // effect: 11,
              // speed: 5000,
              // effect: 11,
              sequence: 3,
              speed: 4000,
              delay: "1500"
            }
          },
          plotarea: {
            backgroundColor: 'transparent',
            marginTop: '40px',
          },
          scaleR: {
            decimals: 0,
            values: `${minValue}:${maxValue}: ${maxValue/2}`,
            // maxValue: 1200,
            // minValue: 0,
            aperture: 180,
            center: {
              visible: false,
            },
            item: {
              offsetR: 0,
              
            },
            labels: ['0', '', maxValue],
            fontSize: '12px',
            ring: {
              size: 50,
              backgroundColor: '#89b3d6',
              rules: [
                {
                  rule: `%v >= 0 && %v <= ${divideValue}`,
                  backgroundColor: 'red',
                  // <40% 
                },
                {
                  rule: `%v >= ${divideValue} && %v <= ${maxValue}`,
                  backgroundColor: 'green',
                  // rule: '%v >= 10 && %v <= 20',
                  // 40-70
                },
                // {
                //   backgroundColor: 'green',
                //   rule: '%v >= 20 && %v <= 30',
                //   // 70>
                // },
              ],
            },
            // step: 600,
            tick: {
              visible: false,
            },
            
          },
          
          refresh: {
            type: 'feed',
            url: 'feed()',
            interval: 1500,
            resetTimeout: 1000,
            transport: 'js',
          },
          series: [
            {
              values: [this.pointRight.wallet_point],
              backgroundColor: 'black',
              indicator: [3, 1, 1, 1, 0.4],
            },
          ],
          
        };
        
        zingchart.render({ id: 'salesReportMeter', data: salesReportMeter, height: 200 })
        
        // this.charts.map((charts) => {
        //   charts.options.gui = { contextMenu: { visible: false } }
        //   zingchart.render({ id: charts.elemId, data: charts.options, height: 200 })
        // })
        
      }, 4000);
    }

    openDialer(dialnumber:any, e:any){
      e.stopPropagation();
      dialnumber = ''+dialnumber
      this.callNumber.callNumber(dialnumber, false) // Set to false to allow user to choose app
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
    }
    
    
    
    influencerDetail() {
      this.skLoading = true
      this.service.addData({ dr_id: this.constant.UserLoggedInData.id, type: this.constant.UserLoggedInData.type }, 'login/login_data').then((res) => {
        if (res['statusCode'] == 200) {
          this.skLoading = false
          this.influencer_detail = res['loginData']['login_data'];
          this.service.org_data = this.influencer_detail.payout_per_transaction_limit;
          this.pointRight = res['loginData'];
          this.getGiftList('');
           this.tokenupdateinDB();

        } else {
          this.skLoading = false
          this.service.errorToast(res['statusMsg'])
        }
        if (this.pointRight.login_status == 'Inactive') {
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
          this.navCtrl.setRoot(SelectRegistrationTypePage);
        }
        this.bannerDetail();
      }, err => {
      })
    }
    
  tokenInfo:any={};
    get_user_lang()
    {
      this.storage.get("token")
      .then(resp=>{
        this.tokenInfo = this.getDecodedAccessToken(resp );
        console.log(this.tokenInfo)
        
        this.service.addData({"login_id":this.constant.UserLoggedInData.id}, 'Login/userLanguage').then(result => {
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
    
    
    
    
    giftPointValue:any;
    getGiftList(search) {
      this.filter.limit = 50;
      this.filter.start = 0;
      this.filter.search = search;
      this.filter.redeemable = '';
      // this.service.presentLoading();
      this.service.addData({ 'filter': this.filter }, 'AppGiftGallery/giftGalleryList').then((result) => {
        if (result['statusCode'] == 200) {
          // this.service.dismissLoading();
          this.giftMasterList = result['gift_master_list'];
          for (let i = 0; i < this.giftMasterList.length; i++) {
            if(this.giftMasterList[i].gift_type == 'Cash' && this.giftMasterList[i].range_end > 0){
              this.giftPointValue = this.giftMasterList[i].range_end;
              this.meter(this.giftPointValue);
              break;
            }
          }
        }
        else {
          this.service.errorToast(result['statusMsg']);
          // this.service.dismissLoading();
        }
      }, error => {
        this.service.Error_msg(error);
        // this.service.dismiss();
      });
    }
    
    
    bannerDetail() {
      this.service.addData({}, 'AppInfluencer/bannerList').then((result) => {
        if (result['statusCode'] == 200) {
          this.appbanner = result['banner_list'];
        }
        else {
          this.service.errorToast(result['statusMsg']);
        }
      });
    }

  lat: any;
  lng: any;
  goscan() {

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


            if (this.lat == null && this.lng == null) {
              console.log("null lat", this.lat);

            }
            else {
              this.Scaning();

            }


          },
            error => {
              console.log('Error requesting location permissions', error);
              if (error) {
                let alert = this.alertCtrl.create({
                  title: 'Alert!',
                  cssClass: 'action-close',
                  subTitle: "Enable to get your location so, can't scan",
                  buttons: ['OK']
                });
                alert.present();
              }

            });
      });
  }
    
    
    
    Scaning() {
      this.platform.ready().then(() => {
        const options: BarcodeScannerOptions = {
          prompt: ""
        };
        this.barcodeScanner.scan(options).then(resp => {
          this.qr_code = resp.text;
          if (resp.text != '') {
            this.service.presentLoading();
            this.service.addData({ 'coupon_code': this.qr_code,'lat': this.lat, 'lng': this.lng }, 'AppCouponScan/couponCodeScan').then((r: any) => {
              if (r['statusCode'] == 200 && r['bonus_point'] > 0) {
                this.service.successToast((r['coupon_point'] + r['bonus_point']) + " points has been added into your wallet");
                this.service.dismissLoading();
                setTimeout(() => {
                  this.Scaning()
                }, 800);
              }
              else if (r['statusCode'] == 200) {
                this.service.successToast(r['coupon_point'] + " points has been added into your wallet");
                this.service.dismissLoading();
                setTimeout(() => {
                  this.Scaning();
                }, 800);
              }
              else {
                this.service.dismissLoading();
                let Message = r['statusMsg']
                let alert = this.alertCtrl.create({
                  enableBackdropDismiss: false,
                  title: 'Alert !',
                  message: Message,
                  cssClass: 'alert-modal',
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: () => {
                      }
                    },
                    {
                      text: 'Try Again',
                      handler: () => {
                        this.Scaning()
                      }
                    }
                  ]
                });
                alert.present();
              }
            }, err => {
              this.service.dismissLoading();
              this.service.Error_msg(err)
            });
          }
          else {
          }
        }, err => {
          console.log(err)
          this.service.dismissLoading()
          this.selectComponent.close()
          this.presentConfirm('Turn On Camera permisssion !', 'please go to <strong>Settings</strong> -> Camera to turn on <strong>Camera permission</strong>')
        })
        
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
    
    
    alertPresent(msg) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: msg + `<a href=tel:${this.contact.contact_number}>${this.contact.contact_number}</a>`,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }
    openSettings() {
      this.openNativeSettings.open("application_details")
    }
    
    goOnPointeListPage() {
      this.navCtrl.push(LoyaltyPointHistoryPage,{"lang":this.lang})
    }
    
    goToBonusPoint() {
      this.navCtrl.push(BonusPointPage)
    }
    goToSurvey() {
      this.navCtrl.push(SurveyListPage,{"lang":this.lang})
    }
    goToProfile() {
      this.navCtrl.push(LoyaltyProfilePage,{"lang":this.lang})
    }
    
    goToAbout() {
      this.navCtrl.push(LoyaltyAboutPage,{"lang":this.lang})
    }
    goToContact() {
      this.navCtrl.push(ContactPage,{"lang":this.lang})
    }
    goToVideo() {
      this.navCtrl.push(LoyaltyVideoPage,{"lang":this.lang})
    }
    goToTracker() {
      this.navCtrl.push(LoyaltyGiftTrackerPage,{"lang":this.lang})
    }

    goOnPointcategory() {
      this.navCtrl.push(PointCategoryPage,{"lang":this.lang})
    }
    
    goSiteListPage(moduleName, scanRight, pointsRight, type) {
      this.navCtrl.push(SiteListPage, { 'userType': "Influencer", 'moduleName': moduleName, 'scanRight': scanRight, 'type': type, 'pointsRight': pointsRight })
    }


    goTopurchaselist() {
      if(this.influencer_detail.status=='Pending'){
        this.alertPresent("Your current profile status is  <strong class=Pending>“Pending”</strong>. You can see the Purchase only if your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ",)

        return

      }

      else if (this.influencer_detail.status == 'Reject') {
        this.alertPresent("Your current profile status is  <strong class=Reject>“Reject”</strong>. You can see the Purchase only if your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ");

        return
      }

      else if (this.influencer_detail.status == 'Suspect') {
        this.alertPresent("Your current profile status is  <strong class=Suspect>“Suspect”</strong>. You can see the Purchase only if your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ")

        return
      }
      else if(this.influencer_detail.status=='Approved'){
      this.navCtrl.push(LoyaltyPurchaseListPage,{'type':this.influencer_detail.type,'login_data':this.influencer_detail,'lang':this.lang})
      }
    }

    announcementList() {
      this.navCtrl.push(AnnouncementListPage ,{'lang':this.lang})
  }
    
    goToGift() {
      if (this.influencer_detail.status == 'Pending') {
        this.alertPresent("Your current profile status is  <strong class=Pending>“Pending”</strong>. You can see the Redeem Points only if your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ",)
        return
      }
      else if (this.influencer_detail.status == 'Reject') {
        this.alertPresent("Your current profile status is  <strong class=Reject>“Reject”</strong>. You can see the gift gallery only if your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ");
        return;
      }
      else {
        this.alertPresent("Your current profile status is  <strong class=Suspect>“Suspect”</strong>. You can see the Redeem Points only if your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ")
        return
      }
      
    }
    
    goToDetail() {
      if (this.giftMasterList.length == 0) {
        this.alertPresent("No Gift Available ")
        return
      }
      else if (this.giftMasterList.length == 1) {
        this.navCtrl.push(LoyaltyGiftGalleryDetailPage, { 'id': this.giftMasterList[0].id ,"lang":this.lang})
      } else {
        this.navCtrl.push(LoyaltyGiftGalleryPage,{"lang":this.lang})
      }
    }
    
    goToCoupon() {
      if (this.influencer_detail.status == 'Pending') {
        this.alertPresent("Your current profile status is  <strong class=Pending>“Pending”</strong>. You can only enter the coupon codes when your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ")
        return
      }
      
      else if (this.influencer_detail.status == 'Reject') {
        this.alertPresent("Your current profile status is  <strong class=Reject>“Reject”</strong>. You can only enter the coupon codes when your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ")
        return
      }
      else if (this.influencer_detail.status == 'Suspect') {
        this.alertPresent("Your current profile status is  <strong class=Suspect>“Suspect”</strong>. You can only enter the coupon codes when your profile status is <strong class=Approved>“Approved”</strong>. To know more, you can call us at ")
        return
      }
      else {
        this.navCtrl.push(LoyaltyEnterCouponCodePage, { 'type': '',"lang":this.lang })
      }
    }
    
    goOnDigitalcatPage() {
      this.navCtrl.push(LoyaltyCataloguePage,{"lang":this.lang})
    }
    
    goToSupport() {
      this.navCtrl.push(SupportListPage,{"lang":this.lang});
    }
    
    announcementModal() {
      this.navCtrl.push(AnnouncementNoticesListPage);
    }
    imageModal(src) {
      this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
    }
    
    goOnProductPage() {
      this.navCtrl.push(ProductsPage, { 'mode': 'home',"lang":this.lang });
    }
    goToPointDetail() {
      this.navCtrl.push(PointDetailImgPage,{"lang":this.lang})
    }

    goOnfaqPage() {
      this.navCtrl.push(LoyaltyFaqPage,{"lang":this.lang})
    }

    OneSignalInit(): void {
       
     
    
      OneSignal.initialize("da93e19c-cee3-46aa-b180-dd045fbb7345"); //this is onesignal app id
      console.log(this.notificationToken,'415');
  
      if (this.notificationToken) {
          console.log('====================================');
          console.log('updating token');
          console.log('====================================');
          OneSignal.login(this.notificationToken)
      }
      let self = this;
      let myClickListener = async function(event) {
            let notificationData = event;
            console.log('====================================');
            console.log(notificationData);
          //   self.Gotopage(notificationData)
          let page= notificationData.notification.additionalData.page
          let params= notificationData.notification.additionalData
          self.nav.push(page,params);
            console.log('====================================');
        };
      OneSignal.Notifications.addEventListener("click", myClickListener);
      OneSignal.Notifications.requestPermission(true)
  };
  
  tokenupdateinDB(){
    if (this.notificationToken) {
      this.service.addData({"unique_token":this.notificationToken,'influencer_id':this.constant.UserLoggedInData.id}, 'AppInfluencer/updateUnique_token').then(result => {
       console.log(result);
      })
      
    }
  
  
  }

   

    

   
    
  }