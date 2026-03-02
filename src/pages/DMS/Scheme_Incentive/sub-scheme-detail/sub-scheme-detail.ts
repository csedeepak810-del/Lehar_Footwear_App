import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../../../providers/constant/constant';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';


@IonicPage()
@Component({
  selector: 'page-sub-scheme-detail',
  templateUrl: 'sub-scheme-detail.html',
})
export class SubSchemeDetailPage {
  subSchemeDetail: any = [];
  bannerData: any = [];
  schemeID: any = {};
  bannerURL: any;
  ActiveTab: any = 'Slabs'
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: MyserviceProvider,public constant: ConstantProvider) {
    this.bannerURL = constant.upload_url1 + '/schemeBanners/';
    
    if (this.navParams.get('schemeID')) {
      
      this.schemeID = this.navParams.get('schemeID');
      console.log(this.schemeID);
      this.getSubSchemeDetail();
      
    }
  }
  
  doRefresh(refresher) {
    this.getSubSchemeDetail();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubSchemeDetailPage');
  }
  
  getSubSchemeDetail() {
    this.service.presentLoading();    
    this.service.addData({'sub_scheme_id' : this.schemeID}, 'AppScheme/subSchemeDetails').then((result) => {
      console.log(result);
      if (result['statusCode'] == 200) {
        this.subSchemeDetail = result['result'];
        this.bannerData = this.subSchemeDetail.bannerData;
        console.log(this.subSchemeDetail);
        this.service.dismissLoading();
        
      }else {
        this.service.dismissLoading();
        this.service.errorToast(result['statusMsg'])
      }
    })
  }
  
}
