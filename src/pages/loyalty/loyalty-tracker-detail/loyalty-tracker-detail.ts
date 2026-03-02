import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../../providers/constant/constant';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-loyalty-tracker-detail',
  templateUrl: 'loyalty-tracker-detail.html',
})


export class LoyaltyTrackerDetailPage {
  redeemDetail:any ={};
  redeem_id:any;
  uploadUrl:any;
  editAddress:boolean = false
  lang:any='en';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,  public alertCtrl:AlertController, public loadingCtrl:LoadingController, public service:MyserviceProvider , public constant : ConstantProvider,public  translate:TranslateService,public storage: Storage
    ) {
    this.redeem_id = this.navParams.get('id');
    this.uploadUrl = constant.upload_url1+"gift_gallery/";
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
  
  
  changeAddress(){
    this.editAddress = true;
  }

  
  updateAddress(){
    this.service.addData({'id':this.redeem_id, 'shipping_address':this.redeemDetail.shipping_address},'AppGiftTracker/shippingAddressChange').then((r) =>
    {
      if(r['statusCode'] ==  200){
        this.service.successToast(r['statusMsg']);
        this.editAddress = false;
        this.giftTracker();
      }
      else{
        this.service.errorToast(r['statusMsg']);
        this.editAddress = false;
      }
    });
  }
  
  
  giftTracker()
  {
    this.service.presentLoading();
    this.service.addData({'id':this.redeem_id},'AppGiftTracker/redeemGiftRequestDetail').then((result) =>
    {
      if(result['statusCode'] == 200){
        this.redeemDetail =  result['gift_master_list'];
        this.service.dismissLoading();
      }
      else{
        this.service.errorToast(result['statusMsg']);
        this.service.dismissLoading();
      }
    });
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
