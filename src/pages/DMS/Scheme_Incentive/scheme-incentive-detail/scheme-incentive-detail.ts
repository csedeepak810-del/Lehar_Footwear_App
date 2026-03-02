import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../../../providers/constant/constant';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { SubSchemeListPage } from '../sub-scheme-list/sub-scheme-list';


@IonicPage()
@Component({
  selector: 'page-scheme-incentive-detail',
  templateUrl: 'scheme-incentive-detail.html',
})
export class SchemeIncentiveDetailPage {
  schemeDetail: any = [];
  bannerData: any = [];
  schemeID: any = {};
  bannerURL: any;
  ActiveTab: any = 'Slabs'

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: MyserviceProvider,public constant: ConstantProvider) {
    this.bannerURL = constant.upload_url1 + '/schemeBanners/';

    if (this.navParams.get('schemeID')) {
      
      this.schemeID = this.navParams.get('schemeID');
      console.log(this.schemeID);
      this.getSchemeDetail();
      
    }
  }
  
  doRefresh(refresher) {
    this.getSchemeDetail();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SchemeIncentiveDetailPage');
  }
  
  getSchemeDetail() {
    this.service.presentLoading();    
    this.service.addData({'scheme_id' : this.schemeID}, 'AppScheme/schemeDetails').then((result) => {
      console.log(result);
      if (result['statusCode'] == 200) {
        this.schemeDetail = result['result'];
        this.bannerData = this.schemeDetail.bannerData;
        console.log(this.schemeDetail);
        this.service.dismissLoading();
        
      }else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    })
  }

  goToSubSchemeDetail(id) {
    console.log(id);
    
    this.navCtrl.push(SubSchemeListPage, { 'subSchemeID': id })
  }
  
}
