import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { TranslateService } from '@ngx-translate/core';
declare var DocumentViewer: any;
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';
import {Device} from '@ionic-native/device'
import { InAppBrowser } from '@ionic-native/in-app-browser';



@IonicPage()
@Component({
  selector: 'page-loyalty-catalogue',
  templateUrl: 'loyalty-catalogue.html',
})


export class LoyaltyCataloguePage {
  pdfData:any=[];
  url:any;
  filter:any={};
  isInfoVisible: boolean[] = [false]
  lang:any = 'en';
  
  // private document: DocumentViewer,
  constructor(public Device:Device, public iab:InAppBrowser, public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public service:MyserviceProvider,public constant:ConstantProvider,public  translate:TranslateService, public storage: Storage) {
    this.url = constant.upload_url1+'doc_catalogue/';
    this.lang = this.navParams.get("lang");
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.get_user_lang()
    this.getData();
  }
  
  ionViewWillEnter(){
  }
  
  ionViewDidLoad() {
  }
  
  doRefresh(refresher) 
  {
    this.getData();
    refresher.complete();
  }
  
  getData()
  {
    this.filter.limit=20;
    this.filter.start=0;
    this.service.presentLoading();
    this.service.addData({'filter' : this.filter},'AppCateloge/documentCatalogueList').then((result) =>
    {
      if(result['statusCode'] == 200){
        this.pdfData = result['doc_list'];
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
    this.filter.start=this.pdfData.length;
    
    this.service.addData({'filter' : this.filter},'AppCateloge/documentCatalogueList').then( (result) =>
    {
      if(result=='')
      {
        this.flag=1;
      }
      else
      {
        setTimeout(()=>{
          this.pdfData=this.pdfData.concat(result['doc_list']);
          infiniteScroll.complete();
        },1000);
      }
    }, error => {
      this.service.Error_msg(error);
      this.service.dismiss();
    });
  }
  
  openCatelogue(url, i)
  {
    if(this.Device.platform=='Android'){
      this.isInfoVisible[i] = true;
      var upload_url=  url
    DocumentViewer.previewFileFromUrlOrPath(
      function () {
       
      }, function (error) 
      {
        if (error == 53) 
        {
          this.service.Error_msg('No app that handles this file type.');
        }else if (error == 2)
        {
          this.service.Error_msg('Invalid link');
        }
      },
      upload_url ,'pdf', 'application/pdf');
      setTimeout(() => {
        this.isInfoVisible[i] = false;
      }, 2000);
    }else{
      this.iab.create(url, "_system")
    }
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