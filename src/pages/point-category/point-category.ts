import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as jwt_decode from "jwt-decode";

/**
 * Generated class for the PointCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-category',
  templateUrl: 'point-category.html',
})
export class PointCategoryPage {
  category_list: any = [];
  filter:any ={};
  flag: any = '';
  lang:any='en';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service: MyserviceProvider,
    public storage: Storage,
    public  translate:TranslateService,
    public constant: ConstantProvider,
  ) {
    this.lang = this.navParams.get("lang");
            this.translate.setDefaultLang(this.lang);
            this.translate.use(this.lang);
            this.get_user_lang()
            this.getPointcategorylist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointCategoryPage');
  }

  doRefresh(refresher) {
    this.getPointcategorylist();
    refresher.complete();
}

getPointcategorylist() {
  this.service.presentLoading();
  this.filter.limit = 10;
  this.filter.start = 0;
  this.service.addData({'filter':this.filter}, 'AppCustomerNetwork/pointCategoryList').then((result) => {
      if (result['statusCode'] == 200) {
          this.service.dismissLoading();
          this.category_list = result['data'];
      } else {
          this.service.errorToast(result['statusMsg']);
          this.service.dismissLoading();
      }
  }, error => {
      this.service.Error_msg(error);
      this.service.dismissLoading();
  });
}

  
loadData(infiniteScroll) {
  this.filter.start = this.category_list.length;
  this.service.addData({ 'filter': this.filter}, 'AppCustomerNetwork/pointCategoryList').then(result => {
      if (result['result'] == '') {
          this.flag = 1;
      }
      else {
          setTimeout(() => {
              this.category_list = this.category_list.concat(result['data']);
              infiniteScroll.complete();
          }, 1000);
      }
  }, error => {
      this.service.Error_msg(error);
      this.service.dismiss();
  });
}


tokenInfo:any={};
  get_user_lang()
        {
          this.storage.get("token")
          .then(resp=>{
            this.tokenInfo = this.getDecodedAccessToken(resp );
            console.log(this.tokenInfo)
            
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
