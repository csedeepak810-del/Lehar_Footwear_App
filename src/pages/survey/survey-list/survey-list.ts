import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { SurveyDetailPage } from '../survey-detail/survey-detail';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../../../providers/constant/constant';


@IonicPage()
@Component({
  selector: 'page-survey-list',
  templateUrl: 'survey-list.html',
})
export class SurveyListPage {
  
  surveyList:any=[];
  loading:Loading;
  lang:any='en';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service:MyserviceProvider,
    public loadingCtrl:LoadingController,
    public  translate:TranslateService,
    public constant: ConstantProvider,
    public storage: Storage

    ) {
      this.lang = this.navParams.get("lang");
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
      this.get_user_lang();
      this.getSurveyList();
    }
    
    ionViewDidLoad() {
    }
    
    goToDetails(id,title){
      this.navCtrl.push(SurveyDetailPage,{id:id,title:title,'lang':this.lang})
    }
    
    
    
    getSurveyList()
    {
      this.service.presentLoading();
      this.service.addData({},'AppSurvey/surveyList').then(result =>
        {
          if(result['statusCode'] == 200){
            this.surveyList = result['data']
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
      
      doRefresh(refresher) {
        this.getSurveyList()
        setTimeout(() => {
          refresher.complete();
        }, 1000);
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
    