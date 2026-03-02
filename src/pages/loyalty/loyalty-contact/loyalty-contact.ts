import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { LoyaltyCataloguePage } from '../../loyalty-catalogue/loyalty-catalogue';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../../../providers/constant/constant';

/**
* Generated class for the LoyaltyContactPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-loyalty-contact',
  templateUrl: 'loyalty-contact.html',
})
export class LoyaltyContactPage {
  contact:any ={};
  about_data:any ={};
  lang:any='en';

  constructor(public navCtrl: NavController,public constant: ConstantProvider, public navParams: NavParams, public service:MyserviceProvider,public  translate:TranslateService,public storage: Storage
    ) {
    this.lang = this.navParams.get("lang");
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
   this.get_user_lang()
    this.aboutDetail();
    this.contactDetails();
  }
  
  ionViewWillEnter(){
  }
  
  ionViewDidLoad() {
  }
  
 
  
  contactDetails()
  {
    this.service.presentLoading();
    this.service.addData({},'AppContactUs/contactDetail').then((result) =>
    {
      if(result['statusCode'] == 200){
        this.contact = result['contact_detail'];
        this.service.dismissLoading();

      }
      else{
        this.service.errorToast(result['statusMsg']);
        this.service.dismissLoading();
      }
    });
  }


  goOnDigitalcatPage(){
    this.navCtrl.push(LoyaltyCataloguePage,{'lang': this.lang})
  }


   
  aboutDetail()
  {
    setTimeout(() => {
      this.service.addData({},'AppAboutUs/aboutDetail').then((result) =>
      {
        
        if(result['statusCode'] == 200){
          this.about_data = result['about_detail'];
        }
        else{
          this.service.errorToast(result['statusMsg']);
        }
        
      });
    }, 2000);
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
