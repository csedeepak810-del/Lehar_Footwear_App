import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../../../providers/constant/constant';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { SubSchemeDetailPage } from '../sub-scheme-detail/sub-scheme-detail';
import { ViewProfilePage } from '../../../view-profile/view-profile';


@IonicPage()
@Component({
  selector: 'page-sub-scheme-list',
  templateUrl: 'sub-scheme-list.html',
})
export class SubSchemeListPage {

  requestSend: any = false;
  subSchemeDetailRunning: any = [];
  subSchemeDetailExpire: any = [];
  subSchemeList: any = [];
  bannerData: any = {}
  subSchemeID: any = {};
  bannerURL: any;
  giftURL: any;
  ActiveTab: any = 'Running'

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider,public constant: ConstantProvider,public modalCtrl:ModalController) {
    this.bannerURL = constant.upload_url1 + '/schemeBanners/';
    this.giftURL = constant.upload_url1 + '/schemeRewards/';

    if (this.navParams.get('subSchemeID')) {
      
      this.subSchemeID = this.navParams.get('subSchemeID');
      console.log(this.subSchemeID);
      this.getSubSchemeList(this.ActiveTab);
      
    }
  }
  
  ionViewDidEnter() {
    // this.getSubSchemeList(this.ActiveTab);
  }

  doRefresh(refresher) {
    this.getSubSchemeList(this.ActiveTab)
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubSchemeListPage');
  }
  
  getSubSchemeList(ActiveTab) {
    this.subSchemeDetailRunning = [];
    this.subSchemeDetailExpire = [];
    this.service.presentLoading();    
    this.service.addData({'ActiveTab' : ActiveTab , 'scheme_id': this.subSchemeID}, 'AppScheme/subSchemeListing').then((result) => {
      console.log(result);
      if (result['statusCode'] == 200) {
        this.subSchemeList = result['result'];
        console.log(this.subSchemeList);
        
        for (let i = 0; i < this.subSchemeList.length; i++) {
          if (this.subSchemeList[i]['scheme_state'] == 'Running') {
            this.subSchemeDetailRunning.push(this.subSchemeList[i]);            
          }
          else
          {
            this.subSchemeDetailExpire.push(this.subSchemeList[i]);            
          }
        }
        console.log(this.subSchemeDetailRunning);        
        console.log(this.subSchemeDetailExpire);
        this.service.dismissLoading();
      }else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    })
  }
  
  goToSubSchemeDetail(id) {
    this.navCtrl.push(SubSchemeDetailPage, { 'schemeID': id })
  }
  
  imageModal(src) {
    this.modalCtrl.create(ViewProfilePage, { "Image": src }).present();
  }

 

}
