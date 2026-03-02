import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, App } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { OfflineDbProvider } from '../../providers/offline-db/offline-db';
import { SQLite } from '@ionic-native/sqlite';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { ProductDetailPage } from '../product-detail/product-detail';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as jwt_decode from "jwt-decode";


@IonicPage()
@Component({
    selector: 'page-product-subdetail',
    templateUrl: 'product-subdetail.html',
})
export class ProductSubdetailPage {
    
    products: any = [];
    filter:any ={};
    flag: any = '';
    cat_id:any;
    lang:any='en';
    
    
    
    
    constructor(public storage: Storage,
        public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController, private app:App, public service:MyserviceProvider,public constant:ConstantProvider,public  translate:TranslateService)
        {
            this.cat_id = this.navParams.get('id');
            this.lang = this.navParams.get("lang");
            this.translate.setDefaultLang(this.lang);
            this.translate.use(this.lang);
            this.get_user_lang()
            if(this.cat_id){
                this.getCatalogueData();
            }
        }
        
        ionViewDidLoad() 
        {
        }
        
        
        
        
        
        
        doRefresh(refresher) {
            this.getCatalogueData();
            refresher.complete();
        }
        
        
        getCatalogueData() {
            this.service.presentLoading();
            this.filter.limit = 20;
            this.filter.start = 0;
            this.service.addData({'filter':this.filter, 'cat_id':this.cat_id}, 'AppCustomerNetwork/subSegmentList').then((result) => {
                if (result['statusCode'] == 200) {
                    this.service.dismissLoading();
                    this.products = result['data'];
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
            this.filter.limit = this.products.length;
            this.service.addData({ 'filter': this.filter, 'cat_id':this.cat_id}, 'AppCustomerNetwork/subSegmentList').then(result => {
                if (result['result'] == '') {
                    this.flag = 1;
                }
                else {
                    setTimeout(() => {
                        this.products = this.products.concat(result['data']);
                        infiniteScroll.complete();
                    }, 1000);
                }
            }, error => {
                this.service.Error_msg(error);
                this.service.dismiss();
            });
        }
        
        
        
        
        goOnProductDetailPage(id) {
            this.navCtrl.push(ProductDetailPage, { 'id': id, 'type':'sub_category',"lang":this.lang}) 
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
    