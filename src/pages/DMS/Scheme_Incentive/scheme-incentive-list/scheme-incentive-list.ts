import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { ConstantProvider } from '../../../../providers/constant/constant';
import { SchemeIncentiveDetailPage } from '../scheme-incentive-detail/scheme-incentive-detail';
import { ViewProfilePage } from '../../../view-profile/view-profile';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-scheme-incentive-list',
  templateUrl: 'scheme-incentive-list.html',
})
export class SchemeIncentiveListPage {
  requestSend: any = false;
  schemeDetailRunning: any = [];
  schemeDetailExpire: any = [];
  schemeList: any = [];
  rewardList: any = [];
  bannerData: any = {}
  user_data: any = {}
  bannerURL: any;
  giftURL: any;
  ActiveTab: any = 'Running'
  
  
  constructor(public navCtrl: NavController, public storage:Storage,
    public navParams: NavParams, public service: MyserviceProvider,public constant: ConstantProvider,public modalCtrl:ModalController) {
    this.bannerURL = constant.upload_url1 + '/schemeBanners/';
    this.giftURL = constant.upload_url1 + '/schemeRewards/';
    this.storage.get("user_data").then(resp=>{
      console.log(resp);
      this.user_data = resp;
      console.log('====================================');
      console.log(this.user_data,'this.user_data');
      console.log('====================================');
      // this.user_id = resp.id;
      // this.get_orders();
  })
  }
  
  ionViewDidEnter() {
    this.getSchemeList(this.ActiveTab);
  }

  doRefresh(refresher) {
    this.getSchemeList(this.ActiveTab)
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SchemeIncentiveListPage');
  }
  
  getSchemeList(ActiveTab) {
    this.schemeDetailRunning = [];
    this.schemeDetailExpire = [];
    this.service.presentLoading();    
    this.service.addData({ActiveTab : ActiveTab}, 'AppScheme/schemeListing').then((result) => {
      console.log(result);
      if (result['statusCode'] == 200) {
        this.schemeList = result['result'];
        console.log(this.schemeList);
        
        for (let i = 0; i < this.schemeList.length; i++) {
          if (this.schemeList[i]['scheme_state'] == 'Running') {
            this.schemeDetailRunning.push(this.schemeList[i]);            
          }
          else
          {
            this.schemeDetailExpire.push(this.schemeList[i]);            
          }
        }
        console.log(this.schemeDetailRunning);        
        console.log(this.schemeDetailExpire);
        this.service.dismissLoading();
      }else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    })
  }

  getRewardList(ActiveTab) {
    this.schemeDetailRunning = [];
    this.schemeDetailExpire = [];
    this.service.presentLoading();    
    this.service.addData({ActiveTab : ActiveTab}, 'AppScheme/giftListing').then((result) => {
      console.log(result);
      if (result['statusCode'] == 200) {
        this.rewardList = result['result'];
        console.log(this.rewardList);
        this.service.dismissLoading();
      }else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    })
  }
  
  goToSchemeDetail(id) {
    this.navCtrl.push(SchemeIncentiveDetailPage, { 'schemeID': id })
  }
  
  imageModal(src) {
    this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
  }
  
}
