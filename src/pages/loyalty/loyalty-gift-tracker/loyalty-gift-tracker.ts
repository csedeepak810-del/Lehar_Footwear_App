import { Component } from '@angular/core';
import { IonicPage, Loading, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { LoyaltyTrackerDetailPage } from '../loyalty-tracker-detail/loyalty-tracker-detail';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as jwt_decode from "jwt-decode";
import { ConstantProvider } from '../../../providers/constant/constant';



@IonicPage()
@Component({
  selector: 'page-loyalty-gift-tracker',
  templateUrl: 'loyalty-gift-tracker.html',
})
export class LoyaltyGiftTrackerPage {
  loading:Loading;
  redeemList:any =[];
  filter:any={};
  lang:any='en';
  
  
  constructor(public navCtrl: NavController,public constant: ConstantProvider, public navParams: NavParams, public service:MyserviceProvider,public  translate:TranslateService,public storage: Storage) {
    this.lang = this.navParams.get("lang");
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.get_user_lang();
    this.giftTracker();
  }
  
  
  ionViewWillEnter(){
  }
  
  ionViewDidLoad() {
  }
  
  
  
  doRefresh(refresher) 
  {
    this.giftTracker(); 
    refresher.complete();
  }
  
  
  giftTracker()
  {
    this.filter.limit=20;
    this.filter.start=0;
    this.service.presentLoading();
    this.service.addData({'filter' : this.filter},'AppGiftTracker/redeemGiftRequestList').then((result) =>
    {
      if(result['statusCode'] == 200){
        this.redeemList = result['gift_master_list'];
        this.service.dismissLoading();
      }
      else{
        this.service.errorToast(result['statusMsg']);
        this.service.dismissLoading();
      }
    }, error => {
      this.service.Error_msg(error);
      this.service.dismiss();
    });
  }
  
  
  flag:any='';
  loadData(infiniteScroll)
  {
    this.filter.start=this.redeemList.length;
    this.service.addData({'filter' : this.filter},'AppGiftTracker/redeemGiftRequestList').then( (r) =>
    {
      if(r=='')
      {
        this.flag=1;
      }
      else
      {
        setTimeout(()=>{
          this.redeemList=this.redeemList.concat(r['gift_master_list']);
          infiniteScroll.complete();
        },1000);
      }
    }, error => {
      this.service.Error_msg(error);
      this.service.dismiss();
    });
  }
  
  
  
  goOnTrackerDetail(id){
    this.navCtrl.push(LoyaltyTrackerDetailPage, {'id':id,'lang':this.lang})
  }

  tokenInfo:any={};
  get_user_lang()
  {
    this.storage.get("token")
    .then(resp=>{
      this.tokenInfo = this.getDecodedAccessToken(resp );
      
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

}
