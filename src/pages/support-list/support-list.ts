import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { SupportDetailPage } from '../support-detail/support-detail';
import { SupportPage } from '../support/support';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../../providers/constant/constant';

/**
* Generated class for the SupportListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-support-list',
  templateUrl: 'support-list.html',
})
export class SupportListPage {
  supportData:any =[];
  activeTab:string ='Pending';
  filter:any={};
  lang:any='en';
  
  
  
  constructor(public navCtrl: NavController,public constant: ConstantProvider, public navParams: NavParams, private service: MyserviceProvider,public  translate:TranslateService,public storage: Storage,public alertCtrl: AlertController
    ) {
    this.lang = this.navParams.get("lang");
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.get_user_lang();
    this.service.presentLoading();
  }

  
  ionViewDidEnter(){
    this.get_support_list(this.activeTab)
  }
  
  get_support_list(tab) {
    this.filter.limit=20;
    this.filter.start=0;
    this.service.addData({'status':tab, 'filter' : this.filter}, 'AppSupport/getSupportList').then((result) => {
      if(result['statusCode'] == 200){
        this.supportData = result['data'];
        if(result['popupFlag'] == 1){
          this.statusMsg();

          } ;
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

    statusMsg(){

      let alert = this.alertCtrl.create({
        enableBackdropDismiss: false,
        title: 'Alert ! Agar aapko koi sawaal hai ya aapko koi samasya hai, toh right side bottom par button par click karein aur apni query mention karein. ',
        message: '',
        cssClass: 'alert-modal',
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          },
        
        ]
      });
      alert.present();

    }
    
    
    
    
    flag:any='';
    loadData(infiniteScroll)
    {
      this.filter.start=this.supportData.length;
      
      this.service.addData({'filter' : this.filter},'AppSupport/getSupportList').then( (r) =>
      {
        if(r=='')
        {
          this.flag=1;
        }
        else
        {
          setTimeout(()=>{
            this.supportData=this.supportData.concat(r['data']);
            infiniteScroll.complete();
          },1000);
        }
      }, error => {
        this.service.Error_msg(error);
        this.service.dismiss();
      });
    }
    
    doRefresh(refresher) {
      this.get_support_list(this.activeTab)
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }
    
    
    goToSupportAdd(){
      this.navCtrl.push(SupportPage,{'lang':this.lang})
    }
    support_detail(id){
      this.navCtrl.push(SupportDetailPage,{'id':id,'lang':this.lang})
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
  